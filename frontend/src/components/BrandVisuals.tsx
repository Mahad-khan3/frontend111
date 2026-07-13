"use client";

import { AnimatedHeading } from "./AnimatedHeading";

export function BrandVisuals() {
  return (
    <section className="w-full bg-surface transition-colors duration-400">
      <div
        className="flex w-full flex-col md:flex-row"
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
          <AnimatedHeading
            as="h2"
            className="whitespace-nowrap"
            style={{
              fontFamily: "var(--_font-family---font-family)",
              fontSize: "var(--_fonts---h2)",
              lineHeight: 1,
              fontWeight: "var(--_font-family---regular)",
              letterSpacing: "-0.225rem",
              color: "var(--color-text)",
            }}
          >
            On-brand visuals.
            <br />
            Made by AI.
          </AnimatedHeading>
        </div>
      </div>
    </section>
  );
}
