import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HomeContent from "./Content";

export const metadata: Metadata = {
  title: "Open-weight models built for agents",
  description:
    "Meet Neptune 27B, Ainfera's open-weight model for private agent systems. Explore its agentic design and benchmark fields, currently marked N/A.",
};

export default function Home() {
  return (
    <div className="precision-site site-shell site-shell--home">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav active="none" />
      <HomeContent />
      <Footer />
    </div>
  );
}
