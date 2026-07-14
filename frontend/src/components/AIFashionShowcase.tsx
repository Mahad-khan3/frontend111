"use client";
import { LetterReveal } from "./LetterReveal";
import img1 from "@/images/WhatsApp Image 2026-07-13 at 12.07.29 PM.jpeg";
import img2 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM.jpeg";
import img3 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM (1).jpeg";
import img4 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM (2).jpeg";
import img5 from "@/images/WhatsApp Image 2026-07-13 at 12.07.31 PM.jpeg";

const IMGS = [img1.src, img2.src, img3.src, img4.src, img5.src];

const ROW1 = [
  { src: IMGS[0], alt: "Portrait 1" },
  { src: IMGS[1], alt: "Portrait 2" },
  { src: IMGS[2], alt: "Portrait 3" },
  { src: IMGS[3], alt: "Portrait 4" },
  { src: IMGS[4], alt: "Portrait 5" },
];
const ROW2 = [
  { src: IMGS[0], alt: "Portrait 6" },
  { src: IMGS[1], alt: "Portrait 7" },
  { src: IMGS[2], alt: "Portrait 8" },
  { src: IMGS[3], alt: "Portrait 9" },
];

const MOBILE_ROW1 = [
  { src: IMGS[0], alt: "Portrait 1" },
  { src: IMGS[1], alt: "Portrait 2" },
  { src: IMGS[2], alt: "Portrait 3" },
];
const MOBILE_ROW2 = [
  { src: IMGS[3], alt: "Portrait 4" },
  { src: IMGS[4], alt: "Portrait 5" },
  { src: IMGS[0], alt: "Portrait 6" },
];

const DL_ICON = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);
const TRASH_ICON = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
);

function Card({
  src,
  alt,
  pos = "50% 12%",
}: {
  src: string;
  alt: string;
  pos?: string;
}) {
  return (
    <div className="group relative min-h-0 min-w-0 overflow-hidden rounded-xl" style={{ aspectRatio: "3/4" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ objectPosition: pos }}
        draggable={false}
      />
      <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button aria-label="Download" className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60">{DL_ICON}</button>
        <button aria-label="Delete" className="flex h-6 w-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60">{TRASH_ICON}</button>
      </div>
    </div>
  );
}

export function AIFashionShowcase() {
  return (
    <>
      {/* ═══════════════ DESKTOP — unchanged ═══════════════ */}
      <section
        className="hidden lg:block w-full px-2 pb-2"
        style={{ backgroundColor: "var(--color-bg)", height: "100vh", overflow: "hidden" }}
      >
        <div
          className="flex w-full h-full overflow-hidden transition-colors duration-400"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            borderRadius: "clamp(1rem, 2.5vw, 2.5rem)",
            padding: "clamp(0.5rem, 1.2vw, 1.25rem)",
          }}
        >
          {/* ── LEFT: label + preview card ── */}
          <div
            className="flex h-full flex-col"
            style={{ width: "20%", paddingRight: "clamp(0.375rem, 0.8vw, 0.75rem)" }}
          >
            {/* Label */}
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="inline-block h-1 w-1 rounded-full bg-black/70" />
              <span
                style={{
                  fontFamily: "var(--_font-family---font-family)",
                  fontSize: "clamp(10px, 0.75vw, 13px)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                AI Fashion Photoshoot
              </span>
            </div>

            {/* Preview card — vertically centered */}
            <div className="flex min-h-0 flex-1 items-center justify-center py-3">
              <div
                className="relative w-full overflow-hidden rounded-2xl bg-neutral-900"
                style={{ maxHeight: "75%" }}
              >
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.35) 1px,transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img1.src}
                  alt="Preview"
                  className="relative block h-full w-full object-cover"
                  style={{ aspectRatio: "3/4" }}
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: navbar + gallery ── */}
          <div
            className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden"
            style={{ backgroundColor: "#0A0A0A", borderRadius: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
          >
            {/* Navbar */}
            <div
              className="flex shrink-0 items-center justify-between"
              style={{
                backgroundColor: "#1A1A1A",
                borderRadius: "clamp(0.5rem, 0.8vw, 0.75rem)",
                margin: "clamp(0.375rem, 0.6vw, 0.6rem)",
                padding: "clamp(0.25rem, 0.4vw, 0.375rem) clamp(0.5rem, 0.8vw, 0.75rem)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
                <span style={{ fontFamily: "var(--_font-family---font-family)", fontSize: "clamp(9px, 0.6vw, 11px)", fontWeight: 400, color: "white", opacity: 0.4, lineHeight: 1 }}>Dashboard</span>
                <span style={{ fontSize: "clamp(9px, 0.6vw, 11px)", color: "white", opacity: 0.18, lineHeight: 1 }}>/</span>
                <span style={{ fontFamily: "var(--_font-family---font-family)", fontSize: "clamp(9px, 0.6vw, 11px)", fontWeight: 500, color: "white", opacity: 0.75, lineHeight: 1 }}>4MLA Project</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button disabled className="flex items-center gap-1 rounded-md border border-white/[0.06] px-2 py-1 text-white/25" style={{ fontFamily: "var(--_font-family---font-family)", fontSize: "clamp(8px, 0.55vw, 10px)", fontWeight: 500, cursor: "not-allowed" }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  Add Angle
                </button>
                <button disabled className="flex items-center gap-1 rounded-md border border-white/[0.06] px-2 py-1 text-white/25" style={{ fontFamily: "var(--_font-family---font-family)", fontSize: "clamp(8px, 0.55vw, 10px)", fontWeight: 500, cursor: "not-allowed" }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Export All
                </button>
              </div>
            </div>

            {/* Gallery — fills remaining height */}
            <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 p-1.5 pt-0">
              <div className="grid min-h-0 grid-cols-5 gap-1.5">
                {ROW1.map((i) => <Card key={i.alt} src={i.src} alt={i.alt} pos="50% 10%" />)}
              </div>
              <div className="grid min-h-0 grid-cols-5 gap-1.5">
                {ROW2.map((i) => <Card key={i.alt} src={i.src} alt={i.alt} pos="50% 18%" />)}
                <div />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MOBILE & TABLET ═══════════════ */}
      <section className="lg:hidden w-full bg-bg px-4 py-8">
        <div className="bg-surface rounded-3xl p-5 shadow-xl dark:shadow-black/30 transition-colors duration-300">
          {/* ── Card Header ── */}
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-block h-1 w-1 rounded-full bg-text/70" />
            <span
              className="text-sm font-medium text-text"
              style={{ fontFamily: "var(--_font-family---font-family)", letterSpacing: "0.02em" }}
            >
              AI Fashion Photoshoot
            </span>
          </div>

          {/* ── Image Grid — dark container ── */}
          <div className="rounded-2xl bg-[#0A0A0A] p-2.5 space-y-2">
            {/* Top row — 3 portraits, center slightly taller */}
            <div className="flex items-end gap-2">
              {MOBILE_ROW1.map((img, i) => (
                <div key={img.alt} className="flex-1 min-w-0">
                  <div
                    className="w-full rounded-xl overflow-hidden"
                    style={{ aspectRatio: i === 1 ? "3/4.5" : "3/4" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Bottom row — 3 squares */}
            <div className="grid grid-cols-3 gap-2">
              {MOBILE_ROW2.map((img) => (
                <div key={img.alt} className="aspect-square rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Content inside card ── */}
          <div className="mt-6">
            <LetterReveal
              as="h3"
              className="text-xl font-bold leading-tight text-text"
              lines={["Studio-quality,", "without the studio."]}
            />
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Generate photorealistic fashion imagery with AI — no camera, no crew, no studio needed. Just your vision, brought to life.
            </p>
            <button className="cta-btn relative mt-5 flex items-center gap-2 overflow-hidden rounded-full bg-[#111] dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-[#111]">
              <span className="cta-btn-sweep rounded-full" />
              <span className="cta-btn-label flex items-center gap-2">
                Try AI Shoot
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
