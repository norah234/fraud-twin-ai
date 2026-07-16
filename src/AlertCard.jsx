import React from "react";
import { CheckCircle2, BellRing, Ban, Lock, Shield } from "lucide-react";
import { styles } from "./styles";
import { IMPACT_COMPARISON } from "./fraud-engine";

/* ===========================================================
   AlertCard.jsx
   مسؤولة هذا الملف: الوحدة 04 (التنبيهات والسيناريوهات)
   يعرض: نسبة الخطر، الأسباب (بشريط تفسير)، الإجراءات المقترحة
=========================================================== */

// شريط تقدّم لكل سبب — يوضح نسبة مساهمته بالقرار
function ReasonBar({ text, percent, seniorMode }) {
  return (
    <div style={styles.reasonItem}>
      <span style={{ ...styles.reasonText, ...(seniorMode ? { fontSize: 15 } : {}) }}>{text}</span>
      <div style={styles.reasonBarTrack}>
        <div style={{ ...styles.reasonBarFill, width: `${percent}%` }} />
      </div>
    </div>
  );
}

// شريط مقارنة الأثر الزمني (تقليدي مقابل Fraud Twin AI)
function ImpactStrip() {
  return (
    <div style={styles.impactStrip}>
      <div style={styles.impactCol}>
        <div style={styles.impactLabel}>{IMPACT_COMPARISON.traditional.label}</div>
        <div style={styles.impactValue}>{IMPACT_COMPARISON.traditional.value}</div>
        <div style={styles.impactDetail}>{IMPACT_COMPARISON.traditional.detail}</div>
      </div>
      <div style={{ ...styles.impactCol, ...styles.impactColHot }}>
        <div style={styles.impactLabel}>{IMPACT_COMPARISON.fraudTwin.label}</div>
        <div style={{ ...styles.impactValue, color: "#2DD4BF" }}>{IMPACT_COMPARISON.fraudTwin.value}</div>
        <div style={styles.impactDetail}>{IMPACT_COMPARISON.fraudTwin.detail}</div>
      </div>
    </div>
  );
}

// بطاقة التنبيه الكاملة — تستقبل نتيجة computeFraudProbability() من App.jsx
export function AlertCard({ data, contained, seniorMode }) {
  if (!data) return null;
  return (
    <div className={!contained ? "alert-pulse" : ""}>
      <div style={styles.alertHead}>
        <span style={{ ...styles.alertIconWrap, background: contained ? "#16342E" : "#3A1E1E" }}>
          {contained ? <CheckCircle2 size={18} color="#2DD4BF" /> : <BellRing size={18} color="#EF4444" />}
        </span>
        <div>
          <div style={{ ...styles.alertTitle, ...(seniorMode ? { fontSize: 19 } : {}) }}>{contained ? "تم احتواء الحملة الاحتيالية" : "احتمالية حملة احتيال منسّقة"}</div>
          <div style={styles.alertSub}>{contained ? "الإجراءات الاستباقية طُبّقت تلقائيًا" : "محسوبة فعليًا من أرقام السيناريو الحالي"}</div>
        </div>
        {/* نسبة الخطر */}
        {!contained && <div style={{ ...styles.probBadge, ...(seniorMode ? { fontSize: 20 } : {}) }}>{data.probability}٪</div>}
      </div>

      <div style={styles.alertGrid}>
        <div style={styles.alertCol}>
          <div style={styles.alertColTitle}>لماذا هالنسبة؟</div>
          {data.reasons.map((r, i) => <ReasonBar key={i} text={r.text} percent={r.percent} seniorMode={seniorMode} />)}
        </div>
        <div style={styles.alertCol}>
          <div style={styles.alertColTitle}>الإجراءات {contained ? "المطبّقة" : "المقترحة"}</div>
          <ul style={styles.actionList}>
            {(data.actions.length ? data.actions : ["لا حاجة لإجراء — المؤشرات طبيعية"]).map((a, i) => (
              <li key={i} style={{ ...styles.actionItem, ...(seniorMode ? { fontSize: 15 } : {}) }}>
                {i === 0 ? <Ban size={13} /> : i === 1 ? <BellRing size={13} /> : <Lock size={13} />} {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!contained && <ImpactStrip />}
    </div>
  );
}

// حالة الهدوء (تُعرض لما ما فيه تنبيه نشط)
export function CalmNotice() {
  return (
    <div style={styles.calmNotice}>
      <Shield size={18} color="#2DD4BF" />
      <span>لا توجد تنبيهات نشطة. اختاري سيناريو ثم اضغطي "تشغيل محاكاة هجوم".</span>
    </div>
  );
}
