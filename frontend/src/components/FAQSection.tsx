"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatedHeading } from "./AnimatedHeading";

const faqs = [
  { q: "Is NovaDrive compatible with my device?", a: "NovaDrive comes in two variants: Lightning for iPhone/iPad and USB-C for Android devices." },
  { q: "Do I need an app to use NovaDrive?", a: "The companion app provides the best experience, but NovaDrive works as a standard flash drive out of the box." },
  { q: "What happens if I lose my NovaDrive?", a: "The Password Vault uses AES-256 encryption. Your data is protected." },
  { q: "Can I charge my phone while transferring files?", a: "Yes! NovaDrive supports simultaneous charging and data transfer." },
  { q: "How fast is the transfer speed?", a: "NovaDrive supports USB 3.0 with read speeds up to 130MB/s and write speeds up to 90MB/s." },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-8 xl:px-12 bg-surface-alt/50">
      <div className="w-full max-w-3xl mx-auto">
        <AnimatedHeading as="h2" className="text-5xl md:text-7xl font-display font-bold mb-6 text-center">Frequently Asked <span className="text-lime">Questions</span></AnimatedHeading>
        <p className="text-text-secondary text-center mb-20">Everything you need to know about NovaDrive.</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface rounded-xl border border-border overflow-hidden">
              <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="text-base">{faq.q}</span>
                <svg className={`w-6 h-6 text-text-secondary transition-transform ${openIndex === i ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                <p className="px-6 pb-6 text-base text-text-secondary">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12"><Link href="/faq" className="text-xl text-lime">View all FAQs →</Link></div>
      </div>
    </section>
  );
}
