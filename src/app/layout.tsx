import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`scroll-smooth ${geist.variable} ${geistMono.variable}`}>
      <body className={`overflow-x-hidden bg-slate-950 font-sans antialiased ${geist.className}`}>
        {children}
      </body>
    </html>
  );
}
