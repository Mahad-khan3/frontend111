"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedHeading } from "./AnimatedHeading";
import img1 from "@/images/WhatsApp Image 2026-07-13 at 12.07.29 PM.jpeg";
import img2 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM.jpeg";
import img3 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM (1).jpeg";
import img4 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM (2).jpeg";
import img5 from "@/images/WhatsApp Image 2026-07-13 at 12.07.31 PM.jpeg";

const IMGS = [img1.src, img2.src, img3.src, img4.src, img5.src];

function CrossfadeCard({
  images,
  delay = 0,
  className = "",
  style = {},
}: {
  images: string[];
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 3500);
    const timeout = setTimeout(() => setIdx(1), delay);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, [images.length, delay]);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg ${className}`}
      style={style}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: i === idx ? 1 : 0 }}
          draggable={false}
        />
      ))}
    </div>
  );
}

function FabButton({ className = "" }: { className?: string }) {
  return (
    <Link href="#next" className={`showcase-fab ${className}`} aria-label="Next section">
      <div
        className="showcase-fab-btn flex items-center justify-center rounded-full transition-all duration-300 ease-out"
        style={{
          width: "clamp(2.5rem, 3.2vw, 3.25rem)",
          height: "clamp(2.5rem, 3.2vw, 3.25rem)",
          backgroundColor: "var(--color-surface)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
          color: "var(--color-text)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
          <circle cx="3" cy="3" r="1.5" />
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="13" cy="3" r="1.5" />
          <circle cx="3" cy="8" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="13" cy="8" r="1.5" />
          <circle cx="3" cy="13" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
          <circle cx="13" cy="13" r="1.5" />
        </svg>
      </div>
    </Link>
  );
}

function VideoCard({
  src,
  poster,
  className = "",
  style = {},
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg ${className}`}
      style={style}
    >
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

const SECTIONS = [
  {
    label: "AI Fashion Photoshoot",
    heading: ["Studio-quality,", "without the studio."],
    desc: "Upload one product and get all the angles, looks and moods you need for PDPs and campaigns—without booking a studio.",
  },
  {
    label: "AI Product Shots",
    heading: ["Your product,", "new scenes on demand."],
    desc: "Drop a product photo and we build clean packshots and styled lifestyle scenes around it.",
  },
  {
    label: "AI Video Production",
    heading: ["Campaign-ready", "video in minutes."],
    desc: "Create on-brand clips for Reels, TikTok and ads without a shoot.",
  },
];

const VIDEOS = [
  { src: "https://cdn.pixabay.com/video/2021/06/11/77316-561991002_large.mp4", poster: IMGS[0] },
  { src: "https://cdn.pixabay.com/video/2021/05/28/75550-556034413_large.mp4", poster: IMGS[1] },
  { src: "https://cdn.pixabay.com/video/2022/11/28/140828-776043783_large.mp4", poster: IMGS[2] },
];

export function PremiumShowcase() {
  return (
    <section className="w-full bg-surface px-2 pb-2 transition-colors duration-400">
      <div className="flex w-full flex-col gap-[clamp(1rem,2vw,2rem)] md:flex-row">
        {/* ═══ LEFT — AI Fashion Photoshoot (5 images) ═══ */}
        <div className="premium-card bg-surface-alt flex flex-1 flex-col overflow-hidden transition-colors duration-400">
          <div className="premium-card-pad mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-1 w-1 rounded-full bg-current opacity-70" />
              <span
                className="text-[11px] md:text-[clamp(10px,0.75vw,13px)]"
                style={{
                  fontFamily: "var(--_font-family---font-family)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                AI Fashion Photoshoot
              </span>
            </div>
            <div className="md:hidden">
              <FabButton />
            </div>
          </div>

          <div className="premium-gallery flex min-h-0 gap-1.5 md:gap-2">
            <CrossfadeCard
              images={[IMGS[0], IMGS[1]]}
              delay={0}
              className="premium-portrait premium-edge-left h-full flex-shrink-0"
            />
            <div className="flex flex-1 flex-col gap-1.5 md:gap-2">
              <CrossfadeCard
                images={[IMGS[2], IMGS[3]]}
                delay={2500}
                className="w-full flex-[1.1]"
              />
              <div className="flex flex-1 gap-1.5 md:gap-2">
                <CrossfadeCard
                  images={[IMGS[4], IMGS[0]]}
                  delay={5000}
                  className="flex-1"
                />
                <CrossfadeCard
                  images={[IMGS[1], IMGS[4]]}
                  delay={7500}
                  className="flex-1"
                />
              </div>
            </div>
            <CrossfadeCard
              images={[IMGS[3], IMGS[2]]}
              delay={10000}
              className="premium-portrait premium-edge-right h-full flex-shrink-0"
            />
          </div>

          <div className="premium-card-pad premium-content-text mt-4 md:mt-5">
            <AnimatedHeading
              as="h3"
              style={{
                fontFamily: "var(--_font-family---font-family)",
                fontWeight: 600,
                color: "var(--color-text)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              Studio-quality,
              <br />
              without the studio.
            </AnimatedHeading>
            <p
              style={{
                fontFamily: "var(--_font-family---font-family)",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Upload one product and get all the angles, looks and moods you need for PDPs and campaigns—without booking a studio.
            </p>
          </div>

          <div className="premium-card-pad mt-4 hidden md:flex md:justify-end">
            <FabButton />
          </div>
        </div>

        {/* ═══ CENTER — AI Product Shots ═══ */}
        <div className="premium-card bg-surface-alt flex flex-1 flex-col overflow-hidden transition-colors duration-400">
          <div className="premium-card-pad mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-1 w-1 rounded-full bg-current opacity-70" />
              <span
                className="text-[11px] md:text-[clamp(10px,0.75vw,13px)]"
                style={{
                  fontFamily: "var(--_font-family---font-family)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                AI Product Shots
              </span>
            </div>
            <div className="md:hidden">
              <FabButton />
            </div>
          </div>

          <div className="premium-gallery flex min-h-0 gap-1.5 md:gap-2">
            <div className="flex flex-1 flex-col gap-1.5 md:gap-2">
              <CrossfadeCard
                images={[IMGS[3], IMGS[4]]}
                delay={0}
                className="w-full flex-[1.1]"
              />
              <CrossfadeCard
                images={[IMGS[0], IMGS[2]]}
                delay={2500}
                className="w-full flex-[1.1]"
              />
            </div>
            <CrossfadeCard
              images={[IMGS[1], IMGS[3]]}
              delay={5000}
              className="premium-portrait premium-edge-right h-full flex-shrink-0"
            />
          </div>

          <div className="premium-card-pad premium-content-text mt-4 md:mt-5">
            <AnimatedHeading
              as="h3"
              style={{
                fontFamily: "var(--_font-family---font-family)",
                fontWeight: 600,
                color: "var(--color-text)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              Your product,
              <br />
              new scenes on demand.
            </AnimatedHeading>
            <p
              style={{
                fontFamily: "var(--_font-family---font-family)",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Drop a product photo and we build clean packshots and styled lifestyle scenes around it.
            </p>
          </div>

          <div className="premium-card-pad mt-4 hidden md:flex md:justify-end">
            <FabButton />
          </div>
        </div>

        {/* ═══ RIGHT — AI Video Production (3 videos) ═══ */}
        <div className="premium-card bg-surface-alt flex flex-1 flex-col overflow-hidden transition-colors duration-400">
          <div className="premium-card-pad mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-1 w-1 rounded-full bg-current opacity-70" />
              <span
                className="text-[11px] md:text-[clamp(10px,0.75vw,13px)]"
                style={{
                  fontFamily: "var(--_font-family---font-family)",
                  fontWeight: 500,
                  color: "var(--color-text)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                AI Video Production
              </span>
            </div>
            <div className="md:hidden">
              <FabButton />
            </div>
          </div>

          <div className="premium-video-area flex min-h-0 items-end gap-1.5 md:gap-2">
            <VideoCard
              src={VIDEOS[0].src}
              poster={VIDEOS[0].poster}
              className="premium-video-left flex-1"
              style={{ height: "70%" }}
            />
            <VideoCard
              src={VIDEOS[1].src}
              poster={VIDEOS[1].poster}
              className="flex-[1.3]"
              style={{ height: "100%" }}
            />
            <VideoCard
              src={VIDEOS[2].src}
              poster={VIDEOS[2].poster}
              className="premium-video-right flex-1"
              style={{ height: "70%" }}
            />
          </div>

          <div className="premium-card-pad premium-content-text mt-4 md:mt-5">
            <AnimatedHeading
              as="h3"
              style={{
                fontFamily: "var(--_font-family---font-family)",
                fontWeight: 600,
                color: "var(--color-text)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              Campaign-ready
              <br />
              video in minutes.
            </AnimatedHeading>
            <p
              style={{
                fontFamily: "var(--_font-family---font-family)",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Create on-brand clips for Reels, TikTok and ads without a shoot.
            </p>
          </div>

          <div className="premium-card-pad mt-4 hidden md:flex md:justify-end">
            <FabButton />
          </div>
        </div>
      </div>

      <style>{`
        .showcase-fab:hover .showcase-fab-btn {
          background-color: #FF7A1A !important;
          box-shadow: 0 4px 24px rgba(255,122,26,0.35),
                      0 0 0 4px rgba(255,122,26,0.1) !important;
          transform: scale(1.05);
          color: #FFFFFF !important;
        }
      `}</style>
    </section>
  );
}
