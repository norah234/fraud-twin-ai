import React from "react";
import { BellRing, ShieldCheck } from "lucide-react";
import { styles } from "./styles";

/* ===========================================================
   CustomerConfirm.jsx
   مسؤولة هذا الملف: الوحدة 04 (التنبيهات)
   محاكاة إشعار يوصل للعميل نفسه — يسأله "هل هذا أنت؟"
   قبل ما البنك ياخذ قرار نهائي. يحوّل النظام من "مراقبة داخلية"
   إلى منتج فيه العميل جزء من القرار.
=========================================================== */

export function CustomerConfirm({ scenarioLabel, onConfirm }) {
  return (
    <div style={styles.customerCard}>
      <div style={styles.customerHead}>
        <span style={styles.customerIconWrap}>
          <BellRing size={18} color="#2DD4BF" />
        </span>
        <div>
          <div style={styles.customerTitle}>إشعار فوري للعميل</div>
          <div style={styles.alertSub}>محاكاة الرسالة اللي توصل لجوال صاحب الحساب</div>
        </div>
      </div>

      <div style={styles.customerText}>
        رصدنا نشاطًا غير معتاد على حسابك يشبه نمط "{scenarioLabel}". هل هذا أنت؟
      </div>

      <div style={styles.customerBtnRow}>
        <button style={styles.customerBtnYes} onClick={() => onConfirm(true)}>
          <ShieldCheck size={15} style={{ display: "inline", marginLeft: 6 }} />
          نعم، هذا أنا
        </button>
        <button style={styles.customerBtnNo} onClick={() => onConfirm(false)}>
          لا، لست أنا
        </button>
      </div>
    </div>
  );
}
