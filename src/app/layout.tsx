import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ainfera.ai"),
  title: {
    default: "Ainfera - models that prove themselves",
    template: "%s - Ainfera",
  },
  description:
    "Ainfera builds open-weight Neptune models for private agent systems, with tool use, long-horizon execution, recovery, and evaluation records that keep evidence attached.",
  icons: { icon: "/brand/ainfera-mark-ice.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060b16",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="static-site">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {children}
      </body>
    </html>
  );
}
