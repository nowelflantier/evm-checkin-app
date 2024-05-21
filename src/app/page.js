// app/page.js
import Link from 'next/link';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the QR Checkin App!</h1>
      <p className={styles.description}>This app allows you to easily check-in participants by scanning their QR codes.</p>
      <Link href="/enter-token">
        <button className={styles.button}>Commencer</button>
      </Link>
    </div>
  );
}
