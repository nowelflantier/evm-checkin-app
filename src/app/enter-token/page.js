// app/enter-token/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './EnterToken.module.css';

export default function EnterTokenPage() {
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem('auth_token', token);
    router.push('/events');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Enter your Eventmaker API Token</h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSubmit} className={styles.button}>Valider</button>
    </div>
  );
}
