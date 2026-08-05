import type { Metadata, Viewport } from "next";
import MotionController from "@/components/MotionController";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ainfera.ai"),
  title: {
    default: "Ainfera | Models for agent systems",
    template: "%s | Ainfera",
  },
  description:
    "Ainfera develops Neptune 27B and Aeneas 9B for agent systems, with Factory connecting model definition, evaluation, and release evidence.",
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
        <MotionController />
        {children}
      </body>
    </html>
  );
}
