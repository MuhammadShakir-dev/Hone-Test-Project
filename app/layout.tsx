import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tennis — Live Scores",
  description: "Tennis dashboard with live scores, statistics and rankings.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
