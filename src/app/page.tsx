import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LandingContent from "./LandingContent";

export const metadata: Metadata = {
  title: "Neptune, Aeneas, and Factory",
  description:
    "Explore Ainfera's three products: Neptune 27B, Aeneas 9B, and Factory, the lifecycle system connecting model definition, evaluation, and release evidence.",
};

export default function Home() {
  return (
    <div className="precision-site site-shell site-shell--home">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav active="none" />
      <LandingContent />
      <Footer />
    </div>
  );
}
