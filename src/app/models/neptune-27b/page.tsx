import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Content from "./Content";

export const metadata: Metadata = {
  title: "Neptune 27B",
  description: "Neptune-1.0-27B-Agent — the agent-native flagship, in training",
};

export default function Neptune27BPage() {
  return (
    <div style={{ background: "#060b16", fontFamily: "'Poppins', sans-serif" }}>
      <Nav active="models" />
      <Content />
      <Footer />
    </div>
  );
}
