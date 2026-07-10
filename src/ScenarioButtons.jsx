import React from "react";
import { Play, RotateCcw } from "lucide-react";
import { styles } from "./styles";
import { ATTACK_SCENARIOS } from "./fraud-engine";

/* ===========================================================
   ScenarioButtons.jsx
   مسؤولة هذا الملف: الوحدة 04 (التنبيهات والسيناريوهات)
   أزرار اختيار نوع الهجوم + زر التشغيل وإعادة الضبط
=========================================================== */

// أزرار اختيار السيناريو الثلاثة
export function ScenarioRow({ scenario, setScenario, disabled }) {
  return (
    <div style={styles.scenarioRow}>
      {Object.entries(ATTACK_SCENARIOS).map(([key, s]) => (
        <button
          key={key}
          onClick={() => setScenario(key)}
          disabled={disabled}
          style={{
            ...styles.scenarioBtn,
            ...(scenario === key ? styles.scenarioBtnActive : {}),
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

// شريط التشغيل: زر "تشغيل محاكاة هجوم" وزر "إعادة ضبط"
export function ControlBar({ onRun, onReset, disabled }) {
  return (
    <div style={styles.controlBar}>
      <div style={styles.controlText}>
        <span style={styles.controlLabel}>محاكاة حية</span>
        <span style={styles.controlHint}>يحسب النظام النسبة والأسباب فعليًا من أرقام السيناريو المختار</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onRun}
          disabled={disabled}
          style={{ ...styles.btnPrimary, opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
        >
          <Play size={16} /> تشغيل محاكاة هجوم
        </button>
        <button onClick={onReset} style={styles.btnGhost}>
          <RotateCcw size={16} /> إعادة ضبط
        </button>
      </div>
    </div>
  );
}
