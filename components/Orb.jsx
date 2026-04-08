import styles from "../styles/Home.module.css";

export default function Orb({ className, icon, label }){
  return (
    <div className={`${styles.orb} ${className}`}>
      <div className={styles.orbIcon}>{icon}</div>
      <span>{label}</span>
    </div>
  );
}
