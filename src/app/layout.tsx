import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ainfera.ai"),
  title: {
    default: "Ainfera — models that prove themselves",
    template: "%s — Ainfera",
  },
  description:
    "Ainfera builds the Neptune model family and the factory that trains it. Every release is gated by evals and recorded in a signed audit log — competence demonstrated, not claimed.",
  icons: { icon: "/brand/ainfera-mark-ice.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {children}
      </body>
    </html>
  );
}
