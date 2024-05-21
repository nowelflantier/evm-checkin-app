'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from './Scanner.module.css';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function ScannerPage() {
  const [scannedData, setScannedData] = useState(null);
  const [message, setMessage] = useState('');
  const [lastScannedTime, setLastScannedTime] = useState(0);
  const router = useRouter();

  const extractUID = (qrData) => {
    if (qrData.startsWith('MECARD:UID:')) {
      const match = qrData.match(/MECARD:UID:([^;]+);/);
      return match ? match[1] : null;
    }
    return qrData;
  };

  const handleScan = async (data) => {
    const currentTime = new Date().getTime();
    if (data && currentTime - lastScannedTime > 2000) {
      setLastScannedTime(currentTime);
      const uid = extractUID(data.text);
      setScannedData(uid);
      const token = localStorage.getItem('auth_token');
      const checkpointId = localStorage.getItem('selected_checkpoint');
      const eventId = localStorage.getItem('selected_event');
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, checkpointId, uid, eventId }),
      });
      const result = await response.json();
      setMessage(result.message);
      setTimeout(() => setMessage(''), 3000); // Hide message after 3 seconds

    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: '80vh',
    width: '90vw',
    objectFit: 'cover'
  };

  return (
    <div className={styles.container}>
    <h1 className={styles.heading}>Scan Participant QR Code</h1>
    <QrScanner
      delay={300}
      style={previewStyle}
      onError={handleError}
      onScan={handleScan}
    />
   {/* Remplace la caméra par une image de test */}
   {/* <img src="https://fastly.picsum.photos/id/411/1080/1920.jpg?hmac=lOOufV88QhuRyjHpbzxU9sf1Egye4crSar2t_wuVk9M" alt="Test QR Code" style={previewStyle} /> */}
      {/* Boutons pour simuler les scans */}
      {/* <button onClick={() => handleScan({ text: 'MECARD:UID:DKG76YT;' })}>Simulate Scan (Valid UID)</button>
      <button onClick={() => handleScan({ text: 'INVALID QR CODE' })}>Simulate Scan (Invalid UID)</button> */}
      {scannedData && <p className={styles.scannedData}>Scanned UID: {scannedData}</p>}
      {message && <div className={styles.popup}>{message}</div>}
  </div>
  );
}
