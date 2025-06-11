import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="/support" className={styles.link}>Support</a>
        <a href="/about" className={styles.link}>About</a>
        <a href="/resources" className={styles.link}>Resources</a>
      </div>
      <p className={styles.copy}>© 2025 CoinView. All rights reserved.</p>
    </footer>
  );
}
