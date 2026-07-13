"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import img1 from "@/images/WhatsApp Image 2026-07-13 at 12.07.29 PM.jpeg";
import img2 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM.jpeg";
import img3 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM (1).jpeg";
import img4 from "@/images/WhatsApp Image 2026-07-13 at 12.07.30 PM (2).jpeg";
import img5 from "@/images/WhatsApp Image 2026-07-13 at 12.07.31 PM.jpeg";

const IMAGES = [img1.src, img2.src, img3.src, img4.src, img5.src];

const CYCLE_MS = 200;
const SHOW_MS = 2000;
const FADE_MS = 500;

export function Preloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    intervalRef.current = setInterval(() => {
      setImgIdx((p) => (p + 1) % IMAGES.length);
    }, CYCLE_MS);

    const timer = setTimeout(() => {
      setLoading(false);
    }, SHOW_MS);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleExit = () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    setReady(true);
  };

  return (
    <>
      <AnimatePresence onExitComplete={handleExit}>
        {loading && (
          <motion.div
            key="preloader-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2147483647,
              background: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "clamp(24px, 4vw, 48px)",
            }}
          >
            <div style={{ position: "relative", zIndex: 1 }}>
              <span
                style={{
                  fontFamily:
                    'var(--font-display, "Neue Montreal", system-ui, sans-serif)',
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "#111111",
                  lineHeight: 1,
                }}
              >
                Synced
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "clamp(200px, 30vw, 300px)",
                height: "clamp(260px, 40vh, 360px)",
                borderRadius: "18px",
                overflow: "hidden",
                background: "#f5f5f5",
              }}
            >
              {IMAGES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: i === imgIdx ? 1 : 0,
                    transition: "opacity 0.18s ease",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Logo className="w-8 h-8" />
                <span
                  style={{
                    fontFamily:
                      'var(--font-display, "Neue Montreal", system-ui, sans-serif)',
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "#111111",
                  }}
                >
                  NovaDrive
                </span>
              </div>

              <div className="preloader-spinner" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {ready && children}
    </>
  );
}
