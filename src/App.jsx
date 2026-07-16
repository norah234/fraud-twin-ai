import React, { useState, useEffect, useRef, useCallback } from "react";
import { Radio, Fingerprint, Users } from "lucide-react";

import { BASELINE, ATTACK_SCENARIOS, computeFraudProbability, adjustBaselineAfterFalseAlarm } from "./fraud-engine";
import { styles, fontImport, toneColor } from "./styles";
import Dashboard from "./Dashboard";
import { AlertCard, CalmNotice } from "./AlertCard";
import { ScenarioRow, ControlBar } from "./ScenarioButtons";
import { CustomerConfirm } from "./CustomerConfirm";
import { DecisionHistory } from "./DecisionHistory";

/* ===========================================================
   App.jsx — الملف الرئيسي (النسخة الكاملة بكل الميزات الأربع)
   مسؤولة هذا الملف: الوحدة 02
   يربط: fraud-engine (01) + Dashboard/Metrics (03) +
        AlertCard/ScenarioButtons/CustomerConfirm (04) + styles (05)

   الميزات المضافة:
   1) تأكيد العميل ("هل هذا أنت؟") — قبل القرار النهائي
   2) وضع حماية كبار السن — خط أكبر + حد تنبيه أكثر حساسية
   3) تعلّم من الإنذار الكاذب — خط الأساس يتكيّف تلقائيًا
   4) سجل قرارات تاريخي — يعرض نتائج آخر التنبيهات
=========================================================== */

const STAGES = {
  IDLE: "idle",
  RISING: "rising",
  DETECTED: "detected",
  ALERTED: "alerted",
  AWAITING_CUSTOMER: "awaiting_customer",
  CONTAINED: "contained",
  CLEARED: "cleared",
};

const STAGE_META = {
  [STAGES.IDLE]: { label: "مراقبة مستمرة", color: "#2DD4BF" },
  [STAGES.RISING]: { label: "رصد انحراف أولي…", color: "#F5A623" },
  [STAGES.DETECTED]: { label: "نمط احتيال محتمل", color: "#F5A623" },
  [STAGES.ALERTED]: { label: "تنبيه صادر", color: "#EF4444" },
  [STAGES.AWAITING_CUSTOMER]: { label: "بانتظار تأكيد العميل…", color: "#F5A623" },
  [STAGES.CONTAINED]: { label: "تم احتواء الموقف", color: "#2DD4BF" },
  [STAGES.CLEARED]: { label: "إنذار كاذب — تم الإغلاق", color: "#2DD4BF" },
};

function IntroScreen({ onStart }) {
  return (
    <div style={styles.introOverlay}>
      <div style={styles.introCard}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg,#2DD4BF,#5eead4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Fingerprint size={24} color="#0B1220" strokeWidth={2.4} />
          </div>
        </div>
        <div style={styles.introEyebrow}>FRAUD TWIN AI</div>
        <div style={styles.introTitle}>البنوك تكتشف الاحتيال بعد وقوع الضرر — نحن نكتشفه قبله</div>
        <div style={styles.introText}>توأم رقمي يراقب السلوك البنكي لحظة بلحظة، ويصدر تنبيهًا مبكرًا بمجرد رصد نمط يشابه حملات احتيال معروفة — ويشرك العميل نفسه بالقرار.</div>
        <button onClick={onStart} style={{ ...styles.btnPrimary, margin: "0 auto", width: "fit-content" }}>ابدأ العرض</button>
      </div>
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [stage, setStage] = useState(STAGES.IDLE);
  const [metrics, setMetrics] = useState(BASELINE);
  const [scenario, setScenario] = useState("phishing");
  const [alertData, setAlertData] = useState(null);
  const [seniorMode, setSeniorMode] = useState(false); // ميزة 2
  const [adaptiveBaseline, setAdaptiveBaseline] = useState(BASELINE); // ميزة 3
  const [decisionHistory, setDecisionHistory] = useState([]); // ميزة 4
  const [log, setLog] = useState([
    { id: 1, time: "10:02:14", text: "بدء دورة مراقبة جديدة — النموذج مطابق للسلوك الطبيعي", tone: "ok" },
  ]);
  const timeouts = useRef([]);
  const attackActive = useRef(false);

  const nowStr = () => new Date().toLocaleTimeString("ar-SA", { hour12: false });
  const pushLog = useCallback((text, tone = "info") => {
    setLog((l) => [{ id: Date.now() + Math.random(), time: nowStr(), text, tone }, ...l].slice(0, 8));
  }, []);

  const clearTimers = () => {
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];
  };

  // حد التنبيه ينخفض بوضع كبار السن (أكثر حساسية = حماية أعلى)
  const threshold = seniorMode ? 40 : 55;

  const runAttack = () => {
    if (attackActive.current) return;
    clearTimers();
    attackActive.current = true;
    setStage(STAGES.RISING);
    setMetrics(BASELINE);
    setAlertData(null);

    const chosen = ATTACK_SCENARIOS[scenario];
    const result = computeFraudProbability(chosen.metrics, { baseline: adaptiveBaseline, threshold });

    pushLog(`تشغيل محاكاة: ${chosen.label}`, "warn");

    timeouts.current.push(setTimeout(() => {
      setMetrics(chosen.metrics);
      pushLog("رصد ارتفاع غير معتاد في المؤشرات اللحظية", "warn");
    }, 700));

    timeouts.current.push(setTimeout(() => {
      setStage(STAGES.DETECTED);
      pushLog(`النموذج يقيّم احتمالية الاحتيال بـ ${result.probability}٪`, "warn");
    }, 1700));

    timeouts.current.push(setTimeout(() => {
      setStage(STAGES.ALERTED);
      setAlertData(result);
      pushLog(`تم إصدار تنبيه — احتمالية ${result.probability}٪`, "alert");
    }, 2900));

    // بدل الانتقال التلقائي للاحتواء، ننتظر تأكيد العميل (ميزة 1)
    timeouts.current.push(setTimeout(() => {
      setStage(STAGES.AWAITING_CUSTOMER);
      pushLog("تم إرسال إشعار فوري للعميل — بانتظار تأكيده", "warn");
    }, 4000));
  };

  // يُستدعى لما العميل يضغط "نعم هذا أنا" أو "لا لست أنا"
  const handleCustomerConfirm = (isMe) => {
    const chosen = ATTACK_SCENARIOS[scenario];
    attackActive.current = false;

    if (isMe) {
      // إنذار كاذب — العميل أكّد إنها عملية سليمة
      const updatedBaseline = adjustBaselineAfterFalseAlarm(adaptiveBaseline, alertData.reasons);
      setAdaptiveBaseline(updatedBaseline);
      setStage(STAGES.CLEARED);
      pushLog("العميل أكّد العملية — إنذار كاذب، تم تعديل خط الأساس تلقائيًا", "ok");
      setDecisionHistory((h) => [
        { id: Date.now(), scenarioLabel: chosen.label, probability: alertData.probability, verdict: "false_alarm" },
        ...h,
      ].slice(0, 6));
    } else {
      // احتيال مؤكَّد — العميل نفى العملية
      setStage(STAGES.CONTAINED);
      pushLog("العميل أكّد إنها ليست عمليته — تم تجميد الحساب فعليًا", "alert");
      setDecisionHistory((h) => [
        { id: Date.now(), scenarioLabel: chosen.label, probability: alertData.probability, verdict: "fraud" },
        ...h,
      ].slice(0, 6));
    }
  };

  const reset = () => {
    clearTimers();
    attackActive.current = false;
    setStage(STAGES.IDLE);
    setMetrics(BASELINE);
    setAlertData(null);
    pushLog("إعادة ضبط — العودة إلى وضع المراقبة الطبيعية", "info");
  };

  useEffect(() => () => clearTimers(), []);

  const meta = STAGE_META[stage];
  const isBusy = stage === STAGES.RISING || stage === STAGES.DETECTED;
  const isAlert = stage === STAGES.ALERTED || stage === STAGES.AWAITING_CUSTOMER;
  const isContained = stage === STAGES.CONTAINED;
  const isCleared = stage === STAGES.CLEARED;
  const showAlertCard = stage === STAGES.ALERTED || stage === STAGES.AWAITING_CUSTOMER || stage === STAGES.CONTAINED;
  const dashboardResult = alertData || computeFraudProbability(metrics, { baseline: adaptiveBaseline, threshold });

  if (showIntro) {
    return (
      <div dir="rtl" lang="ar" style={styles.page}>
        <style>{fontImport}</style>
        <IntroScreen onStart={() => setShowIntro(false)} />
      </div>
    );
  }

  return (
    <div dir="rtl" lang="ar" style={styles.page}>
      <style>{fontImport}</style>

      <header style={styles.header}>
        <div style={styles.brand}>
          <div style={styles.brandMark}><Fingerprint size={20} color="#0B1220" strokeWidth={2.4} /></div>
          <div>
            <div style={styles.brandName}>Fraud Twin AI</div>
            <div style={styles.brandSub}>التوأم الرقمي لسلوك العمليات البنكية</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <button
            onClick={() => setSeniorMode((s) => !s)}
            style={{ ...styles.seniorToggle, ...(seniorMode ? styles.seniorToggleActive : {}) }}
            title="حد تنبيه أكثر حساسية + خط أكبر"
          >
            <Users size={15} /> وضع حماية كبار السن
          </button>
          <div style={{ ...styles.statusPill, borderColor: meta.color, color: meta.color }}>
            <span style={{ ...styles.statusDot, background: meta.color, boxShadow: `0 0 0 4px ${meta.color}22` }} />
            {meta.label}
          </div>
        </div>
      </header>

      <ScenarioRow scenario={scenario} setScenario={setScenario} disabled={isBusy || isAlert} />
      <ControlBar onRun={runAttack} onReset={reset} disabled={isBusy || isAlert} />

      <div style={{ marginBottom: 12 }}>
        <Dashboard metrics={metrics} baseline={adaptiveBaseline} result={dashboardResult} isLoading={false} seniorMode={seniorMode} />
      </div>

      <main style={styles.grid}>
        <section style={{ ...styles.panel, gridColumn: "1 / -1" }}>
          {showAlertCard && <AlertCard data={alertData} contained={isContained} seniorMode={seniorMode} />}

          {stage === STAGES.AWAITING_CUSTOMER && (
            <div style={{ marginTop: 14 }}>
              <CustomerConfirm scenarioLabel={ATTACK_SCENARIOS[scenario].label} onConfirm={handleCustomerConfirm} />
            </div>
          )}

          {isCleared && (
            <div style={styles.calmNotice}>
              <span>✅ العميل أكّد العملية — إنذار كاذب. النظام تعلّم من هالحالة وعدّل خط الأساس تلقائيًا لتقليل الإنذارات الكاذبة المستقبلية.</span>
            </div>
          )}

          {!showAlertCard && !isCleared && <CalmNotice />}
        </section>

        <div style={{ gridColumn: "1 / -1" }}>
          <DecisionHistory items={decisionHistory} />
        </div>

        <section style={{ ...styles.panel, gridColumn: "1 / -1" }}>
          <div style={styles.panelTitleRow}>
            <Radio size={16} color="#8B96AC" />
            <span style={styles.panelTitle}>سجل الأحداث</span>
          </div>
          <ul style={styles.logList}>
            {log.map((item) => (
              <li key={item.id} style={styles.logItem}>
                <span style={{ ...styles.logDot, background: toneColor(item.tone) }} />
                <span style={styles.logTime}>{item.time}</span>
                <span style={styles.logText}>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer style={styles.footer}>
        نموذج أولي تفاعلي — البيانات محسوبة من ملف بيانات محاكى، والاحتمالية والأسباب تُحسب فعليًا داخل المتصفح
      </footer>
    </div>
  );
}
