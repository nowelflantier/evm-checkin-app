// app/page.js
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to the QR Checkin App!</h1>
      <Link href="/enter-token">
        <button>Commencer</button>
      </Link>
    </div>
  );
}
