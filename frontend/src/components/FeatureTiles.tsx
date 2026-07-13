"use client";

import { AnimatedHeading } from "./AnimatedHeading";

const features = [
  { icon: "♪", title: "Music Backup", desc: "Auto-sync your entire library in seconds", color: "#a3e635" },
  { icon: "▶", title: "Video Transfer", desc: "Free up space by moving videos off-device", color: "#6366f1" },
  { icon: "◉", title: "Photo Storage", desc: "Shoot in 4K without worrying about space", color: "#a3e635" },
  { icon: "◎", title: "Contacts Sync", desc: "Never lose a contact again", color: "#6366f1" },
  { icon: "⬩", title: "Password Vault", desc: "Secure folder with military-grade encryption", color: "#a3e635" },
];

export function FeatureTiles() {
  return (
    <section className="py-32 px-8 xl:px-12 bg-surface-alt/50">
      <div className="w-full max-w-7xl mx-auto">
        <AnimatedHeading as="h2" className="text-5xl md:text-7xl font-display font-bold mb-6">What it can <span className="text-lime">do</span></AnimatedHeading>
        <p className="text-text-secondary mb-20 max-w-lg text-base">Five powerful features built into one tiny drive.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-surface rounded-xl p-8 border border-border hover:border-lime/30 transition-all duration-500 group">
              <span className="text-3xl w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: f.color + "20", color: f.color }}>{f.icon}</span>
              <h3 className="text-xl font-display font-bold mb-3">{f.title}</h3>
              <p className="text-base text-text-secondary">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
