"use client";

const CARDS = [
  "16GB",
  "32GB",
  "64GB",
  "128GB",
  "256GB",
  "512GB",
  "1TB",
  "2TB",
];

const MARQUEE_SEC = 22;

export function TrustedBy() {
  const repeated = [...CARDS, ...CARDS, ...CARDS];

  return (
    <section className="w-full overflow-hidden bg-surface pb-16 pt-10 transition-colors duration-400 md:pb-20 md:pt-12">
      {/* Mobile: heading above marquee | Desktop: side by side */}
      <div className="flex flex-col gap-8 px-8 md:flex-row md:items-start md:gap-8 md:px-12 lg:px-16">
        {/* ── Left — heading ── */}
        <div className="shrink-0">
          <span className="text-[16px] font-medium text-text transition-colors duration-400">
            Trusted By
          </span>
        </div>

        {/* ── Right — Marquee ── */}
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div
            className="tb-marquee flex gap-4"
            style={{ animationDuration: `${MARQUEE_SEC}s` }}
          >
            {repeated.map((text, i) => (
              <div
                key={`${text}-${i}`}
                className="flex shrink-0 items-center justify-center border border-border bg-surface transition-colors duration-400"
                style={{
                  width: "clamp(180px, 16vw, 230px)",
                  height: "clamp(100px, 10vw, 120px)",
                  borderRadius: "4px",
                }}
              >
                <span
                  className="text-center font-display italic text-text-secondary transition-colors duration-400"
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                    fontWeight: 500,
                    opacity: 0.7,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tb-marquee {
          animation: tb-scroll linear infinite;
          width: max-content;
        }
        @keyframes tb-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
      `}</style>
    </section>
  );
}
