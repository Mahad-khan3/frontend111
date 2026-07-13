"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Plug into device", desc: "Connect NovaDrive to your iPhone, iPad, or Android device.", details: ["MFi certified Lightning", "USB-C for Android", "Simultaneous charging"], color: "#C6FF3A" },
  { num: "02", title: "Open the app", desc: "The NovaDrive companion app launches automatically.", details: ["Auto-launch on connect", "One-time setup wizard", "Intuitive dashboard"], color: "#6E6BFF" },
  { num: "03", title: "Select & transfer", desc: "Choose what to back up — photos, videos, music, or everything.", details: ["Multi-file select", "Background transfer", "Progress tracking"], color: "#C6FF3A" },
  { num: "04", title: "Free up space", desc: "Delete files from your device and reclaim gigabytes instantly.", details: ["Smart cleanup", "Confirm before deleting", "Restore anytime"], color: "#6E6BFF" },
];

export default function HowItWorksPage() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".step-panel").forEach((panel, i) => {
        ScrollTrigger.create({ trigger: panel, start: "top 60%", end: "bottom 40%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
<div className="min-h-screen pt-32 pb-32 px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">How it <span className="text-lime">works</span></h1>
        <p className="text-text-secondary mb-20 max-w-2xl">Three clicks. That's all it takes to back up your entire device.</p>
        <div className="sticky top-32 z-10 mb-12 bg-white/90 backdrop-blur-md rounded-full p-2 border border-border max-w-md">
          <div className="flex">{steps.map((s, i) => (
            <button key={s.num} onClick={() => setActive(i)} className={`relative z-10 flex-1 py-2 text-xs font-mono transition-colors rounded-full ${active === i ? "bg-lime text-white font-bold" : "text-text-secondary"}`}>Step {s.num}</button>
          ))}</div>
        </div>
        <div ref={ref} className="space-y-24">
          {steps.map((step, i) => (
            <div key={step.num} className={`step-panel grid md:grid-cols-2 gap-12 items-center`}>
              <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                <span className="text-7xl font-mono font-bold block mb-4" style={{ color: step.color + "20" }}>{step.num}</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{step.title}</h2>
                <p className="text-text-secondary mb-6">{step.desc}</p>
                <ul className="space-y-2">{step.details.map((d) => <li key={d} className="flex items-center gap-2 text-sm text-text-secondary"><span style={{ color: step.color }}>→</span>{d}</li>)}</ul>
              </div>
              <div className="h-[300px] md:h-[400px] rounded-2xl flex items-center justify-center border border-border" style={{ background: `radial-gradient(ellipse at center, ${step.color}08, transparent)` }}>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: step.color + "15" }}>
                    <span className="text-4xl font-mono font-bold" style={{ color: step.color }}>{step.num}</span>
                  </div>
                  <p className="text-sm text-text-secondary">Interactive demo</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
