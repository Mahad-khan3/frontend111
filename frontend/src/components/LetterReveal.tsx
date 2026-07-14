"use client";

import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  createElement,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";

type Line = string | { text: string; className?: string; style?: CSSProperties };

let _introPlayed = false;

function shouldPlay(): boolean {
  if (typeof window === "undefined") return false;
  if (_introPlayed) return false;
  try {
    if (sessionStorage.getItem("introPlayed")) return false;
  } catch {
    /* ignore */
  }
  return true;
}

function markPlayed() {
  _introPlayed = true;
  try {
    sessionStorage.setItem("introPlayed", "1");
  } catch {
    /* ignore */
  }
}

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LetterReveal({
  lines,
  as: Tag = "h2",
  className = "",
  style,
  charDelay = 60,
  duration = 600,
}: {
  lines: Line[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  charDelay?: number;
  duration?: number;
}) {
  const containerRef = useRef<HTMLElement | null>(null);

  useIsoLayoutEffect(() => {
    if (!shouldPlay()) return;
    const el = containerRef.current;
    if (!el) return;
    const spans = Array.from(
      el.querySelectorAll<HTMLSpanElement>("[data-lr-char]")
    );
    if (!spans.length) return;

    // Capture each letter's natural (design-intended) color before we override it.
    const naturalColors = spans.map((s) => getComputedStyle(s).color);

    markPlayed();

    const tl = gsap.timeline();
    gsap.set(spans, { opacity: 0, y: "0.35em", color: "#e8572a" });
    tl.to(spans, {
      opacity: 1,
      y: 0,
      duration: duration / 1000,
      ease: "power2.out",
      stagger: charDelay / 1000,
    });
    tl.to(
      spans,
      {
        color: (i: number) => naturalColors[i],
        duration: 0.4,
        ease: "power1.out",
      },
      ">-0.1"
    );
    tl.set(spans, { clearProps: "all" });

    return () => {
      tl.kill();
    };
  }, [charDelay, duration]);

  let globalIndex = 0;

  const content: ReactNode = lines.map((line, li) => {
    const text = typeof line === "string" ? line : line.text;
    const lineClassName = typeof line === "string" ? undefined : line.className;
    const lineStyle = typeof line === "string" ? undefined : line.style;

    return (
      <span
        key={li}
        className={lineClassName}
        style={{ display: "block", ...lineStyle }}
      >
        {text.split(" ").map((word, wi, arr) => (
          <Fragment key={wi}>
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {Array.from(word).map((ch, ci) => {
                const idx = globalIndex++;
                return (
                  <span
                    key={ci}
                    data-lr-char
                    style={{ display: "inline-block" }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
            {wi < arr.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    );
  });

  return createElement(Tag, { ref: containerRef, className, style }, content);
}
