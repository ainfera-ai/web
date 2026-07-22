import type { Metadata } from "next";
import Content from "./Content";

export const metadata: Metadata = {
  title: "In Training",
  description: "Ainfera Neptune — Neptune-1.0-27B is in training",
};

export default function InTrainingPage() {
  return <Content />;
}
