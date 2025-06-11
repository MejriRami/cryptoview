'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [search, setSearch] = useState('');

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>CoinView</Link>
      <div className={styles.navLinks}>
        <Link href="/dashboard" className={styles.link}>My Portfolio</Link>
        <Link href="/settings" className={styles.link}>Settings</Link>
        <Link href="/signin" className={styles.link}>Sign In</Link>
        <Link href="/register" className={styles.link}>Sign Up</Link>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
    </nav>
  );
}
