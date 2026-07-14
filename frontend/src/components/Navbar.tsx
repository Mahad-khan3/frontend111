"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { ScrollProgress } from "./ScrollProgress";
import { FullscreenMenu } from "./FullscreenMenu";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent border-b border-transparent`}
      >
        <div className="w-full px-5 md:px-8 xl:px-12 h-16 md:h-[72px] flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <Logo className="w-8 h-8 md:w-9 md:h-9" />
            <span className="hidden sm:inline font-display font-bold tracking-tight text-text">
              <span className="text-lime">Nova</span>Drive
            </span>
          </Link>

          {/* Center: pill controls */}
          <div className="flex items-center gap-1 md:gap-1.5 bg-black/90 backdrop-blur-md rounded-full px-1.5 py-1.5 shadow-lg shadow-black/10">
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-300"
            >
              <span className="relative w-4 h-3 flex flex-col justify-between">
                <span className="block h-[1.5px] w-full bg-current rounded-full" />
                <span className="block h-[1.5px] w-full bg-current rounded-full" />
                <span className="block h-[1.5px] w-3 bg-current rounded-full" />
              </span>
              <span className="text-sm font-medium hidden md:inline">Menu</span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            {/* Scroll progress */}
            <div className="pr-0.5">
              <ScrollProgress />
            </div>
          </div>

          {/* Right: profile + CTA — hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center gap-2.5 md:gap-3 shrink-0">
            <Link
              href="/track-order"
              aria-label="Account"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center text-text hover:border-text hover:scale-105 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
            </Link>
            <Link
              href="/shop"
              className="group relative overflow-hidden rounded-full bg-black px-4 md:px-5 py-2.5 text-xs md:text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_-6px_var(--color-accent)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-[var(--color-accent)] transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="relative">Get started</span>
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
