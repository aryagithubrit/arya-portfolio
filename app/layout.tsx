import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arya VP — Embedded Systems & Industrial IoT Engineer",
  description: "Pre-final year ECE student at MEC Kochi. Building embedded firmware, industrial IoT gateways, and autonomous hardware that ships.",
  keywords: ["Arya VP", "ECE", "Embedded Systems", "IoT", "ESP32", "Modbus", "MQTT", "MEC Kochi"],
  openGraph: {
    title: "Arya VP — Embedded Systems & Industrial IoT Engineer",
    description: "Building the bridge between silicon and the cloud.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
