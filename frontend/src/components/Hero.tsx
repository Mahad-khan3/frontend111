"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type OrbitItem = {
  seed: string;
  angle: number;
  rotate: string;
};

const ORBIT_RADIUS = "rounded-[1.5rem]";
const ORBIT_WIDTH = 84;
const ORBIT_HEIGHT = 104;

const ORBIT_ITEMS: OrbitItem[] = [
  { seed: "novadrive-01", angle: 0, rotate: "-rotate-3" },
  { seed: "novadrive-02", angle: 45, rotate: "rotate-2" },
  { seed: "novadrive-03", angle: 90, rotate: "-rotate-2" },
  { seed: "novadrive-04", angle: 135, rotate: "rotate-3" },
  { seed: "novadrive-05", angle: 180, rotate: "-rotate-1" },
  { seed: "novadrive-06", angle: 225, rotate: "rotate-1" },
  { seed: "novadrive-07", angle: 270, rotate: "-rotate-3" },
  { seed: "novadrive-08", angle: 315, rotate: "rotate-2" },
];

const TAGS = ["Photos", "Videos", "Documents", "Contacts"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={containerRef}
        className="hero-section relative min-h-[70vh] overflow-hidden bg-bg  md:min-h-[65vh] md:pt-12"
      >
      {/* ── Mobile / Tablet layout ── */}
<div className="flex flex-col items-center lg:hidden">
  {/* Heading */}
  <div ref={titleRef} className="relative z-10 w-full max-w-[640px] px-5 text-center md:px-8">
    <h1 className="font-display text-[1rem] leading-[0.95] tracking-tight text-text sm:text-6xl md:text-7xl">
      Your Catalog,
      <br />
      <span className="text-text-secondary whitespace-nowrap">instantly re-shots</span>
    </h1>
  </div>

  {/* Orbit — mobile/tablet, sab positioning inline CSS se */}
  <div
    style={{
      position: "relative",
      width: "100%",
      maxWidth: 400,
      margin: "48px auto 0",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        position: "relative",
        width: 340,
        height: 340,
        overflow: "visible",
      }}
    >
      <div
        className="orbit-ring"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {ORBIT_ITEMS.map((item) => (
          <div
            key={item.seed}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `rotate(${item.angle}deg) translate(148px) rotate(-${item.angle}deg)`,
            }}
          >
            <div style={{ transform: "translate(-50%, -50%)" }}>
              <div
                className={item.rotate}
                style={{
                  width: 76,
                  height: 96,
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  backgroundImage: `url(https://picsum.photos/seed/${item.seed}/240/320)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "grayscale(15%)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
                  outline: "1px solid rgba(0,0,0,0.05)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Center button — stage ke exact center mein, har image se barabar gap */}
      <a
        href="/explore"
        className="explore-more"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
          borderRadius: "9999px",
          background: "var(--text-color, #111)",
          color: "var(--bg-color, #fff)",
          fontSize: 13,
          fontWeight: 600,
          textAlign: "center",
          padding: "0 16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          transition: "transform 0.3s ease",
        }}
      >
        Explore More
      </a>
    </div>
  </div>

  {/* Horizontal tag slider — mobile/tablet */}
  <div className="pointer-events-none mt-10 w-full overflow-hidden">
    <div className="hero-tags-horizontal flex gap-3 px-5">
      {[...TAGS, ...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="pointer-events-auto shrink-0 whitespace-nowrap rounded-full border border-black/20 bg-surface px-4 py-2 text-[15px] font-medium text-text"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
</div>

        {/* ── Desktop layout ── */}
        <div className="relative hidden lg:block">
          {/* Orbit stage */}
          <div className="mx-auto w-full max-w-[440px] px-1 flex h-[380px] items-center justify-center" style={{ marginTop: -20 }}>
            <div
              className="orbit-ring absolute inset-0"
              style={{ animationPlayState: paused ? "paused" : "running" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {ORBIT_ITEMS.map((item) => (
                <div
                  key={item.seed}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${item.angle}deg) translate(clamp(125px, 23vw, 205px)) rotate(-${item.angle}deg)`,
                  }}
                >
                  <div className="-translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`overflow-hidden ${ORBIT_RADIUS} ${item.rotate} shadow-lg shadow-black/10 ring-1 ring-black/5`}
                      style={{
                        width: ORBIT_WIDTH,
                        height: ORBIT_HEIGHT,
                        backgroundImage: `url(https://picsum.photos/seed/${item.seed}/240/320)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "grayscale(15%)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Center button */}
            <a
              href="/explore"
              className="relative z-20 flex h-[110px] w-[110px] items-center justify-center rounded-full bg-text px-4 text-center text-sm font-semibold text-bg shadow-lg transition-transform duration-300 hover:scale-105 md:h-[124px] md:w-[124px] explore-more"
            >
              Explore More
            </a>
          </div>

          {/* Right side auto-scrolling tags (hero only, behind fixed CTA) */}
          <div className="pointer-events-none absolute right-0 top-1/2 h-[300px] w-28 -translate-y-1/2 overflow-hidden">
            <div className="hero-tags-scroll pointer-events-auto flex flex-col items-end gap-4 pr-2">
              {[...TAGS, ...TAGS, ...TAGS, ...TAGS].map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="whitespace-nowrap rounded-full border border-black/20 bg-surface px-4 py-2 text-[15px] font-medium text-text"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Headline */}
          <div
            ref={titleRef}
            className="relative z-10 w-full max-w-[640px] px-8 xl:px-12 text-left"
            style={{ marginTop: "-40px" }}
          >
            <h1 className="font-display text-5xl font-small leading-[0.95] tracking-tight text-text sm:text-6xl md:text-7xl">
              Your Catalog,
              <br />
              <span className="text-text-secondary">instantly re-shots</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text-secondary">
            </p>
          </div>
        </div>
      </section>

      {/* ═══ Floating fixed CTA — visible across ALL sections ═══ */}
      <div
        className="fixed right-0 top-1/2 z-[9999] hidden -translate-y-1/2 lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        <a
          href="#next"
          className="flex items-center gap-2 rounded-l-2xl bg-[#111] px-3 py-5 text-[11px] font-semibold uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:bg-[#FF7A1A] hover:shadow-[0_4px_24px_rgba(255,122,26,0.35)]"
          style={{ fontFamily: "var(--_font-family---font-family)" }}
        >
          Site of the Day
        </a>
      </div>

      {/* Scroll animations */}
      <style>{`
        .hero-tags-scroll {
          animation: hero-tags-move 20s linear infinite;
        }
        @keyframes hero-tags-move {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-25%); }
        }
        .hero-tags-horizontal {
          animation: hero-tags-slide 12s linear infinite;
        }
        @keyframes hero-tags-slide {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-25%); }
        }
        .explore-more {
          margin-top: -20px;
        }
      `}</style>
    </>
  );
}
