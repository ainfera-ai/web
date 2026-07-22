import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomeContent from "./Content";

export const metadata: Metadata = {
  description: "Ainfera Neptune — models that prove themselves",
};

export default function Home() {
  return (
    <div
      style={
        {
          background: "#060b16",
          fontFamily: "'Poppins', sans-serif",
          "--ease": "cubic-bezier(0.16,1,0.3,1)",
        } as React.CSSProperties
      }
    >
      <Nav active="none" />
      <HomeContent />
      <Footer />
    </div>
  );
}
