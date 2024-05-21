import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EVM Checkin App",
  description: "An app for checking in participants at EVM events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0070f3" />
        <link rel="icon" href="/icons/icon-192x192.png" />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
