"use client";

import Link from "next/link";
import { AnimatedHeading } from "./AnimatedHeading";
import img1 from "@/images/6.jpg";
import img2 from "@/images/9.jpg";
import img3 from "@/images/10.jpg";
import img4 from "@/images/11.jpg";
import img5 from "@/images/12.jpg";
import img6 from "@/images/13.jpg";
import img7 from "@/images/14.jpg";
import img8 from "@/images/7.jpg";
import img9 from "@/images/5.jpg";
import img10 from "@/images/3.jpg";
import img11 from "@/images/1.jpg";

const IMGS = [img1.src, img2.src, img3.src, img4.src, img5.src, img6.src, img7.src];

const VIDEOS = [
  "https://cdn.pixabay.com/video/2021/06/11/77316-561991002_large.mp4",
  "https://cdn.pixabay.com/video/2021/05/28/75550-556034413_large.mp4",
  "https://cdn.pixabay.com/video/2022/11/28/140828-776043783_large.mp4",
];

const LEFT_GRID_CONFIG = {
  columns: "0.6fr 0.65fr 0.6fr",
  rows: "0.5fr 0.5fr",
  leftImg:  { aspectRatio: "1/1", borderRadius: "0 0.75rem 0.75rem 0" },
  centerTop: { borderRadius: "0.75rem", height: "130px", margin: "50px 0px 0px 0px" },
  centerBottomLeft:  { borderRadius: "0.75rem" },
  centerBottomRight: { borderRadius: "0.75rem" },
  rightImg: { aspectRatio: "1/1", borderRadius: "0.75rem 0 0 0.75rem" },
};

const LEFT_SECTION = {
  label: "Swivel-Proof Metal Build",
  heading: ["Rotate to protect,", "click to connect."],
  desc: "360° swivel cap design keeps both connectors safe when not in use — no cap to lose.",
};

const RIGHT_SECTION = {
  label: "USB 3.0 Speed",
  heading: ["Transfer files", "up to 10x faster."],
  desc: "Move large video files and full camera rolls in a fraction of the time of USB 2.0 drives.",
};

function Eyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "var(--color-accent)" }}
      />
      <span
        className="text-[11px] md:text-[clamp(10px,0.75vw,13px)] text-black transition-colors duration-400 dark:text-white"
        style={{
          fontFamily: "var(--_font-family---font-family)",
          fontWeight: 600,
          lineHeight: 1,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function DotPillButton({ label }: { label: string }) {
  return (
    <Link
      href="#next"
      aria-label={label}
      className="dot-pill flex items-center justify-center gap-1 rounded-full"
    >
      <span className="dot-pill-dot" />
      <span className="dot-pill-dot" />
      <span className="dot-pill-dot" />
      <span className="dot-pill-dot" />
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

function HeadingBlock({
  heading,
  desc,
}: {
  heading: string[];
  desc: string;
}) {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="min-w-0">
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
      <DotPillButton label={heading.join(" ")} />
    </div>
  );
}

export function ShowcaseSection() {
  return (
      <section
        className="w-full px-2 pb-2 pt-[clamp(2rem,4vw,3.5rem)] transition-colors duration-400"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
      <div className="flex w-full flex-col gap-[clamp(1rem,1.5vw,1.5rem)] md:flex-row">
        {/* ═══ LEFT — AI Product Shots ═══ */}
        <div
          className="flex flex-1 flex-col overflow-hidden min-w-0 min-h-[60svh] md:min-h-[clamp(32rem,80svh,56rem)]"
          style={{
            backgroundColor: "var(--color-bg)",
            borderRadius: "1rem",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              padding: "clamp(0.9rem, 1.6vw, 1.6rem)",
              paddingBottom: 0,
              flexShrink: 0,
            }}
          >
            <Eyebrow label={LEFT_SECTION.label} />
          </div>

          {/* Asymmetric collage: tall full-height L/R anchors + center (top big + 2 small) */}
          <div
            className="w-full"
            style={{
              flex: "1 1 auto",
              minHeight: 0,
              display: "grid",
              gridTemplateColumns: LEFT_GRID_CONFIG.columns,
              gridTemplateRows: LEFT_GRID_CONFIG.rows,
              gap: "clamp(0.3rem, 0.6vw, 0.6rem)",
              padding: "clamp(0.7rem, 1.4vw, 1.4rem) 0",
              paddingBottom: "clamp(0.4rem, 0.8vw, 0.8rem)",
            }}
          >
            {/* far left — full-height anchor */}
            <img
              src={img3.src}
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
              style={{ gridColumn: 1, gridRow: "1 / 3", borderRadius: LEFT_GRID_CONFIG.leftImg.borderRadius, aspectRatio: LEFT_GRID_CONFIG.leftImg.aspectRatio }}
            />

            {/* center top — larger image */}
            <img
              src={img4.src}
              alt=""
              draggable={false}
              className="center-top-img h-full w-full object-cover"
              style={{ gridColumn: 2, gridRow: 1, borderRadius: LEFT_GRID_CONFIG.centerTop.borderRadius }}
            />

            {/* center bottom — two smaller images side by side */}
            <div
              style={{
                gridColumn: 2,
                gridRow: 2,
                display: "flex",
                gap: "clamp(0.3rem, 0.6vw, 0.6rem)",
                minHeight: 0,
              }}
            >
              <img
                src={img5.src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
                style={{ flex: 1, borderRadius: LEFT_GRID_CONFIG.centerBottomLeft.borderRadius }}
              />
              <img
                src={img6.src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
                style={{ flex: 1, borderRadius: LEFT_GRID_CONFIG.centerBottomRight.borderRadius }}
              />
            </div>

            {/* far right — full-height anchor */}
            <img
              src={img7.src}
              alt=""
              draggable={false}
              className="h-full w-full object-cover"
              style={{ gridColumn: 3, gridRow: "1 / 3", borderRadius: LEFT_GRID_CONFIG.rightImg.borderRadius, aspectRatio: LEFT_GRID_CONFIG.rightImg.aspectRatio }}
            />
          </div>

          <div
            style={{
              padding: "clamp(0.9rem, 1.6vw, 1.6rem)",
              paddingTop: "clamp(0.5rem, 1vw, 1rem)",
            }}
          >
            <HeadingBlock
              heading={LEFT_SECTION.heading}
              desc={LEFT_SECTION.desc}
            />
          </div>
        </div>

        {/* ═══ RIGHT — AI Video Production ═══ */}
        <div
          className="flex flex-1 flex-col overflow-hidden min-w-0 min-h-[60svh] md:min-h-[clamp(32rem,80svh,56rem)]"
          style={{
            backgroundColor: "var(--color-bg)",
            borderRadius: "1rem",
            border: "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              padding: "clamp(0.9rem, 1.6vw, 1.6rem)",
              paddingBottom: 0,
              flexShrink: 0,
            }}
          >
            <Eyebrow label={RIGHT_SECTION.label} />
          </div>

          {/* 3 videos — center taller, pokes out top & bottom */}
          <div
            className="flex w-full items-center justify-center"
            style={{
              flex: "1 1 auto",
              gap: "clamp(0.5rem, 1vw, 1rem)",
              padding: "clamp(1.5rem, 3vw, 3rem) 0",
            }}
          >
            <VideoCard
              src={VIDEOS[0]}
              poster={IMGS[0]}
              className="flex-1"
              style={{ aspectRatio: "3 / 4", borderRadius: "0 0.75rem 0.75rem 0" }}
            />
            <VideoCard
              src={VIDEOS[1]}
              poster={IMGS[1]}
              style={{
                flex: "1.1",
                aspectRatio: "3 / 5",
                borderRadius: "0.75rem",
              }}
            />
            <VideoCard
              src={VIDEOS[2]}
              poster={IMGS[2]}
              className="flex-1"
              style={{ aspectRatio: "3 / 4", borderRadius: "0.75rem 0 0 0.75rem" }}
            />
          </div>

          <div
            style={{
              padding: "clamp(0.9rem, 1.6vw, 1.6rem)",
              paddingTop: "clamp(0.5rem, 1vw, 1rem)",
            }}
          >
            <HeadingBlock
              heading={RIGHT_SECTION.heading}
              desc={RIGHT_SECTION.desc}
            />
          </div>
        </div>
      </div>

      <style>{`
        .dot-pill {
          width: clamp(3rem, 3.4vw, 3.5rem);
          height: clamp(3rem, 3.4vw, 3.5rem);
          background: color-mix(in srgb, var(--color-text) 8%, transparent);
          border: 1px solid color-mix(in srgb, var(--color-text) 16%, transparent);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .dot-pill:hover {
          background: #FF7A1A !important;
          border-color: #FF7A1A !important;
          box-shadow: 0 4px 24px rgba(255,122,26,0.35),
                      0 0 0 4px rgba(255,122,26,0.1) !important;
          transform: scale(1.05);
        }
        .dot-pill:hover .dot-pill-dot { background: #ffffff !important; }
        .dot-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: var(--color-text);
          animation: dot-wave 1.4s infinite ease-in-out;
        }
        .dot-pill-dot:nth-child(2) { animation-delay: 0.2s; }
        .dot-pill-dot:nth-child(3) { animation-delay: 0.4s; }
        .dot-pill-dot:nth-child(4) { animation-delay: 0.6s; }
        @keyframes dot-wave {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .center-top-img {
          grid-area: 1 / 2;
          border-radius: 0.75rem;
          height: ${LEFT_GRID_CONFIG.centerTop.height} !important;
          margin: ${LEFT_GRID_CONFIG.centerTop.margin} !important;
        }
        @media (max-width: 768px) {
          .center-top-img {
            height: ${LEFT_GRID_CONFIG.centerTop.height} !important;
            margin: ${LEFT_GRID_CONFIG.centerTop.margin} !important;
          }
        }   
      `}</style>
    </section>
  );
}
