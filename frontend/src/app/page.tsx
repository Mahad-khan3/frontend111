"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Hero } from "@/components/Hero";
import { BrandVisuals } from "@/components/BrandVisuals";
import { AIFashionShowcase } from "@/components/AIFashionShowcase";
import { CTASection } from "@/components/CTASection";
import { PremiumShowcase } from "@/components/PremiumShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustedBy } from "@/components/TrustedBy";
import { FeatureTiles } from "@/components/FeatureTiles";
import { PinnedSpecs } from "@/components/PinnedSpecs";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { StickyProductBar } from "@/components/StickyProductBar";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <StickyProductBar />
      <Hero />
      <BrandVisuals />
      <AIFashionShowcase />
      <CTASection />
      <PremiumShowcase />
      <HowItWorks />
      <TrustedBy />
      <FeatureTiles />
      <PinnedSpecs />
      <Testimonials />
      <FAQSection />
    </>
  );
}
