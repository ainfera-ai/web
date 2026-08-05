import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomeContent from "../Content";

export const metadata: Metadata = {
  title: "Neptune 27B",
  description:
    "Neptune 27B is Ainfera's open dense model program in the approximately 27-billion-parameter class, intended for private agent systems and currently in training.",
};

export default function NeptunePage() {
  return (
    <div className="precision-site site-shell site-shell--home">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Nav active="models" />
      <HomeContent />
      <Footer />
    </div>
  );
}
