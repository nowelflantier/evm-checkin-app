'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './Home.module.css';

export default function HomePage() {
  const [cameraPermission, setCameraPermission] = useState(null);

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

    // Vérification de la permission de l'appareil photo au chargement
    checkCameraPermission();

    async function checkCameraPermission() {
      try {
        const result = await navigator.permissions.query({ name: 'camera' });
        handlePermissionStatus(result.state);

        // Écoute les changements de statut
        result.onchange = () => {
          handlePermissionStatus(result.state);
        };
      } catch (error) {
        console.error('Failed to query camera permission:', error);
      }
    }

    function handlePermissionStatus(status) {
      setCameraPermission(status);
      localStorage.setItem('cameraPermission', status);
    }
  }, []);

  // Demander l'accès à l'appareil photo si nécessaire
  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      handlePermissionStatus('granted');
      console.log('Camera access granted');
      // Fermer le flux de l'appareil photo après l'obtention de la permission
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      handlePermissionStatus('denied');
      console.error('Camera access denied:', error);
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the QR Checkin App!</h1>
      <p className={styles.description}>This app allows you to easily check-in participants by scanning their QR codes.</p>
      {cameraPermission !== 'granted' && (
        <button className={styles.button} onClick={requestCameraAccess}>
          Grant Camera Access
        </button>
      )}
      <Link href="/enter-token">
        <button className={styles.button}>Start now!</button>
      </Link>
    </div>
  );
}