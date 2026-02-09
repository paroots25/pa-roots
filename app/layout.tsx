export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#f0fdf4', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
