import React from "react";
import { Ban, CheckCircle2, History } from "lucide-react";
import { styles } from "./styles";

/* ===========================================================
   DecisionHistory.jsx
   مسؤولة هذا الملف: الوحدة 03 (لوحة التحكم)
   يعرض آخر القرارات: احتيال مؤكَّد أو إنذار كاذب (بعد تأكيد العميل)
   يبني ثقة إحصائية بالنظام — يوضح إنه مو تشغيلة وحدة بس
=========================================================== */

export function DecisionHistory({ items }) {
  return (
    <section style={styles.panel}>
      <div style={styles.panelTitleRow}>
        <History size={16} color="#8B96AC" />
        <span style={styles.panelTitle}>سجل القرارات</span>
      </div>

      {items.length === 0 ? (
        <div style={styles.historyEmpty}>لا توجد قرارات سابقة بعد — شغّلي أول سيناريو وأكّدي مع العميل.</div>
      ) : (
        <ul style={styles.historyList}>
          {items.map((item) => (
            <li key={item.id} style={styles.historyItem}>
              <span style={{ ...styles.historyIconWrap, background: item.verdict === "fraud" ? "#3A1E1E" : "#16342E" }}>
                {item.verdict === "fraud" ? <Ban size={13} color="#F87171" /> : <CheckCircle2 size={13} color="#2DD4BF" />}
              </span>
              <span style={styles.historyText}>
                {item.scenarioLabel} — {item.verdict === "fraud" ? "احتيال مؤكَّد" : "إنذار كاذب (أكّده العميل)"}
              </span>
              <span style={styles.historyProb}>{item.probability}٪</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
