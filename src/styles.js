/* ===========================================================
   styles.js
   مسؤولة هذا الملف: الوحدة 03 (مصممة التجربة)
   كل ألوان وأنماط الواجهة في مكان واحد
=========================================================== */

export const styles = {
  page: { minHeight: "100vh", background: "#0B1220", color: "#EDF1F7", fontFamily: "'IBM Plex Sans Arabic', sans-serif", padding: "20px 16px 40px", boxSizing: "border-box" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandMark: { width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #2DD4BF, #5eead4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  brandName: { fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: 0.2 },
  brandSub: { fontSize: 11.5, color: "#8B96AC", marginTop: 1 },
  statusPill: { display: "flex", alignItems: "center", gap: 8, border: "1px solid", borderRadius: 999, padding: "6px 14px", fontSize: 12.5, fontWeight: 500, background: "#131B2E" },
  statusDot: { width: 7, height: 7, borderRadius: "50%" },
  scenarioRow: { display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" },
  scenarioBtn: { padding: "7px 14px", borderRadius: 8, border: "1px solid #26314A", background: "transparent", color: "#8B96AC", fontSize: 12.5, fontFamily: "inherit", cursor: "pointer" },
  scenarioBtnActive: { border: "1px solid #2DD4BF", background: "#0f2b28", color: "#2DD4BF" },
  controlBar: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#131B2E", border: "1px solid #1B2740", borderRadius: 14, padding: "14px 16px", marginBottom: 16, flexWrap: "wrap", gap: 12 },
  controlText: { display: "flex", flexDirection: "column", gap: 2 },
  controlLabel: { fontFamily: "'Tajawal', sans-serif", fontWeight: 700, fontSize: 14.5 },
  controlHint: { fontSize: 12, color: "#8B96AC" },
  btnPrimary: { display: "flex", alignItems: "center", gap: 7, background: "#2DD4BF", color: "#062521", border: "none", borderRadius: 10, padding: "10px 16px", fontSize: 13.5, fontWeight: 700, fontFamily: "inherit" },
  btnGhost: { display: "flex", alignItems: "center", gap: 7, background: "transparent", color: "#8B96AC", border: "1px solid #26314A", borderRadius: 10, padding: "10px 14px", fontSize: 13.5, fontWeight: 500, fontFamily: "inherit", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 },
  panel: { background: "#131B2E", border: "1px solid #1B2740", borderRadius: 14, padding: 16 },
  panelAlarmed: { border: "1px solid #4a3a1e", background: "#181A26" },
  panelHeadRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 8 },
  panelTitleRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 },
  panelTitle: { fontSize: 13, color: "#B7C0D6", fontWeight: 500 },
  legendRow: { display: "flex", gap: 14 },
  legendItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#8B96AC" },
  legendDash: { width: 14, height: 2, borderRadius: 2 },
  legendLine: { width: 14, height: 3, borderRadius: 2 },
  metricTop: { display: "flex", alignItems: "center", gap: 8, marginBottom: 10 },
  metricIcon: { color: "#8B96AC", display: "flex" },
  metricLabel: { fontSize: 12.5, color: "#8B96AC" },
  metricValueRow: { display: "flex", alignItems: "baseline", gap: 8 },
  metricValue: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 30, fontWeight: 500 },
  metricDeltaUp: { display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "#F5A623" },
  metricDeltaFlat: { display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "#5B6784" },
  calmNotice: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#B7C0D6", padding: "6px 2px" },
  alertHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 },
  alertIconWrap: { width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  alertTitle: { fontFamily: "'Tajawal', sans-serif", fontWeight: 700, fontSize: 15.5 },
  alertSub: { fontSize: 12, color: "#8B96AC", marginTop: 2 },
  probBadge: { marginRight: "auto", fontFamily: "'IBM Plex Mono', monospace", background: "#3A1E1E", color: "#F87171", fontSize: 15, fontWeight: 500, padding: "4px 12px", borderRadius: 8 },
  alertGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  alertCol: { display: "flex", flexDirection: "column" },
  alertColTitle: { fontSize: 11.5, color: "#5B6784", marginBottom: 8, fontWeight: 500 },
  actionList: { margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9, fontSize: 12.5, color: "#C7CFE0" },
  actionItem: { display: "flex", alignItems: "center", gap: 8 },
  logList: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 },
  logItem: { display: "flex", alignItems: "center", gap: 9, fontSize: 12.5 },
  logDot: { width: 6, height: 6, borderRadius: "50%", flexShrink: 0 },
  logTime: { fontFamily: "'IBM Plex Mono', monospace", color: "#5B6784", fontSize: 11.5, flexShrink: 0 },
  logText: { color: "#C7CFE0" },
  footer: { textAlign: "center", fontSize: 11, color: "#4A5578", marginTop: 22 },

  // ---- تحسين 2: أسباب مع شريط تقدّم (Explainability) ----
  reasonItem: { display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 },
  reasonText: { fontSize: 12.5, color: "#C7CFE0", lineHeight: 1.5 },
  reasonBarTrack: { width: "100%", height: 6, borderRadius: 4, background: "#1B2740", overflow: "hidden" },
  reasonBarFill: { height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#F5A623,#EF4444)", transition: "width .6s ease" },

  // ---- تحسين 1: شريط مقارنة الأثر الزمني ----
  impactStrip: { display: "flex", gap: 12, marginTop: 14 },
  impactCol: { flex: 1, background: "#0d1526", border: "1px solid #1B2740", borderRadius: 12, padding: "12px 14px", textAlign: "center" },
  impactColHot: { border: "1px solid #164e46", background: "#0d1f1c" },
  impactLabel: { fontSize: 11, color: "#8B96AC", marginBottom: 4 },
  impactValue: { fontFamily: "'Tajawal', sans-serif", fontWeight: 800, fontSize: 16, color: "#EDF1F7" },
  impactDetail: { fontSize: 10.5, color: "#5B6784", marginTop: 3 },

  // ---- تحسين 3: شاشة تعريفية ----
  introOverlay: { position: "fixed", inset: 0, background: "#0B1220", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 24 },
  introCard: { maxWidth: 420, textAlign: "center" },
  introEyebrow: { color: "#2DD4BF", fontSize: 12, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 },
  introTitle: { fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: 24, color: "#EDF1F7", lineHeight: 1.4, marginBottom: 12 },
  introText: { fontSize: 13.5, color: "#8B96AC", lineHeight: 1.8, marginBottom: 26 },

  // ---- ميزة: تأكيد العميل ("هل هذا أنت؟") ----
  customerCard: { background: "#131B2E", border: "1px solid #2DD4BF44", borderRadius: 14, padding: 18 },
  customerHead: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
  customerIconWrap: { width: 38, height: 38, borderRadius: 10, background: "#0f2b28", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  customerTitle: { fontFamily: "'Tajawal', sans-serif", fontWeight: 700, fontSize: 15 },
  customerText: { fontSize: 12.5, color: "#B7C0D6", lineHeight: 1.7, marginBottom: 16 },
  customerBtnRow: { display: "flex", gap: 10 },
  customerBtnYes: { flex: 1, background: "#2DD4BF", color: "#062521", border: "none", borderRadius: 10, padding: "12px 14px", fontSize: 13, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" },
  customerBtnNo: { flex: 1, background: "#3A1E1E", color: "#F87171", border: "1px solid #5a2a2a", borderRadius: 10, padding: "12px 14px", fontSize: 13, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" },

  // ---- ميزة: سجل القرارات التاريخي ----
  historyList: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 },
  historyItem: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, background: "#0d1526", border: "1px solid #1B2740" },
  historyIconWrap: { width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  historyText: { flex: 1, fontSize: 12, color: "#C7CFE0" },
  historyProb: { fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: "#8B96AC" },
  historyEmpty: { fontSize: 12, color: "#5B6784", padding: "6px 2px" },

  // ---- ميزة: وضع حماية كبار السن ----
  seniorToggle: { display: "flex", alignItems: "center", gap: 7, background: "transparent", color: "#8B96AC", border: "1px solid #26314A", borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 500, fontFamily: "inherit", cursor: "pointer" },
  seniorToggleActive: { border: "1px solid #F5A623", background: "#2b210f", color: "#F5A623" },
};


export function toneColor(tone) {
  if (tone === "warn") return "#F5A623";
  if (tone === "alert") return "#EF4444";
  if (tone === "ok") return "#2DD4BF";
  return "#5B6784";
}

export const fontImport = `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@500;700;900&family=IBM+Plex+Sans+Arabic:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap');

/* تحسين 4: نبضة خفيفة عند صدور التنبيه */
@keyframes alertPulse {
  0%   { transform: scale(1); }
  30%  { transform: scale(1.015); }
  60%  { transform: scale(0.998); }
  100% { transform: scale(1); }
}
.alert-pulse { animation: alertPulse 0.5s ease; }
`;
