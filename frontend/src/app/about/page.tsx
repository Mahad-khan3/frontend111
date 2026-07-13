"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const badges = ["MFi Certified", "USB 3.0", "AES-256", "CE / FCC", "RoHS", "1-Year Warranty"];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ab-anim", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-32 px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-4">About <span className="text-lime">NovaDrive</span></h1>
        <p className="text-text-secondary mb-20 max-w-2xl">We believe your data should move as fast as you do.</p>
        <div ref={ref} className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="ab-anim"><h2 className="text-3xl font-display font-bold mb-4">Our Story</h2><p className="text-text-secondary leading-relaxed text-lg">NovaDrive was born from a simple frustration: carrying both a charging cable and a flash drive everywhere. After months of engineering, we created the world&apos;s most elegant 2-in-1 cable flash drive.</p></div>
            <div className="ab-anim"><h2 className="text-3xl font-display font-bold mb-4">Quality & Testing</h2><p className="text-text-secondary leading-relaxed text-lg">Every NovaDrive undergoes rigorous testing — 10,000+ bend cycles, drop tests from 6 feet, and full-speed validation across all supported devices.</p></div>
          </div>
          <div className="space-y-8">
            <div className="ab-anim"><h2 className="text-3xl font-display font-bold mb-4">Certifications</h2><div className="flex flex-wrap gap-4">{badges.map((b) => <span key={b} className="px-6 py-3 bg-surface rounded-xl border border-border text-base text-text-secondary">{b}</span>)}</div></div>
            <div className="ab-anim bg-surface rounded-3xl border border-border p-10"><h2 className="text-3xl font-display font-bold mb-4">Our Mission</h2><p className="text-text-secondary leading-relaxed text-lg">To eliminate the trade-off between convenience and capability. NovaDrive exists so you never have to choose between charging your phone and backing up your memories.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
