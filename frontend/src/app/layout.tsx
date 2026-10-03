import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VWC-MAP | Vulnerability → Weakness → Attack Pattern Intelligence",
  description: "Automated Mapping of Vulnerabilities to Attack Patterns using Large Language Models (IEEE HST 2022 Implementation)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100">{children}</body>
    </html>
  );
}
