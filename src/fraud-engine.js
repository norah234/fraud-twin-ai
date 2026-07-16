/* ===========================================================
   fraud-engine.js
   مسؤولة هذا الملف: الوحدة 01
   محرك حساب الاحتمالية + سيناريوهات الهجوم الثلاثة
   الأرقام أدناه محسوبة من FraudTwinAI-Data.xlsx (ورقة summary)
   عبر AVERAGEIF على 370 سجل تاريخي محاكى — راجعي قسم 05 بالخطة
=========================================================== */

// خط الأساس = متوسط الصفوف المصنّفة "normal" في ملف البيانات
export const BASELINE = { loginFail: 6, pwReset: 2, transfers: 3 };

// وزن كل مؤشر في القرار النهائي
const WEIGHTS = { loginFail: 0.35, pwReset: 0.30, transfers: 0.35 };

// كل سيناريو = متوسط صفوف نوعه الفعلي من ملف البيانات (summary sheet)
export const ATTACK_SCENARIOS = {
  phishing: {
    label: "حملة تصيّد إلكتروني",
    metrics: { loginFail: 38, pwReset: 19, transfers: 4 },
  },
  bot: {
    label: "هجوم آلي (بوتات)",
    metrics: { loginFail: 69, pwReset: 12, transfers: 3 },
  },
  takeover: {
    label: "سطو على الحسابات",
    metrics: { loginFail: 13, pwReset: 14, transfers: 26 },
  },
};

// مقارنة مبسّطة للأثر الزمني — تُستخدم بشريط "الأثر" بالواجهة (تحسين رقم 1)
export const IMPACT_COMPARISON = {
  traditional: { label: "الطريقة التقليدية", value: "ساعات إلى أيام", detail: "بعد بلاغ العميل" },
  fraudTwin: { label: "Fraud Twin AI", value: "أقل من دقيقة", detail: "تنبيه استباقي قبل الضرر" },
};

// يحسب "درجة الانحراف" لمؤشر واحد عن خط الأساس (0 إلى 1)
function deviationScore(current, base) {
  if (base === 0) return current > 0 ? 1 : 0;
  const ratio = current / base;
  return Math.min(1, Math.max(0, (ratio - 1) / 6));
}

// الدالة الرئيسية: تُستدعى بكل مرة توصل أرقام جديدة
// options.baseline: خط أساس مخصّص (يُستخدم بميزة "التعلّم من الإنذار الكاذب")
// options.threshold: حد التنبيه (افتراضي 55٪، ميزة "حماية كبار السن" تخفّضه لـ 40٪)
// تُرجع نسبة احتمالية حقيقية + أسباب مع نسبة مساهمة كل سبب (للشرح المرئي) + إجراءات
export function computeFraudProbability(metrics, options = {}) {
  const base = options.baseline || BASELINE;
  const threshold = options.threshold ?? 55;

  const scores = {
    loginFail: deviationScore(metrics.loginFail, base.loginFail),
    pwReset: deviationScore(metrics.pwReset, base.pwReset),
    transfers: deviationScore(metrics.transfers, base.transfers),
  };

  const weighted =
    scores.loginFail * WEIGHTS.loginFail +
    scores.pwReset * WEIGHTS.pwReset +
    scores.transfers * WEIGHTS.transfers;

  const probability = Math.round(Math.min(99, weighted * 100));

  // كل سبب يحمل نسبة انحرافه الخاصة (0-100) عشان نرسمه كشريط تقدّم بالواجهة
  const reasons = [];
  if (scores.loginFail > 0.4)
    reasons.push({
      key: "loginFail",
      text: `محاولات الدخول الفاشلة تفوق المعتاد بـ ${(metrics.loginFail / base.loginFail).toFixed(1)} أضعاف`,
      percent: Math.round(scores.loginFail * 100),
    });
  if (scores.pwReset > 0.4)
    reasons.push({
      key: "pwReset",
      text: "طلبات إعادة تعيين كلمة المرور مرتفعة بشكل غير معتاد",
      percent: Math.round(scores.pwReset * 100),
    });
  if (scores.transfers > 0.4)
    reasons.push({
      key: "transfers",
      text: "نشاط تحويلات يخالف النمط الزمني المعتاد للحسابات",
      percent: Math.round(scores.transfers * 100),
    });
  if (reasons.length === 0)
    reasons.push({ key: null, text: "جميع المؤشرات ضمن النطاق الطبيعي المتوقع", percent: 0 });

  return {
    probability,
    isAnomaly: probability >= threshold,
    reasons,
    actions: probability >= threshold
      ? ["تجميد التحويلات المشبوهة مؤقتًا", "تنبيه العملاء المتأثرين", "تفعيل التحقق الثنائي إجباريًا"]
      : [],
  };
}

// ميزة "التعلّم من الإنذار الكاذب": ترفع خط الأساس شوي للمؤشرات المسبِّبة
// عشان نفس المستوى ما يفعّل تنبيه ثاني بالمرة الجاية (تكيّف بسيط وواقعي)
export function adjustBaselineAfterFalseAlarm(currentBaseline, reasons) {
  const next = { ...currentBaseline };
  reasons.forEach((r) => {
    if (r.key && next[r.key] !== undefined) {
      next[r.key] = Math.round(next[r.key] * 1.15 * 10) / 10;
    }
  });
  return next;
}
