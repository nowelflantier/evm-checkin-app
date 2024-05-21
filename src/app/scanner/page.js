'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function ScannerPage() {
  const [scannedData, setScannedData] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const extractUID = (qrData) => {
    if (qrData.startsWith('MECARD:UID:')) {
      const match = qrData.match(/MECARD:UID:([^;]+);/);
      return match ? match[1] : null;
    }
    return qrData;
  };

  const handleScan = async (data) => {
    if (data) {
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
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div>
      <h1>Scan Participant QR Code</h1>
      <QrScanner
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      {scannedData && <p>Scanned UID: {scannedData}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
