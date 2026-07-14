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

const VIDEOS = [
  "https://cdn.pixabay.com/video/2021/06/11/77316-561991002_large.mp4",
  "https://cdn.pixabay.com/video/2021/05/28/75550-556034413_large.mp4",
  "https://cdn.pixabay.com/video/2022/11/28/140828-776043783_large.mp4",
];

const LEFT_SECTION = {
  label: "AI Product Shots",
  heading: ["Your product, new", "scenes on demand."],
  desc: "Drop a product photo and we build clean packshots and styled lifestyle scenes around it.",
};

const RIGHT_SECTION = {
  label: "AI Video Production",
  heading: ["Campaign-ready", "video in minutes."],
  desc: "Create on-brand clips for Reels, TikTok and ads without a shoot.",
};

function SlideshowImage({
  images,
  interval = 3500,
  delay = 0,
  className = "",
  style = {},
}: {
  images: string[];
  interval?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), interval);
    const timeout = setTimeout(() => setIdx(1), delay);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, [images.length, interval, delay]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
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

function GoalButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="#next"
      className={`showcase-goal-btn flex items-center justify-center rounded-full transition-all duration-300 ease-out ${className}`}
      style={{
        width: "clamp(2.5rem, 3.2vw, 3.25rem)",
        height: "clamp(2.5rem, 3.2vw, 3.25rem)",
        backgroundColor: "var(--color-surface)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
        color: "var(--color-text)",
        flexShrink: 0,
      }}
      aria-label="Next"
    >
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="10" cy="10" r="1.5" />
        <circle cx="4" cy="4" r="1.5" />
        <circle cx="16" cy="4" r="1.5" />
        <circle cx="4" cy="16" r="1.5" />
        <circle cx="16" cy="16" r="1.5" />
      </svg>
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
    <div className={`relative overflow-hidden ${className}`} style={style}>
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

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-block h-1 w-1 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
      <span
        className="text-[11px] md:text-[clamp(10px,0.75vw,13px)]"
        style={{
          fontFamily: "var(--_font-family---font-family)",
          fontWeight: 500,
          color: "var(--color-accent)",
          lineHeight: 1,
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function HeadingBlock({
  heading,
  desc,
}: {
  heading: string[];
  desc: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 md:flex-col md:items-start">
      <div className="min-w-0 flex-1">
        <AnimatedHeading
          as="h3"
          style={{
            fontFamily: "var(--_font-family---font-family)",
            fontWeight: 600,
            color: "var(--color-text)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
            fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)",
          }}
        >
          {heading[0]}
          <br />
          {heading[1]}
        </AnimatedHeading>
        <p
          className="mt-2 text-sm md:mt-3"
          style={{
            fontFamily: "var(--_font-family---font-family)",
            fontWeight: 500,
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
          }}
        >
          {desc}
        </p>
      </div>
      <div className="mt-1 flex-shrink-0 md:mt-4">
        <GoalButton />
      </div>
    </div>
  );
}

export function ShowcaseSection() {
  return (
    <section
      className="w-full px-2 pb-2 transition-colors duration-400"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="flex w-full flex-col gap-[clamp(0.5rem,1vw,1rem)] md:flex-row md:gap-[clamp(0.5rem,1vw,1rem)]">
        {/* ═══ LEFT — Product Shots ═══ */}
        <div
          className="flex flex-1 flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            borderRadius: "clamp(1rem, 2.5vw, 2.5rem)",
            minHeight: "100svh",
          }}
        >
          <div style={{ padding: "clamp(0.75rem, 1.5vw, 1.5rem)", paddingBottom: 0, flexShrink: 0 }}>
            <Eyebrow label={LEFT_SECTION.label} />
          </div>

          {/* Image grid — fills the first screen, heading/text scrolls in below */}
          <div
            className="grid w-full"
            style={{
              gridTemplateColumns: "minmax(56px, 24%) 1fr minmax(56px, 24%)",
              gridTemplateRows: "1fr auto",
              gap: "clamp(0.3rem, 0.6vw, 0.6rem)",
              flex: "1 1 auto",
              marginTop: "clamp(0.6rem, 1.2vw, 1.2rem)",
            }}
          >
            {/* far left — flush to outer edge, radius only on inner (right) side */}
            <div
              className="self-center"
              style={{ gridColumn: "1", gridRow: "1 / 3", height: "72%" }}
            >
              <SlideshowImage
                images={[IMGS[0], IMGS[1]]}
                delay={0}
                className="h-full w-full"
                style={{ borderRadius: "0 0.7rem 0.7rem 0" }}
              />
            </div>

            {/* center top — slightly narrower, landscape */}
            <div
              style={{
                gridColumn: "2",
                gridRow: "1",
                minHeight: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "clamp(0.3rem, 0.6vw, 0.6rem)",
                paddingRight: "clamp(0.3rem, 0.6vw, 0.6rem)",
              }}
            >
              <SlideshowImage
                images={[IMGS[2], IMGS[3]]}
                delay={2500}
                style={{
                  borderRadius: "0.7rem",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  height: "auto",
                }}
              />
            </div>

            {/* center bottom — 2 images aligned to center image edges */}
            <div
              className="flex justify-center"
              style={{
                gridColumn: "2",
                gridRow: "2",
                gap: "clamp(0.3rem, 0.6vw, 0.6rem)",
                height: "clamp(4.5rem, 11vh, 7rem)",
                paddingLeft: "clamp(0.3rem, 0.6vw, 0.6rem)",
                paddingRight: "clamp(0.3rem, 0.6vw, 0.6rem)",
              }}
            >
              <SlideshowImage
                images={[IMGS[4], IMGS[0]]}
                delay={5000}
                className="h-full flex-1"
                style={{ borderRadius: "0.6rem" }}
              />
              <SlideshowImage
                images={[IMGS[1], IMGS[4]]}
                delay={7500}
                className="h-full flex-1"
                style={{ borderRadius: "0.6rem" }}
              />
            </div>

            {/* far right — flush to outer edge, radius only on inner (left) side */}
            <div
              className="self-center"
              style={{ gridColumn: "3", gridRow: "1 / 3", height: "72%" }}
            >
              <SlideshowImage
                images={[IMGS[3], IMGS[2]]}
                delay={10000}
                className="h-full w-full"
                style={{ borderRadius: "0.7rem 0 0 0.7rem" }}
              />
            </div>
          </div>

          <div
            style={{
              padding: "clamp(0.75rem, 1.5vw, 1.5rem)",
              paddingTop: "clamp(0.6rem, 1.2vw, 1.2rem)",
            }}
          >
            <HeadingBlock heading={LEFT_SECTION.heading} desc={LEFT_SECTION.desc} />
          </div>
        </div>

        {/* ═══ RIGHT — Video Production ═══ */}
        <div
          className="flex flex-1 flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--color-surface-alt)",
            borderRadius: "clamp(1rem, 2.5vw, 2.5rem)",
            minHeight: "100svh",
          }}
        >
          <div style={{ padding: "clamp(0.75rem, 1.5vw, 1.5rem)", paddingBottom: 0, flexShrink: 0 }}>
            <Eyebrow label={RIGHT_SECTION.label} />
          </div>

          {/* 3 portrait videos — fills the first screen, flush to edges, center taller, bottom-aligned */}
          <div
            className="flex w-full items-end"
            style={{
              gap: "clamp(0.3rem, 0.6vw, 0.6rem)",
              flex: "1 1 auto",
              marginTop: "clamp(0.6rem, 1.2vw, 1.2rem)",
            }}
          >
            <VideoCard
              src={VIDEOS[0]}
              poster={IMGS[0]}
              className="flex-1"
              style={{ height: "75%", borderRadius: "0 0.7rem 0.7rem 0" }}
            />
            <VideoCard
              src={VIDEOS[1]}
              poster={IMGS[1]}
              style={{ flex: "1.05", height: "85%", borderRadius: 0 }}
            />
            <VideoCard
              src={VIDEOS[2]}
              poster={IMGS[2]}
              className="flex-1"
              style={{ height: "75%", borderRadius: "0.7rem 0 0 0.7rem" }}
            />
          </div>

          <div
            style={{
              padding: "clamp(0.75rem, 1.5vw, 1.5rem)",
              paddingTop: "clamp(0.6rem, 1.2vw, 1.2rem)",
            }}
          >
            <HeadingBlock heading={RIGHT_SECTION.heading} desc={RIGHT_SECTION.desc} />
          </div>
        </div>
      </div>

      <style>{`
        .showcase-goal-btn:hover {
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
