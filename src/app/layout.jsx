import "../styles/global.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h1>MusicGen Simplified</h1>
        <main>{children}</main>
      </body>
    </html>
  );
}
