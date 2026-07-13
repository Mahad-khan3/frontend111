"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const SIZE = 34;
const STROKE = 2.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 120, damping: 24, mass: 0.5 });
  const dashOffset = useTransform(spring, (v) => CIRCUMFERENCE * (1 - v / 100));
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    spring.set(progress);
  }, [progress, spring]);

  return (
    <div
      className="relative flex items-center justify-center rounded-full bg-white text-black"
      style={{ width: SIZE, height: SIZE }}
      aria-label={`Scroll progress: ${display}%`}
      role="progressbar"
      aria-valuenow={display}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={SIZE} height={SIZE} className="absolute inset-0 -rotate-90">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth={STROKE}
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset: dashOffset }}
        />
      </svg>
      <span className="text-[9px] font-semibold font-mono tabular-nums leading-none">
        {display}%
      </span>
    </div>
  );
}
