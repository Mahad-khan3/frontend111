"use client";

import { useState } from "react";
import { LetterReveal } from "./LetterReveal";

const faqs = [
  {
    q: "What can AI FOURMULA create for my brand?",
    a: "Product packshots, styled lifestyle scenes, campaign-ready video clips and social-ready visuals — all generated from a single product photo.",
  },
  {
    q: "What do I need to start?",
    a: "Just a product image. Drop it in, pick the scene or video style you want, and we build the rest around it.",
  },
  {
    q: "Will the visuals match our brand look?",
    a: "Yes. We adapt colors, lighting, tone and composition to your existing brand guidelines so everything stays on-brand.",
  },
  {
    q: "Do I own the assets you generate?",
    a: "Fully. Every asset we create is royalty-free and yours to use anywhere — in ads, on packs, or across social.",
  },
  {
    q: "How fast do I get results?",
    a: "Most image packs and video clips are ready in minutes, not days. No shoot, no wait, no reshoots.",
  },
  {
    q: "Does this replace my creative team?",
    a: "No. It handles the heavy lifting — rendering and iteration — so your team can focus on direction and strategy.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ backgroundColor: "var(--color-bg)", transition: "background-color 0.4s ease" }}>
      {/* full-width divider line on top */}
      <div style={{ width: "100%", borderTop: "1px solid var(--lines)" }} />

      <div
        className="faq-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(120px, 16%) 1fr",
          gap: 0,
          padding: "clamp(2rem, 5vw, 5rem) clamp(1.25rem, 4vw, 4rem)",
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        {/* left — narrow, "FAQs" label at the very top */}
        <div className="faq-left">
          <span
            style={{
              fontFamily: 'var(--_font-family---font-family)',
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: 1.2,
              color: "var(--color-text)",
              display: "inline-block",
            }}
          >
            FAQs
          </span>
        </div>

        {/* right — heading + accordion */}
        <div
          className="faq-right"
          style={{
            borderLeft: "1px solid var(--lines)",
            paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          }}
        >
          <LetterReveal
            as="h2"
            className="faq-heading"
            style={{
              fontFamily: '"SF Pro Display", Arial, sans-serif',
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "85px",
              lineHeight: "85px",
              color: "var(--color-text)",
              margin: 0,
              marginBottom: "clamp(2.5rem, 5vw, 60px)",
              letterSpacing: "-0.02em",
              transition: "color 0.4s ease",
            }}
            lines={["Not AI-gen answers.", "Real ones here."]}
          />

          <div className="faq-list">
            {faqs.map((faq, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={i}
                  className="faq-item"
                  style={{ borderTop: "1px solid var(--lines)" }}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenIndex(open ? null : i)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1.5rem",
                      padding: "clamp(1.25rem, 2vw, 1.75rem) 0",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: '"SF Pro Display", Arial, sans-serif',
                      fontWeight: 500,
                      fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                      lineHeight: 1.3,
                      color: "var(--color-text)",
                      transition: "color 0.4s ease",
                    }}
                  >
                    <span>{faq.q}</span>
                    <span
                      className="faq-icon"
                      style={{
                        flexShrink: 0,
                        position: "relative",
                        width: "22px",
                        height: "22px",
                        transition: "transform 0.3s ease",
                        transform: open ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: 0,
                          width: "100%",
                          height: "1.5px",
                          background: "var(--color-text)",
                          transform: "translateY(-50%)",
                          transition: "background 0.4s ease",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: 0,
                          height: "100%",
                          width: "1.5px",
                          background: "var(--color-text)",
                          transform: "translateX(-50%)",
                          transition: "background 0.4s ease",
                        }}
                      />
                    </span>
                  </button>

                  <div
                    className="faq-answer"
                    style={{
                      overflow: "hidden",
                      maxHeight: open ? "240px" : "0px",
                      opacity: open ? 1 : 0,
                      transition: "max-height 0.3s ease, opacity 0.3s ease",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        paddingBottom: "clamp(1.25rem, 2vw, 1.75rem)",
                        maxWidth: "52ch",
                        fontFamily: '"SF Pro Display", Arial, sans-serif',
                        fontWeight: 400,
                        fontSize: "clamp(0.95rem, 1.2vw, 1.0625rem)",
                        lineHeight: 1.6,
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
            {/* bottom divider to close the list */}
            <div style={{ borderTop: "1px solid var(--lines)" }} />
          </div>
        </div>
      </div>

      {/* full-width divider line on bottom */}
      <div style={{ width: "100%", borderTop: "1px solid var(--lines)" }} />

      <style>{`
        .faq-question:hover { opacity: 0.6; }
        .faq-question { transition: opacity 0.2s ease; }

        @media screen and (max-width: 767px) {
          .faq-layout {
            grid-template-columns: 1fr !important;
          }
          .faq-left {
            margin-bottom: 0.5rem;
          }
          .faq-right {
            border-left: none !important;
            padding-left: 0 !important;
          }
          .faq-heading {
            font-size: 36px !important;
            line-height: 38px !important;
          }
        }
      `}</style>
    </section>
  );
}
