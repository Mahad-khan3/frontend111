"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1Src from "@/images/WhatsApp Image 2026-07-13 at 12.07.29 PM.jpeg";

const featuredProduct = {
  title: "NovaDrive Portable SSD",
  price: "$129",
  comparePrice: "$179",
  discount: "28% OFF",
  image: img1Src.src,
  url: "/products/portable-ssd",
};

export function StickyProductBar() {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observerRef.current.observe(hero);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-bar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-0 left-1/2 z-[9999] w-[90%] -translate-x-1/2 md:w-[70%]"
          style={{ maxWidth: 900 }}
        >
          <div
            className="flex items-center justify-between bg-white px-4 py-3 md:px-6 md:py-4"
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              border: "1px solid #EAEAEA",
              boxShadow: "0 -4px 30px rgba(0,0,0,.08)",
            }}
          >
            {/* Left — Image + Info */}
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.title}
                className="h-10 w-10 shrink-0 rounded-lg object-cover md:h-14 md:w-14"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-[#111] md:text-sm">
                  {featuredProduct.title}
                </span>
                <div className="flex items-center gap-2">
                  {featuredProduct.comparePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {featuredProduct.comparePrice}
                    </span>
                  )}
                  <span className="text-sm font-bold text-[#111] md:text-base">
                    {featuredProduct.price}
                  </span>
                  {featuredProduct.discount && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                      {featuredProduct.discount}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right — Button */}
            <a
              href={featuredProduct.url}
              className="cta-btn relative flex items-center gap-2 overflow-hidden rounded-full bg-[#111] px-6 py-3 text-xs font-semibold text-white md:h-[52px] md:px-8 md:text-sm"
            >
              <span className="cta-btn-sweep rounded-full" />
              <span className="cta-btn-label flex items-center gap-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                ADD TO CART
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
