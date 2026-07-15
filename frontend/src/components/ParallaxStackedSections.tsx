"use client";

import { useEffect, useRef, useCallback } from "react";
import { LetterReveal } from "./LetterReveal";

const FONT = '"SF Pro Display", Arial, sans-serif';
const HEADING_STYLE: React.CSSProperties = {
  fontFamily: FONT,
  fontWeight: 400,
  color: "rgb(2, 1, 8)",
  fontSize: 69,
  lineHeight: "65px",
  fontStyle: "normal",
};

type SectionData = {
  id: string;
  label: string;
  number: string;
  heading: [string, string];
  leftLabel: string;
  rightLabel: string;
  subheading: [string, string];
  gradient: string;
};

const SECTIONS: SectionData[] = [
  {
    id: "pb",
    label: "PB",
    number: "01",
    heading: ["Plug into", "iPhone."],
    leftLabel: "Lightning connector",
    rightLabel: "No app conflicts",
    subheading: ["Flip out the Lightning side", "and plug directly into your iPhone or iPad."],
    gradient: "linear-gradient(135deg, #609db5, #de8128)",
  },
  {
    id: "go",
    label: "GO",
    number: "02",
    heading: ["Open", "the app."],
    leftLabel: "Auto-detects drive",
    rightLabel: "One-tap backup",
    subheading: ["The companion app finds your drive", "and shows your photos, videos & files instantly."],
    gradient: "linear-gradient(135deg, #555be5, #aa6f7e, #e4752a)",
  },
  {
    id: "cb",
    label: "CB",
    number: "03",
    heading: ["Choose what", "to back up."],
    leftLabel: "Select all or specific albums",
    rightLabel: "Preview before transfer",
    subheading: ["Pick exactly what you want", "moved to free up phone storage."],
    gradient: "linear-gradient(135deg, #8f6ba8, #6260dc)",
  },
  {
    id: "ax",
    label: "AX",
    number: "04",
    heading: ["Flip & connect", "to PC/Mac."],
    leftLabel: "USB 3.0 on the other end",
    rightLabel: "Drag-and-drop ready",
    subheading: ["Rotate the drive around", "and plug the USB-A side into any computer."],
    gradient: "linear-gradient(135deg, #ae201f, #d34726)",
  },
];

function DividerWithTicks() {
  return (
    <div className="relative w-full" style={{ height: 1 }}>
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 border-b border-l border-black/40" />
      <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 border-b border-r border-black/40" />
      <div className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-black/25" />
    </div>
  );
}

function MockCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm ${className}`}
      style={{ filter: "grayscale(0.6) opacity(0.5)" }}
    >
      <div className="flex items-center gap-2 border-b border-black/8 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <div className="ml-4 h-2 flex-1 rounded bg-black/10" />
      </div>
      <div className="p-4">
        <div className="mb-3 aspect-[3/2] rounded-lg bg-black/8" />
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded bg-black/10" />
          <div className="h-2 w-1/2 rounded bg-black/8" />
        </div>
      </div>
    </div>
  );
}

function GetStartedButton() {
  return (
    <a
      href="#get-started"
      className="group relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 md:px-6 md:py-3 md:text-sm"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "linear-gradient(135deg, #FF7A1A, #FF5A1F)" }}
      />
      <span className="relative flex items-center gap-1.5">
        Get started
        <svg
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </a>
  );
}

function IntroHeader() {
  return (
      <section
        className="relative z-0 flex w-full flex-col items-start justify-center bg-white px-6 py-16 dark:bg-[#0a0a0a] md:px-12 md:py-20 lg:px-16 xl:px-20"
        style={{ height: "100vh", minHeight: "100vh" }}
      >
        <div className="mb-6 w-full border-t border-black/10 dark:border-white/15 md:mb-8" />
        <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <LetterReveal
              as="h1"
              className="font-display tracking-tight text-[rgb(2,1,8)] dark:text-white"
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 69,
                lineHeight: "65px",
                fontStyle: "normal",
                margin: 0,
              }}
              lines={[
                "From full storage",
                { text: "to free space in four steps.", className: "text-black/40 dark:text-white/40" },
              ]}
            />
          </div>
          <p
            className="max-w-xs text-right text-sm leading-relaxed text-black/50 dark:text-white/50 md:text-base"
            style={{ fontFamily: FONT }}
          >
            Plug in and back up your entire camera roll in minutes.
          </p>
        </div>
      </section>
  );
}

export function ParallaxStackedSections() {
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outerRefs = useRef<(HTMLElement | null)[]>([]);

  const setInnerRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    innerRefs.current[i] = el;
  }, []);

  const setOuterRef = useCallback((i: number) => (el: HTMLElement | null) => {
    outerRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const SCALE_MIN = 0.78;
    const TILT_MAX = 4;
    const OPACITY_MIN = 0.4;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          for (let i = 0; i < SECTIONS.length - 1; i++) {
            const outer = outerRefs.current[i];
            const nextSection = outerRefs.current[i + 1];
            if (!outer || !nextSection) continue;

            const nextRect = nextSection.getBoundingClientRect();
            const vh = window.innerHeight;
            const progress = Math.max(0, Math.min(1, 1 - nextRect.top / vh));

            const scale = 1 - (1 - SCALE_MIN) * progress;
            const rotateX = TILT_MAX * progress;
            const opacity = 1 - (1 - OPACITY_MIN) * progress;

            // whole-section transform: tilt back (fold) + shrink + fade
            outer.style.transform = `perspective(1200px) rotateX(${rotateX}deg) scale(${scale})`;
            outer.style.opacity = String(opacity);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // touch / mobile scroll also fires native scroll events, so behavior is identical
    window.addEventListener("touchmove", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <IntroHeader />
      <div className="relative w-full" style={{ height: SECTIONS.length * 100 + "vh" }}>
        {SECTIONS.map((data, i) => {
          const isFirst = i === 0;
          const isLast = i === SECTIONS.length - 1;

          return (
            <section
              key={data.id}
              ref={setOuterRef(i)}
              className="relative w-full overflow-hidden"
              style={{
                position: "sticky",
                top: 0,
                zIndex: i + 1,
                height: "100vh",
                minHeight: "100vh",
                background: data.gradient,
                transformOrigin: "top center",
                willChange: "transform, opacity",
              }}
            >
              <div
                ref={setInnerRef(i)}
                className="flex h-full flex-col px-6 py-8 transition-transform duration-100 ease-out md:px-12 md:py-10 lg:px-16 xl:px-20"
                style={{ willChange: "transform", transformOrigin: "center top" }}
              >
                {/* Top row: label center, number right */}
                <div className="relative flex items-start justify-between">
                  <div className="flex-1" />
                  <span className="absolute left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-widest text-black/50 md:text-sm">
                    ({data.label})
                  </span>
                  <span
                    className={`leading-none ${
                      isFirst
                        ? "text-3xl font-light text-black/30 md:text-5xl lg:text-6xl"
                        : "text-4xl font-bold text-black md:text-6xl lg:text-7xl"
                    }`}
                    style={{ fontFamily: FONT }}
                  >
                    {data.number}
                  </span>
                </div>

                {/* Heading left-aligned */}
                <div className="mt-6 md:mt-8 lg:mt-10">
                  <h2 style={HEADING_STYLE} className="text-left">
                    {data.heading[0]}
                    <br />
                    {data.heading[1]}
                  </h2>
                </div>

                {isFirst ? (
                  <>
                    {/* Divider with corner ticks + center tick */}
                    <div className="mt-6 md:mt-8 lg:mt-10">
                      <DividerWithTicks />
                    </div>

                    {/* Two-column labels */}
                    <div className="mt-4 flex flex-wrap gap-x-12 gap-y-3 md:mt-5 lg:mt-6">
                      <div className="flex-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-black/50 md:text-sm">
                          {data.leftLabel}
                        </span>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-black/50 md:text-sm">
                          {data.rightLabel}
                        </span>
                      </div>
                    </div>

                    {/* Subheading */}
                    <div className="mt-3 md:mt-4 lg:mt-5">
                      <p className="text-sm leading-snug text-black/80 md:text-base lg:text-lg"
                        style={{ fontFamily: FONT }}
                      >
                        <span className="font-semibold">{data.subheading[0]}</span>
                        <br />
                        <span className="text-black/50">{data.subheading[1]}</span>
                      </p>
                    </div>

                    {/* Button + dividers beside it, centered */}
                    <div className="mt-4 flex items-center justify-center gap-4 md:mt-5 lg:mt-6">
                      <div className="h-px flex-1 bg-black/15" />
                      <GetStartedButton />
                      <div className="h-px flex-1 bg-black/15" />
                    </div>

                    {/* Preview card */}
                    <div className="mt-auto flex justify-center">
                      <MockCard className="w-full max-w-sm md:max-h-[55%] md:overflow-hidden" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Divider (plain) */}
                    <div className="mt-6 md:mt-8 lg:mt-10">
                      <div className="relative w-full" style={{ height: 1 }}>
                        <div className="absolute inset-0 bg-black/15" />
                      </div>
                    </div>

                    {/* Two-column labels */}
                    <div className="mt-4 flex flex-wrap gap-x-12 gap-y-3 md:mt-5 lg:mt-6">
                      <div className="flex-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-black/50 md:text-sm">
                          {data.leftLabel}
                        </span>
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-black/50 md:text-sm">
                          {data.rightLabel}
                        </span>
                      </div>
                    </div>

                    {/* Subheading */}
                    <div className="mt-3 md:mt-4 lg:mt-5">
                      <p className="text-sm leading-snug text-black/80 md:text-base lg:text-lg"
                        style={{ fontFamily: FONT }}
                      >
                        <span className="font-semibold">{data.subheading[0]}</span>
                        <br />
                        <span className="text-black/50">{data.subheading[1]}</span>
                      </p>
                    </div>

                    {/* Center region: vertical connector line + button + card */}
                    <div className="relative mt-4 flex flex-1 flex-col items-center justify-center gap-6 md:mt-5 lg:mt-6">
                      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/15" />
                      <div className="relative z-10">
                        <GetStartedButton />
                      </div>
                      <div className="relative z-10 flex w-full justify-center">
                        <MockCard
                          className={`w-full max-w-sm ${
                            isLast ? "" : "md:max-h-[55%] md:overflow-hidden"
                          }`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
