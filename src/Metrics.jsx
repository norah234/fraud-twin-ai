/* ===========================================================
   Metrics.jsx
   جزء من الوحدة 03 — لوحة التحكم
   يعرض الثلاث بطاقات (دخول فاشل / إعادة تعيين / تحويلات)
   تصميم الوحدة 03 الأصلي — حُوّل من Tailwind لأنماط عادية
   عشان يشتغل بدون تثبيت أي مكتبة إضافية
=========================================================== */

import React from "react";
import { KeyRound, RotateCcw, ArrowLeftRight } from "lucide-react";

export const COLORS = {
  bg: "#0F1319",
  surface: "#171D26",
  surfaceRaised: "#1E2530",
  border: "#2A3341",
  textPrimary: "#EDF1F7",
  textMuted: "#8B94A3",
  textDim: "#5B6472",
  safe: "#34D399",
  caution: "#F2A93B",
  danger: "#E7515A",
};

const FONT = "'IBM Plex Sans Arabic', sans-serif";
const MONO = "'IBM Plex Mono', monospace";

function MetricCard({ icon: Icon, label, value, baseline, seniorMode }) {
  const ratio = baseline > 0 ? value / baseline : value > 0 ? 99 : 0;
  const barPercent = Math.min(100, Math.round((ratio / 3) * 100));
  const level = ratio >= 3 ? "danger" : ratio >= 1.5 ? "caution" : "safe";
  const color = COLORS[level];

  return (
    <div style={{ flex: 1, borderRadius: 16, padding: 16, backgroundColor: COLORS.surfaceRaised, border: `1px solid ${COLORS.border}` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Icon size={18} color={COLORS.textMuted} />
        <span style={{ fontSize: seniorMode ? 13 : 11, color: COLORS.textDim, fontFamily: FONT }}>خط الأساس {baseline}</span>
      </div>

      <div style={{ fontFamily: MONO, fontSize: seniorMode ? 36 : 28, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1 }}>{value}</div>

      <div style={{ marginTop: 8, fontSize: seniorMode ? 15 : 13, color: COLORS.textMuted, fontFamily: FONT }}>{label}</div>

      <div style={{ marginTop: 12, height: 6, borderRadius: 999, overflow: "hidden", backgroundColor: COLORS.border }}>
        <div style={{ width: `${barPercent}%`, backgroundColor: color, height: "100%", transition: "width 0.5s ease" }} />
      </div>

      {level === "danger" && (
        <div style={{ marginTop: 8, fontSize: seniorMode ? 13 : 11, color: COLORS.danger, fontFamily: FONT }}>تجاوز 3 أضعاف المعتاد</div>
      )}
    </div>
  );
}

function MetricCardSkeleton() {
  return (
    <div style={{ flex: 1, borderRadius: 16, padding: 16, backgroundColor: COLORS.surfaceRaised, border: `1px solid ${COLORS.border}`, opacity: 0.6 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ width: 16, height: 16, borderRadius: 999, backgroundColor: COLORS.border }} />
        <div style={{ width: 64, height: 12, borderRadius: 4, backgroundColor: COLORS.border }} />
      </div>
      <div style={{ width: 48, height: 28, borderRadius: 4, backgroundColor: COLORS.border, marginBottom: 12 }} />
      <div style={{ width: 96, height: 12, borderRadius: 4, backgroundColor: COLORS.border, marginBottom: 12 }} />
      <div style={{ height: 6, borderRadius: 999, backgroundColor: COLORS.border }} />
    </div>
  );
}

/**
 * Metrics — صف البطاقات الثلاث
 * props:
 *  - metrics: { loginFail, pwReset, transfers } | null
 *  - baseline: { loginFail, pwReset, transfers }
 *  - isLoading: boolean
 */
export default function Metrics({ metrics, baseline, isLoading = false, seniorMode = false }) {
  const rowStyle = { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 };

  if (isLoading) {
    return (
      <div style={rowStyle}>
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div style={{ marginTop: 8, borderRadius: 16, padding: 24, textAlign: "center", backgroundColor: COLORS.surfaceRaised, border: `1px dashed ${COLORS.border}` }}>
        <span style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: FONT }}>لا توجد بيانات حتى الآن — بانتظار وصول أول دفعة مؤشرات</span>
      </div>
    );
  }

  return (
    <div style={rowStyle}>
      <MetricCard icon={KeyRound} label="محاولات الدخول الفاشلة" value={metrics.loginFail} baseline={baseline.loginFail} seniorMode={seniorMode} />
      <MetricCard icon={RotateCcw} label="إعادة تعيين كلمة المرور" value={metrics.pwReset} baseline={baseline.pwReset} seniorMode={seniorMode} />
      <MetricCard icon={ArrowLeftRight} label="التحويلات" value={metrics.transfers} baseline={baseline.transfers} seniorMode={seniorMode} />
    </div>
  );
}
