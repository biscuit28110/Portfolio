import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr"  data-theme="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
