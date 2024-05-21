// app/enter-token/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EnterTokenPage() {
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    localStorage.setItem('auth_token', token);
    router.push('/events');
  };

  return (
    <div>
      <h1>Enter your Eventmaker API Token</h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleSubmit}>Valider</button>
    </div>
  );
}
