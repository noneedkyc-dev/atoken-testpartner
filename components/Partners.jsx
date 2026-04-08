import styles from "../styles/Home.module.css";

const partners = ["Ethereum", "Arbitrum", "Circle", "Orderly", "LayerZero"];

export default function Partners(){
  return (
    <div className={styles.supported}>
      <div className={styles.supportedLabel}>Backed By The Ecosystem</div>
      <div className={styles.partnerRow}>
        {partners.map((name) => (
          <div key={name} className={styles.partner}>
            <span className={styles.partnerMark} />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
