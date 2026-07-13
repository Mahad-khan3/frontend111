"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedHeading } from "./AnimatedHeading";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { label: "256GB", desc: "Max capacity" },
  { label: "USB 3.0", desc: "Up to 130MB/s read" },
  { label: "Lightning", desc: "MFi certified" },
  { label: "90MB/s", desc: "Write speed" },
];

export function PinnedSpecs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: sectionRef.current, start: "top top", end: "+=150%", pin: pinRef.current, pinSpacing: true });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh]">
      <div ref={pinRef} className="sticky top-0 h-screen flex items-center bg-bg">
        <div className="w-full px-8 xl:px-12 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <AnimatedHeading as="h2" className="text-5xl md:text-7xl font-display font-bold">Built <span className="text-lime">different</span></AnimatedHeading>
            <p className="text-text-secondary text-xl">Premium materials. Blazing speeds. Every capacity you need.</p>
          </div>
          <div className="space-y-6">
            {specs.map((spec) => (
              <div key={spec.label} className="p-8 bg-surface rounded-xl border border-border">
                <span className="text-3xl font-display font-bold text-lime block">{spec.label}</span>
                <span className="text-lg text-text-secondary">{spec.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
