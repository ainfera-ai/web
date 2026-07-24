"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HuggingFaceLogo from "./HuggingFaceLogo";

export type NavKey = "none" | "models" | "company" | "research";

type MenuItem = { label: string; href: string; external?: boolean; status?: string };
type Menu = {
  key: Exclude<NavKey, "none">;
  label: string;
  href: string;
  external?: boolean;
  items: MenuItem[];
};

const MENUS: Menu[] = [
  {
    key: "models",
    label: "Models",
    href: "https://huggingface.co/ainfera-ai/Neptune-1.0-27B",
    external: true,
    items: [
      { label: "Neptune 27B", href: "https://huggingface.co/ainfera-ai/Neptune-1.0-27B", external: true, status: "In training" },
    ],
  },
  {
    key: "company",
    label: "Company",
    href: "/about",
    items: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    key: "research",
    label: "Research",
    href: "/philosophy",
    items: [
      { label: "Philosophy", href: "/philosophy" },
      { label: "Whitepaper", href: "/whitepaper" },
    ],
  },
];

export default function Nav({
  active = "none",
  banner = true,
}: {
  active?: NavKey;
  banner?: boolean;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero =
      document.querySelector<HTMLElement>("[data-nav-hero]") ??
      document.querySelector<HTMLElement>(".home-hero") ??
      document.querySelector<HTMLElement>("main > header, main > section");

    if (!hero) {
      setPastHero(true);
      return;
    }

    const updateSurface = () => {
      setPastHero(hero.getBoundingClientRect().bottom <= 67);
    };

    updateSurface();
    window.addEventListener("scroll", updateSurface, { passive: true });
    window.addEventListener("resize", updateSurface);

    return () => {
      window.removeEventListener("scroll", updateSurface);
      window.removeEventListener("resize", updateSurface);
    };
  }, []);

  const closeMenus = () => {
    setOpen(null);
    setMobileOpen(false);
  };

  return (
    <>
      {banner && (
        <a
          className="site-nav__banner"
          href="https://huggingface.co/ainfera-ai/Neptune-1.0-27B"
          target="_blank"
          rel="noreferrer"
        >
          <span>Neptune 27B is in training</span>
        </a>
      )}

      <header className="site-nav" data-past-hero={pastHero ? "true" : "false"}>
      <div className="site-nav__inner">
        <Link href="/" className="site-nav__brand" onClick={closeMenus}>
          <img src="/brand/ainfera-mark-ice.svg" alt="" width="28" height="28" />
          <span>ainfera</span>
        </Link>

        <nav className="site-nav__desktop" aria-label="Primary navigation">
          {MENUS.map((menu) => {
            const isOpen = open === menu.key;
            const isActive = active === menu.key;

            return (
              <div
                className="site-nav__group"
                data-menu={menu.key}
                key={menu.key}
                onMouseEnter={() => setOpen(menu.key)}
                onMouseLeave={() => setOpen((value) => (value === menu.key ? null : value))}
              >
                {menu.external ? (
                  <a
                    className="site-nav__trigger"
                    href={menu.href}
                    target="_blank"
                    rel="noreferrer"
                    data-active={isActive || isOpen ? "true" : "false"}
                    aria-expanded={isOpen}
                    onFocus={() => setOpen(menu.key)}
                    onClick={closeMenus}
                  >
                    {menu.label}
                    <span aria-hidden="true">⌄</span>
                  </a>
                ) : (
                  <Link
                    className="site-nav__trigger"
                    href={menu.href}
                    data-active={isActive || isOpen ? "true" : "false"}
                    aria-expanded={isOpen}
                    onFocus={() => setOpen(menu.key)}
                    onClick={closeMenus}
                  >
                    {menu.label}
                    <span aria-hidden="true">⌄</span>
                  </Link>
                )}

                {isOpen && (
                  <div className="site-nav__dropdown">
                    {menu.items.map((item) =>
                      item.external ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={closeMenus}
                        >
                          <span>{item.label}</span>
                          {item.status && <span className="site-nav__status">{item.status}</span>}
                        </a>
                      ) : (
                        <Link key={item.label} href={item.href} onClick={closeMenus}>
                          <span>{item.label}</span>
                          {item.status && <span className="site-nav__status">{item.status}</span>}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <a
          className="site-nav__hf-status"
          href="https://huggingface.co/ainfera-ai"
          target="_blank"
          rel="noreferrer"
          aria-label="Ainfera on Hugging Face; public model cards are not yet available"
        >
          <HuggingFaceLogo />
          <span>Hugging Face</span>
          <strong>Public cards N/A</strong>
        </a>

        <button
          className="site-nav__menu-button"
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      {mobileOpen && (
        <nav className="site-nav__mobile" aria-label="Mobile navigation">
          {MENUS.map((menu) => (
            <div data-menu={menu.key} key={menu.key}>
              {menu.external ? (
                <a
                  className="site-nav__mobile-heading"
                  href={menu.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenus}
                >
                  {menu.label}
                </a>
              ) : (
                <Link className="site-nav__mobile-heading" href={menu.href} onClick={closeMenus}>
                  {menu.label}
                </Link>
              )}
              {menu.items.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenus}
                  >
                    <span>{item.label}</span>
                    {item.status && <span className="site-nav__status">{item.status}</span>}
                  </a>
                ) : (
                  <Link key={item.label} href={item.href} onClick={closeMenus}>
                    <span>{item.label}</span>
                    {item.status && <span className="site-nav__status">{item.status}</span>}
                  </Link>
                )
              )}
            </div>
          ))}
        </nav>
      )}
      </header>
    </>
  );
}
