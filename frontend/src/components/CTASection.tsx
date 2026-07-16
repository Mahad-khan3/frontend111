"use client";

import Link from "next/link";
import { LetterReveal } from "./LetterReveal";
import { useUserName } from "@/context/UserNameContext";

const GRID_ICON = (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <circle cx="3"   cy="3"   r="1.5" />
    <circle cx="8"   cy="3"   r="1.5" />
    <circle cx="13"  cy="3"   r="1.5" />
    <circle cx="3"   cy="8"   r="1.5" />
    <circle cx="8"   cy="8"   r="1.5" />
    <circle cx="13"  cy="8"   r="1.5" />
    <circle cx="3"   cy="13"  r="1.5" />
    <circle cx="8"   cy="13"  r="1.5" />
    <circle cx="13"  cy="13"  r="1.5" />
  </svg>
);

export function CTASection() {
  const { userName } = useUserName();
  return (
    <section
      className="w-full hidden md:block bg-surface transition-colors duration-400 dark:bg-black"
      style={{
        paddingTop: "clamp(4rem, 8vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 8rem)",
        paddingLeft: "clamp(2rem, 5vw, 5rem)",
        paddingRight: "clamp(2rem, 5vw, 5rem)",
      }}
    >
      <div
        className="mx-auto flex items-end justify-between"
        style={{ maxWidth: "1400px" }}
      >
        {/* Left — heading + description */}
        <div style={{ maxWidth: "560px" }}>
          <LetterReveal
            as="h2"
            style={{
              fontFamily: "var(--_font-family---font-family)",
              fontSize: "clamp(2rem, 4.5vw, 4.25rem)",
              fontWeight: 400,
              color: "var(--color-text)",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              marginBottom: "clamp(1rem, 1.5vw, 1.5rem)",
            }}
            lines={[`${userName}, back up photos.`, "Free up space."]}
          />
          <p
            style={{
              fontFamily: "var(--_font-family---font-family)",
              fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)",
              fontWeight: 500,
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "420px",
            }}
          >
            {userName}, no cables, no cloud fees, no waiting — just plug in and back up.
          </p>
        </div>

        {/* Right — 4-dot circular button */}
        <Link
          href="#next"
          className="cta-fab"
          aria-label="Go to next section"
        >
          <div
            className="cta-fab-btn flex items-center justify-center rounded-full transition-all duration-300 ease-out"
            style={{
              width: "clamp(3rem, 4vw, 4.25rem)",
              height: "clamp(3rem, 4vw, 4.25rem)",
              backgroundColor: "var(--color-surface)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
              color: "var(--color-text)",
            }}
          >
            {GRID_ICON}
          </div>
        </Link>
      </div>

      <style>{`
        .cta-fab:hover .cta-fab-btn {
          background-color: #FF7A1A !important;
          box-shadow: 0 4px 24px rgba(255, 122, 26, 0.35),
                      0 0 0 4px rgba(255, 122, 26, 0.1) !important;
          transform: scale(1.05);
          color: #FFFFFF !important;
        }
      `}</style>
    </section>
  );
}
