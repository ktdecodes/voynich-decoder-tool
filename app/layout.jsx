// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Voynich Decoder",
  description: "A tool to decode phonetic Voynich text",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
