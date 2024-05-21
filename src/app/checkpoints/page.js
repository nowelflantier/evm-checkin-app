'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Checkpoints.module.css';

export default function CheckpointsPage() {
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCheckpoints = async () => {
      const token = localStorage.getItem('auth_token');
      const eventId = localStorage.getItem('selected_event');
      const response = await fetch('/api/checkpoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, eventId }),
      });
      const data = await response.json();
      console.log(data);
      setCheckpoints(data.checkpoints);
      setLoading(false);
    };

    fetchCheckpoints();
  }, []);

  const handleSelectCheckpoint = (checkpointId) => {
    localStorage.setItem('selected_checkpoint', checkpointId);
    router.push('/scanner');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Select a Checkpoint</h1>
      <ul className={styles.list}>
        {checkpoints.map((checkpoint) => (
          <li key={checkpoint._id} className={styles.listItem} onClick={() => handleSelectCheckpoint(checkpoint._id)}>
            {checkpoint.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
