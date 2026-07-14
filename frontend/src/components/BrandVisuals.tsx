"use client";

import { LetterReveal } from "./LetterReveal";

export function BrandVisuals() {
  return (
    <section className="w-full bg-surface transition-colors duration-400 dark:bg-black">
      <div
        className="flex w-full flex-col py-[1.5rem] md:flex-row"
        style={{ borderTop: "1px solid var(--lines)" }}
      >
        {/* Left column — small label top-left, ~25% width */}
        <div className="what-section-left w-full shrink-0 md:w-[25%]">
          <span
            style={{
              fontFamily: "var(--_font-family---font-family)",
              fontSize: "var(--_fonts---tag)",
              lineHeight: 1.5,
              fontWeight: "var(--_font-family---regular)",
              color: "var(--color-text)",
            }}
          >
            What you can do
          </span>
        </div>

        {/* Right column — large headline, top-aligned, ~75% width */}
        <div className="what-section-right flex flex-1 flex-col justify-start">
          <LetterReveal
            as="h2"
            className="whitespace-nowrap"
            style={{
              fontFamily: "var(--_font-family---font-family)",
              fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
              lineHeight: 1,
              fontWeight: 300,
              letterSpacing: "-0.225rem",
              color: "var(--color-text)",
            }}
            lines={["On-brand visuals.", "Made by AI."]}
          />
        </div>
      </div>
    </section>
  );
}
