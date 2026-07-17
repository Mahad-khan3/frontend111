"use client";

import img1 from "@/images/mc.png";

export function NovaDriveBanner() {
  return (
    <section className="flex w-full flex-col bg-bg px-2 pb-4 pt-6 transition-colors duration-400 md:h-[100vh]">
      {/* ── Divider ── */}
      <div
        className="mx-auto mb-4 h-px w-full md:mb-6"
        style={{ backgroundColor: "var(--color-border)" }}
      />

      {/* ── Banner Card ── */}
      <div
        className="nova-drive-banner mx-auto flex w-full max-w-[1400px] min-h-0 flex-1 flex-col overflow-hidden transition-colors duration-400 md:flex-row"
        style={{
          borderRadius: "1rem",
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        {/* ── Left — Image ── */}
        <div
          className="relative flex w-full items-center justify-center md:w-1/2"
          style={{ boxShadow: "none" }}
        >
          <img
            src={img1.src}
            alt="Nova Drive"
            draggable={false}
            className="h-[70vw] w-full object-contain md:absolute md:inset-0 md:h-full"
            style={{ filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.12))" }}
          />
        </div>

        {/* ── Right — Title + CTA ── */}
        <div className="flex w-full flex-col items-center justify-center gap-5 px-6 py-10 md:w-1/2 md:items-start md:px-12 lg:px-16">
          <h2
            className="text-text text-center transition-colors duration-400 md:text-left"
            style={{
              fontFamily: "var(--_font-family---font-family)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 8vw, 6rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              whiteSpace: "nowrap",
            }}
          >
            NOVA DRIVE
          </h2>

          <p
            className="text-text-secondary max-w-sm text-center transition-colors duration-400 md:text-left"
            style={{
              fontFamily: "var(--_font-family---font-family)",
              fontWeight: 500,
              fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
              lineHeight: 1.6,
            }}
          >
            Ultra-fast portable storage that fits in your pocket. Back up your
            life in seconds.
          </p>

          <a
            href="#shop"
            className="nova-drive-btn inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
            style={{
              fontFamily: "var(--_font-family---font-family)",
            }}
          >
            Shop Now
          </a>
        </div>
      </div>

      <style>{`
        .nova-drive-btn {
          color: var(--color-text);
          border: 1.5px solid #111111;
          background: transparent;
        }
        .nova-drive-btn:hover {
          background: #FF5A1F;
          border-color: #FF5A1F;
          color: #ffffff;
        }
        .dark .nova-drive-btn {
          border-color: #ffffff;
          color: var(--color-text);
        }
        .dark .nova-drive-btn:hover {
          background: #FF5A1F;
          border-color: #FF5A1F;
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}
