"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const COLS = 46;
const ROWS = 13;

export function Footer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let cellW = 0;
    let cellH = 0;
    const bases: number[] = [];
    let baseMin = 210;
    let baseMax = 240;
    let target = 10; // activated color value

    const build = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cellW = w / COLS;
      cellH = h / ROWS;

      const isDark =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("dark");
      baseMin = isDark ? 30 : 210;
      baseMax = isDark ? 60 : 240;
      target = isDark ? 245 : 10; // dark: pulse to white, light: pulse to black

      bases.length = 0;
      for (let i = 0; i < COLS * ROWS; i++) {
        bases.push(baseMin + Math.random() * (baseMax - baseMin));
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      const cx = (COLS - 1) / 2;
      const cy = (ROWS - 1) / 2;
      const radius = Math.min(cellW, cellH) * 0.22;
      const toWhite = target > baseMin; // dark mode direction

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          const dx = c - cx;
          const dy = r - cy;
          const dist = Math.abs(dx) + Math.abs(dy); // diamond distance from center
          let activation = (Math.sin(dist * 0.6 - time * 2.5) + 1) / 2;
          activation *= Math.max(0, 1 - dist / 14);
          activation = Math.min(1, Math.max(0, activation));

          const base = bases[i];
          const v = Math.round(
            toWhite
              ? base + (target - base) * activation
              : base - (base - target) * activation
          );
          ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;

          const x = c * cellW + cellW / 2;
          const y = r * cellH + cellH / 2;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    build();
    raf = requestAnimationFrame(draw);

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    // rebuild dots when dark mode toggles
    const observer = new MutationObserver(() => build());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <footer
      className="footer-root"
      style={{
        backgroundColor: "var(--fb-bg)",
        color: "var(--fb-text)",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "56px clamp(1.25rem, 4vw, 4rem) 0",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {/* top row — logo + link columns */}
        <div className="footer-top flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* logo (same as navbar) */}
          <Link
            href="/"
            className="flex items-center gap-2"
            style={{ fontFamily: '"SF Pro Display", Arial, sans-serif' }}
          >
            <Logo className="w-8 h-8" />
            <span style={{ fontWeight: 700, fontSize: "30px", lineHeight: 1 }}>
              <span style={{ color: "#e8572a" }}>Nova</span>
              <span style={{ color: "var(--fb-text)" }}>Drive</span>
            </span>
          </Link>

          {/* link columns */}
          <div className="flex gap-12 md:gap-24">
            <div className="flex flex-col gap-3">
              <Link
                href="#"
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--fb-text)",
                  fontFamily: '"SF Pro Display", Arial, sans-serif',
                  transition: "color 0.4s ease",
                }}
              >
                PDP&apos;s
              </Link>
              <Link
                href="#"
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--fb-text)",
                  fontFamily: '"SF Pro Display", Arial, sans-serif',
                  transition: "color 0.4s ease",
                }}
              >
                Videos
              </Link>
              <div style={{ height: "12px" }} />
              <Link
                href="#"
                style={{
                  fontWeight: 400,
                  fontSize: "15px",
                  color: "var(--fb-muted)",
                  fontFamily: '"SF Pro Display", Arial, sans-serif',
                  transition: "color 0.4s ease",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                style={{
                  fontWeight: 400,
                  fontSize: "15px",
                  color: "var(--fb-muted)",
                  fontFamily: '"SF Pro Display", Arial, sans-serif',
                  transition: "color 0.4s ease",
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                style={{
                  fontWeight: 400,
                  fontSize: "15px",
                  color: "var(--fb-muted)",
                  fontFamily: '"SF Pro Display", Arial, sans-serif',
                  transition: "color 0.4s ease",
                }}
              >
                Cookie Policy
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="#"
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--fb-text)",
                  fontFamily: '"SF Pro Display", Arial, sans-serif',
                  transition: "color 0.4s ease",
                }}
              >
                Products
              </Link>
              <Link
                href="#"
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "var(--fb-text)",
                  fontFamily: '"SF Pro Display", Arial, sans-serif',
                  transition: "color 0.4s ease",
                }}
              >
                Our features
              </Link>
              <div style={{ height: "12px" }} />
              <Link
                href="#"
                style={{
                  fontWeight: 400,
                  fontSize: "15px",
                  color: "var(--fb-muted)",
                  fontFamily: '"SF Pro Display", Arial, sans-serif',
                  transition: "color 0.4s ease",
                }}
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>

        {/* bottom row — copyright + registration */}
        <div
          className="footer-bottom flex flex-col gap-2 py-10 md:flex-row md:items-center md:justify-between"
          style={{ fontFamily: '"SF Pro Display", Arial, sans-serif' }}
        >
          <p style={{ margin: 0, fontSize: "13px", color: "var(--fb-dim)" }}>
            &copy; 2026, NOVA DRIVE. Developed by Connexus
          </p>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--fb-rust)" }}>
            Registered in England &amp; Wales No.: 13044361
          </p>
        </div>
      </div>

      {/* animated dot grid */}
      <div
        ref={containerRef}
        style={{ width: "100%", height: "clamp(150px, 18vw, 240px)" }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      </div>

      <style>{`
        .footer-root {
          --fb-bg: #f5f5f4;
          --fb-text: #0a0a0a;
          --fb-muted: #9a9a97;
          --fb-dim: #555553;
          --fb-rust: #b4541f;
        }
        .dark .footer-root {
          --fb-bg: #0a0a0a;
          --fb-text: #f5f5f5;
          --fb-muted: #9a9a97;
          --fb-dim: #a3a3a0;
          --fb-rust: #d98a5b;
        }
      `}</style>
    </footer>
  );
}
