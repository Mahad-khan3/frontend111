"use client";
import { useState } from "react";
import Link from "next/link";

const faqs = [
  { q: "Is NovaDrive compatible with my device?", a: "NovaDrive comes in two variants: Lightning for iPhone/iPad and USB-C for Android devices. Both support simultaneous charging and data transfer." },
  { q: "Do I need an app to use NovaDrive?", a: "The companion app provides the best experience for managing backups, but NovaDrive works as a standard flash drive out of the box." },
  { q: "What happens if I lose my NovaDrive?", a: "The Password Vault uses AES-256 military-grade encryption. Your data is protected." },
  { q: "Can I charge my phone while transferring files?", a: "Yes! NovaDrive supports simultaneous charging and data transfer." },
  { q: "How fast is the transfer speed?", a: "NovaDrive supports USB 3.0 with read speeds up to 130MB/s and write speeds up to 90MB/s." },
  { q: "What capacities are available?", a: "NovaDrive is available in four capacities: 32GB, 64GB, 128GB, and 256GB." },
  { q: "What is the warranty period?", a: "All NovaDrive products come with a 1-year limited warranty covering manufacturing defects." },
  { q: "Can I use NovaDrive with a computer?", a: "Yes, NovaDrive works as a standard USB flash drive when connected to a laptop or desktop." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking number via email." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-32 pb-24 px-8 xl:px-12">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">Frequently Asked <span className="text-lime">Questions</span></h1>
        <p className="text-text-secondary mb-12">Still have questions? <Link href="/contact" className="text-lime underline">Contact us</Link>.</p>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-5 text-left bg-surface hover:bg-surface-alt transition-colors" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="text-sm font-medium">{faq.q}</span>
                <svg className={`w-4 h-4 text-text-secondary transition-transform duration-300 flex-shrink-0 ml-4 ${openIndex === i ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                <p className="p-5 pt-0 text-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
