"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useTheme } from "@/context/ThemeContext";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Products" },
  { href: "/features", label: "Videos" },
  { href: "/how-it-works", label: "Our Features" },
];

const otherLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
];

export function FullscreenMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (open) {
      document.body.style.overflow = "hidden";
      const ctx = gsap.context(() => {
        gsap.set(panelRef.current, { clipPath: "inset(0 0 100% 0 round 1.5rem)" });

        gsap.to(panelRef.current, {
          clipPath: "inset(0 0 0% 0 round 1.5rem)",
          duration: 0.5,
          ease: "power4.inOut",
        });

        const items = itemsRef.current?.querySelectorAll("[data-menu-item]");
        if (items) {
          gsap.fromTo(
            items,
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
              stagger: 0.04,
              delay: 0.15,
              ease: "power3.out",
            }
          );
        }
      });
      return () => ctx.revert();
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[45]"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="fixed left-1/2 z-[48] -translate-x-1/2 w-[320px] max-h-[calc(100vh-1rem)] rounded-[1.5rem] overflow-hidden flex flex-col"
        style={{ backgroundColor: "#E9E9E9", top: "64px" }}
      >
        <div className="px-4 pt-4 pb-2 shrink-0">
          <div className="flex items-center justify-between bg-black rounded-full px-2.5 py-2">
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span className="text-xs font-medium">Close</span>
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {theme === "dark" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>

            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <span className="text-[9px] font-semibold font-mono text-white/70 tabular-nums">0%</span>
            </div>
          </div>
        </div>

        <div ref={itemsRef} className="flex-1 overflow-y-auto px-5 pb-4">
          <nav className="flex flex-col">
            {mainLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                data-menu-item
                className="py-2.5 text-[1.15rem] font-bold text-black tracking-tight hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile/Tablet CTAs — Profile + Get Started */}
          <div className="mt-4 flex flex-col gap-2.5">
            <Link
              href="/track-order"
              onClick={onClose}
              data-menu-item
              className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/50 px-4 py-2.5 text-sm font-semibold text-black hover:bg-black/5 transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
              Profile
            </Link>
            <Link
              href="/shop"
              onClick={onClose}
              data-menu-item
              className="cta-btn relative flex items-center justify-center overflow-hidden rounded-full bg-black px-4 py-2.5 text-sm font-semibold text-white"
            >
              <span className="cta-btn-sweep rounded-full" />
              <span className="cta-btn-label">Get started</span>
            </Link>
          </div>

          <div className="my-3 h-px bg-black/10" />

          <div className="mb-0.5">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-black/40">
              Other
            </span>
          </div>
          <nav className="flex flex-col">
            {otherLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                data-menu-item
                className="py-1.5 text-[0.8rem] font-medium text-black/60 hover:text-black transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="shrink-0 px-5 pb-4 pt-1">
          <div className="h-px bg-black/10 mb-2.5" />
          <span className="text-[9px] font-semibold uppercase tracking-widest text-black/40 block mb-1.5">
            Social Media
          </span>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-menu-item
                className="flex items-center gap-1.5 text-[0.8rem] font-medium text-black/60 hover:text-black transition-colors duration-200"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.icon} />
                </svg>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
