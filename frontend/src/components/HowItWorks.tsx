"use client";

import { LetterReveal } from "./LetterReveal";

const ITEMS = [
  "Makes Videos",
  "Stays On Brand",
  "Create Images",
  "Generate Ads",
  "Edit Content",
];

const ROW_HEIGHT = 130;
const VISIBLE_COUNT = 3;
const SCROLL_SEC = ITEMS.length * 2.5;

export function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-surface transition-colors duration-400 md:h-screen md:flex md:flex-col">
      {/* ── Top: Title + Divider ── */}
      <div className="flex flex-col items-center pt-14 max-md:items-start max-md:px-6 max-md:pt-10">
        <LetterReveal
          as="h2"
          className="font-display font-medium tracking-tight text-text"
          style={{ fontSize: "clamp(1rem, 2vw, 2.1rem)" }}
          lines={["How It Works"]}
        />
        <div className="mt-5 h-px w-full bg-border" />
      </div>

      {/* ═══ MOBILE: "AI that" + auto-scroll (3 visible, rest scrolls inside) ═══ */}
      <div className="md:hidden">
        <div className="px-6 pt-10">
          <LetterReveal
            as="h3"
            className="whitespace-nowrap font-display font-medium leading-[0.88] tracking-tight text-text"
            style={{ fontSize: "clamp(3rem, 9vw, 5.5rem)" }}
            lines={["AI that"]}
          />
        </div>

        {/* Auto-scroll — fixed height for exactly 3 rows, overflow hidden */}
        <div
          className="relative overflow-hidden mx-6 mt-6"
          style={{ height: ROW_HEIGHT * VISIBLE_COUNT }}
        >
          {/* Top fade */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 z-10"
            style={{
              height: ROW_HEIGHT * 0.8,
              background:
                "linear-gradient(to bottom, var(--color-surface) 0%, color-mix(in srgb, var(--color-surface) 75%, transparent) 50%, transparent 100%)",
            }}
          />

          {/* Bottom fade */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
            style={{
              height: ROW_HEIGHT * 0.8,
              background:
                "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--color-surface) 75%, transparent) 50%, var(--color-surface) 100%)",
            }}
          />

          {/* Scrolling track */}
          <div
            className="hiw-scroll-track"
            style={{ animationDuration: `${SCROLL_SEC}s` }}
          >
            {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
              <div
                key={`${item}-${i}`}
                className="flex items-center border-b border-border"
                style={{ height: ROW_HEIGHT }}
              >
                <span
                  className="font-display tracking-tight text-text"
                  style={{
                    fontSize: "clamp(2.8rem, 6vw, 5rem)",
                    fontWeight: 400,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ DESKTOP: Two-column layout (unchanged) ═══ */}
      <div className="hidden md:flex md:flex-1 md:min-h-0">
        {/* Left Column */}
        <div className="relative flex w-[32%] flex-col justify-between border-r border-border px-10 py-12 lg:px-16 transition-colors duration-400">
          <div>
            <LetterReveal
              as="h3"
              className="whitespace-nowrap font-display font-medium leading-[0.88] tracking-tight text-text"
              style={{ fontSize: "clamp(3rem, 9vw, 5.5rem)" }}
              lines={["AI that"]}
            />
          </div>

          <a
            href="#get-started"
            className="cta-btn relative mb-2 mt-10 inline-flex w-fit items-center gap-1.5 overflow-hidden rounded-full bg-text px-7 py-3 text-sm font-semibold text-surface"
          >
            <span className="cta-btn-sweep rounded-full" />
            <span className="cta-btn-label flex items-center gap-1.5">
              Get Started
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Right Column — Auto-scroll */}
        <div className="relative flex w-[68%] flex-col px-14 lg:px-20">
          <div className="h-px w-full bg-border" />

          <div
            className="relative flex-1 overflow-hidden"
            style={{ minHeight: ROW_HEIGHT * VISIBLE_COUNT }}
          >
            {/* Top fade */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 z-10"
              style={{
                height: ROW_HEIGHT * 0.8,
                background:
                  "linear-gradient(to bottom, var(--color-surface) 0%, color-mix(in srgb, var(--color-surface) 75%, transparent) 50%, transparent 100%)",
              }}
            />

            {/* Bottom fade */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
              style={{
                height: ROW_HEIGHT * 0.8,
                background:
                  "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--color-surface) 75%, transparent) 50%, var(--color-surface) 100%)",
              }}
            />

            {/* Scrolling track */}
            <div
              className="hiw-scroll-track"
              style={{ animationDuration: `${SCROLL_SEC}s` }}
            >
              {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
                <div
                  key={`${item}-${i}`}
                  className="flex items-center border-b border-border"
                  style={{ height: ROW_HEIGHT }}
                >
                  <span
                    className="font-display tracking-tight text-text"
                    style={{
                      fontSize: "clamp(2.8rem, 6vw, 5rem)",
                      fontWeight: 400,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-border" />
        </div>
      </div>

      <style>{`
        .hiw-scroll-track {
          animation: hiw-scroll linear infinite;
        }
        @keyframes hiw-scroll {
          from { transform: translateY(0); }
          to   { transform: translateY(-${ITEMS.length * ROW_HEIGHT}px); }
        }
      `}</style>
    </section>
  );
}
