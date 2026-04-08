"use client";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Community(){
  const [wechatOpen, setWechatOpen] = useState(false);
  const [toast, setToast] = useState("");

  function showDiscord(){
    setToast("Discord link placeholder. Add your official Discord URL here.");
    setTimeout(() => setToast(""), 2400);
  }

  return (
    <>
      <div className={styles.community}>
        <a href="https://t.me/atokenxyz" target="_blank" rel="noreferrer">Telegram</a>
        <a href="https://x.com/ATokenxyz" target="_blank" rel="noreferrer">X</a>
        <button onClick={showDiscord}>Discord</button>
        <button onClick={() => setWechatOpen(true)}>Wechat</button>
      </div>

      {wechatOpen && (
        <div className={styles.wxModal} onClick={() => setWechatOpen(false)}>
          <div className={styles.wxPanel} onClick={(e) => e.stopPropagation()}>
            <h3>Follow AToken on Wechat</h3>
            <p>Scan the QR code to connect with the AToken community.</p>
            <img src="/wechatqr.png" alt="AToken Wechat QR" />
            <button className={styles.closeBtn} onClick={() => setWechatOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {toast && <div className={styles.toast}>{toast}</div>}
    </>
  );
}
