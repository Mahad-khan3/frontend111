"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserName } from "@/context/UserNameContext";

export function NamePopup() {
  const { hasSetName, setUserName } = useUserName();
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");

  if (!show || hasSetName) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(name);
    setShow(false);
  };

  const handleSkip = () => {
    setUserName("");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={handleSkip}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[90%] max-w-[420px] rounded-3xl bg-white p-8 shadow-2xl dark:bg-[#111]"
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10"
              aria-label="Skip"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Icon */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF7A1A]/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF7A1A" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
              </svg>
            </div>

            {/* Heading */}
            <h2
              className="mb-2 text-2xl font-bold tracking-tight text-[#111] dark:text-white"
              style={{ fontFamily: "var(--_font-family---font-family)" }}
            >
              Welcome to NovaDrive
            </h2>
            <p
              className="mb-6 text-sm text-gray-500 dark:text-gray-400"
              style={{ fontFamily: "var(--_font-family---font-family)" }}
            >
              Enter your name for a personalized experience
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name..."
                autoFocus
                className="mb-4 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-[15px] text-[#111] outline-none transition-all placeholder:text-gray-400 focus:border-[#FF7A1A] focus:ring-2 focus:ring-[#FF7A1A]/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-[#FF7A1A]"
                style={{ fontFamily: "var(--_font-family---font-family)" }}
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-[#111] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#333] active:scale-[0.98] dark:bg-white dark:text-[#111] dark:hover:bg-gray-200"
                style={{ fontFamily: "var(--_font-family---font-family)" }}
              >
                Let&apos;s Go
              </button>
            </form>

            {/* Skip */}
            <button
              onClick={handleSkip}
              className="mt-3 w-full py-2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              style={{ fontFamily: "var(--_font-family---font-family)" }}
            >
              Skip for now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
