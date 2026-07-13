"use client";

import { AnimatedHeading } from "./AnimatedHeading";

const reviews = [
  { name: "Alex K.", rating: 5, text: "Game changer for my iPhone storage. I was constantly running out of space for 4K videos. Now I just plug NovaDrive in and transfer in seconds." },
  { name: "Sarah M.", rating: 5, text: "The fact that it doubles as a charging cable is genius. One less thing to carry in my bag. Transfer speeds are incredible." },
  { name: "James T.", rating: 5, text: "Bought the 256GB for my iPad Pro. Works flawlessly. The companion app is clean and intuitive. Highly recommend." },
  { name: "Maria L.", rating: 4, text: "Perfect for backing up photos when traveling. No need for a laptop or cloud uploads. Just plug and go." },
];

export function Testimonials() {
  return (
    <section className="py-32 px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <AnimatedHeading as="h2" className="text-5xl md:text-7xl font-display font-bold mb-16">Loved by <span className="text-lime">thousands</span></AnimatedHeading>
        <div className="grid md:grid-cols-4 gap-8">
          {reviews.map((r) => (
            <div key={r.name} className="p-8 bg-surface rounded-xl border border-border">
              <p className="text-base text-lime mb-4">{'★'.repeat(r.rating)}</p>
              <p className="text-lg text-text-secondary leading-relaxed mb-6">{r.text}</p>
              <p className="text-xl font-medium">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
