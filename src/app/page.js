'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './Home.module.css';

export default function HomePage() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
          (registration) => {
            console.log('Service Worker registered with scope: ', registration.scope);
          },
          (error) => {
            console.log('Service Worker registration failed: ', error);
          }
        );
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the QR Checkin App!</h1>
      <p className={styles.description}>This app allows you to easily check-in participants by scanning their QR codes.</p>
      <Link href="/enter-token">
        <button className={styles.button}>Start now!</button>
      </Link>
    </div>
  );
}
