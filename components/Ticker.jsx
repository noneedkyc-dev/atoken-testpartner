"use client";
import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Home.module.css";

const symbols = ["BTCUSDT","ETHUSDT","SOLUSDT","BNBUSDT","XRPUSDT","DOGEUSDT","ADAUSDT","AVAXUSDT"];

function formatPrice(price){
  const n = Number(price);
  if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (n >= 1) return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  return n.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 6 });
}

export default function Ticker(){
  const [prices, setPrices] = useState({});
  useEffect(() => {
    const stream = symbols.map((s) => `${s.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${stream}`);
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      const item = payload?.data;
      if (!item?.s || !item?.c) return;
      setPrices((prev) => ({ ...prev, [item.s]: item.c }));
    };
    return () => ws.close();
  }, []);

  const chips = useMemo(() => {
    return symbols.map((symbol) => {
      const label = symbol.replace("USDT", "");
      const value = prices[symbol] ? `$${formatPrice(prices[symbol])}` : "Loading...";
      return `<span class="${styles.tickerChip}"><strong>${label}</strong> ${value}</span>`;
    }).join("");
  }, [prices]);

  return (
    <div className={styles.ticker} aria-label="Live market prices">
      <div className={styles.tickerFadeLeft} />
      <div className={styles.tickerFadeRight} />
      <div className={styles.tickerTrack}>
        <div dangerouslySetInnerHTML={{ __html: chips + chips }} />
      </div>
    </div>
  );
}
