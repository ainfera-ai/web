"use client";

import { useEffect, useRef } from "react";
import { bindDeck, renderDeckMarkup } from "./render.js";

export default function DeckClient() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.classList.remove("static-site");
    return () => {
      document.body.classList.add("static-site");
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    root.innerHTML = renderDeckMarkup();
    return bindDeck(root);
  }, []);

  return <div id="deck-root" ref={rootRef} />;
}
