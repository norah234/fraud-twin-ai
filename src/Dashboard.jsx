/* ===========================================================
   Dashboard.jsx
   مسؤولة هذا الملف: الوحدة 03 — لوحة التحكم
   يعرض: مقياس نسبة الخطر الدائري (Gauge) + المؤشرات الثلاثة
   تصميم الوحدة 03 الأصلي — حُوّل من Tailwind لأنماط عادية
=========================================================== */

import React from "react";
import Metrics, { COLORS } from "./Metrics";

const FONT = "'IBM Plex Sans Arabic', sans-serif";
const MONO = "'IBM Plex Mono', monospace";

function riskColor(p) {
  if (p >= 55) return COLORS.danger;
  if (p >= 30) return COLORS.caution;
  return COLORS.safe;
}
function riskLabel(p) {
  if (p >= 55) return "خطر مرتفع";
  if (p >= 30) return "مراقبة لازمة";
  return "طبيعي";
}

function polarPoint(cx, cy, r, f) {
  const angle = 180 - 180 * f;
  const rad = (angle * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
}
function arcPath(cx, cy, r, fFrom, fTo) {
  const start = polarPoint(cx, cy, r, fFrom);
  const end = polarPoint(cx, cy, r, fTo);
  const largeArc = fTo - fFrom > 0.5 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function RiskGauge({ probability, seniorMode }) {
  const cx = 110, cy = 105, r = 85;
  const track = arcPath(cx, cy, r, 0, 1);
  const value = arcPath(cx, cy, r, 0, Math.min(1, Math.max(0, probability / 100)));
  const thresholdPoint = polarPoint(cx, cy, r, 0.55);
  const color = riskColor(probability);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <svg width="220" height="130" viewBox="0 0 220 120">
        <defs>
          <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.safe} />
            <stop offset="50%" stopColor={COLORS.caution} />
            <stop offset="100%" stopColor={COLORS.danger} />
          </linearGradient>
        </defs>
        <path d={track} fill="none" stroke={COLORS.border} strokeWidth="14" strokeLinecap="round" />
        <path d={value} fill="none" stroke="url(#riskGrad)" strokeWidth="14" strokeLinecap="round" style={{ transition: "d 0.6s ease" }} />
        <line x1={thresholdPoint.x} y1={thresholdPoint.y - 10} x2={thresholdPoint.x} y2={thresholdPoint.y + 10} stroke={COLORS.textDim} strokeWidth="2" />
        <text x={thresholdPoint.x} y={thresholdPoint.y - 16} fill={COLORS.textDim} fontSize="9" textAnchor="middle" fontFamily={MONO}>55</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -24 }}>
        <span style={{ fontFamily: MONO, fontSize: seniorMode ? 52 : 40, fontWeight: 700, color, lineHeight: 1 }}>{probability}%</span>
        <span style={{ marginTop: 8, fontSize: seniorMode ? 16 : 13, color: COLORS.textMuted, fontFamily: FONT }}>نسبة الخطر · {riskLabel(probability)}</span>
      </div>
    </div>
  );
}

function GaugeSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.5 }}>
      <svg width="220" height="130" viewBox="0 0 220 120">
        <path d={arcPath(110, 105, 85, 0, 1)} fill="none" stroke={COLORS.border} strokeWidth="14" strokeLinecap="round" />
      </svg>
      <div style={{ width: 80, height: 36, borderRadius: 8, backgroundColor: COLORS.border, marginTop: 4 }} />
    </div>
  );
}

/**
 * Dashboard — يستقبل النتيجة الجاهزة من App.jsx (لا يحسب شي بنفسه)
 * props: metrics, baseline, result (من computeFraudProbability)، isLoading
 */
export default function Dashboard({ metrics, baseline, result, isLoading = false, seniorMode = false }) {
  const hasData = !isLoading && metrics && result;

  return (
    <div style={{ width: "100%", borderRadius: 20, padding: 20, backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h2 style={{ color: COLORS.textPrimary, fontFamily: FONT, fontWeight: 700, fontSize: seniorMode ? 19 : 16, margin: 0 }}>لوحة المراقبة</h2>
        {hasData && (
          <span style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, color: result.isAnomaly ? COLORS.danger : COLORS.safe, backgroundColor: result.isAnomaly ? "#3A1E22" : "#183A2E", fontFamily: FONT }}>
            {result.isAnomaly ? "نشاط مشبوه" : "لا يوجد تنبيه"}
          </span>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
        {isLoading ? <GaugeSkeleton /> : hasData ? (
          <RiskGauge probability={result.probability} seniorMode={seniorMode} />
        ) : (
          <div style={{ fontSize: 13, padding: "24px 0", color: COLORS.textMuted, fontFamily: FONT }}>لا يمكن حساب نسبة الخطر بدون بيانات</div>
        )}
      </div>

      <Metrics metrics={isLoading ? undefined : metrics} baseline={baseline} isLoading={isLoading} seniorMode={seniorMode} />
    </div>
  );
}
