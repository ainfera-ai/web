import DeckClient from "./DeckClient";

export const metadata = {
  title: "Ainfera — StudioTune investor deck",
  description:
    "Private unpublished Ainfera investor preparation for StudioTune. Not a live raise, public beta, or published narrative.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const viewport = {
  themeColor: "#060b16",
};

export default function DeckPage() {
  return <DeckClient />;
}
