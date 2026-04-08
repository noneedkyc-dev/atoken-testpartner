import styles from "../styles/Home.module.css";
import Ticker from "../components/Ticker";
import Community from "../components/Community";
import Orb from "../components/Orb";
import Partners from "../components/Partners";
import { AgentIcon, CreatorIcon, CommunityIcon, CapitalIcon, FreedomIcon } from "../components/Icons";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.noise} />
      <div className={styles.shell}>
        <header className={styles.topBar}>
          <div className={styles.logoWrap}>
            <img className={styles.logoMark} src="/assets/atoken-logo.png" alt="AToken logo" />
            <div className={styles.logoText}>
              <strong>AToken</strong>
              <span>Agent-Driven Perp</span>
            </div>
          </div>

          <div className={styles.actions}>
            <a className={styles.linkGhost} href="https://dex.atoken.xyz/markets" target="_blank" rel="noreferrer">
              Explore Markets
            </a>
            <a className={styles.linkPrimary} href="https://dex.atoken.xyz" target="_blank" rel="noreferrer">
              Launch APP
            </a>
          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.rays} />

            <div className={styles.badge}>
              <span className={styles.dot} />
              <span className={styles.eyebrow}>Agent-Driven Perp</span>
            </div>

            <h1 className={styles.headline}>
              <span className={styles.headlineGradient}>Unlock Every Agent Potential</span>
            </h1>

            <p className={styles.subline}>
              Amplify Any Token, Powered by AI. AToken is AI-native financial infrastructure for agents,
              creators, communities, and capital to move together.
            </p>

            <div className={styles.ctaRow}>
              <a className={styles.linkPrimary} href="https://dex.atoken.xyz" target="_blank" rel="noreferrer">
                Launch APP
              </a>
              <a className={styles.linkGhost} href="https://dex.atoken.xyz/markets" target="_blank" rel="noreferrer">
                Explore Markets
              </a>
            </div>

            <div className={styles.secondaryStats}>
              <div className={styles.statPill}>AI-Native Trading Infrastructure</div>
              <div className={styles.statPill}>For Individuals, KOLs, Communities & Agents</div>
            </div>

            <Ticker />

            <div className={styles.centerNode}>
              <img src="/assets/atoken-logo.png" alt="AToken" />
            </div>

            <div className={`${styles.line} ${styles.line1}`} />
            <div className={`${styles.line} ${styles.line2}`} />
            <div className={`${styles.line} ${styles.line3}`} />
            <div className={`${styles.line} ${styles.line4}`} />
            <div className={`${styles.line} ${styles.line5}`} />

            <Orb className={styles.orbTop} icon={<AgentIcon />} label="AI Agents" />
            <Orb className={styles.orbLeft1} icon={<CreatorIcon />} label="Individuals & KOLs" />
            <Orb className={styles.orbLeft2} icon={<CommunityIcon />} label="Communities" />
            <Orb className={styles.orbRight1} icon={<CapitalIcon />} label="Capital" />
            <Orb className={styles.orbRight2} icon={<FreedomIcon />} label="Value & Freedom" />

            <Community />
            <Partners />
          </div>
        </section>
      </div>
    </main>
  );
}
