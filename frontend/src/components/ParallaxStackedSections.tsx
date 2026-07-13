"use client";

type SectionData = {
  id: string;
  label: string;
  number: string;
  heading: [string, string];
  leftLabel: string;
  rightLabel: string;
  subheading: [string, string];
  bg: string;
  cardBg: string;
};

const SECTIONS: SectionData[] = [
  {
    id: "pb",
    label: "PB",
    number: "01",
    heading: ["Add products", "and brand."],
    leftLabel: "14+ model presets",
    rightLabel: "Multiple pose options",
    subheading: ["Store your products,", "shots and brand look in one place."],
    bg: "#F5F0E8",
    cardBg: "#fff",
  },
  {
    id: "go",
    label: "GO",
    number: "02",
    heading: ["AI generates", "options."],
    leftLabel: "Concept & scene variations",
    rightLabel: "Multiple visual directions",
    subheading: ["Use AI to", "create new concepts, scenes and ideas."],
    bg: "#E8F0E8",
    cardBg: "#fff",
  },
  {
    id: "cb",
    label: "CB",
    number: "03",
    heading: ["Choose one", "the best."],
    leftLabel: "Side-by-side comparison",
    rightLabel: "Easy selection & review",
    subheading: ["Pick the versions", "you like from the generations."],
    bg: "#E8ECF5",
    cardBg: "#fff",
  },
  {
    id: "ax",
    label: "AX",
    number: "04",
    heading: ["Ready-made", "assets export."],
    leftLabel: "Optimized for PDP & ads",
    rightLabel: "One-click export",
    subheading: ["Export ready-made", "files to your store, ads and social."],
    bg: "#F5E8E8",
    cardBg: "#fff",
  },
];

function DividerWithTicks() {
  return (
    <div className="relative w-full" style={{ height: 1 }}>
      <div className="absolute inset-0 bg-black/15" />
      <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 border-b border-l border-black/30" />
      <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 border-b border-r border-black/30" />
      <div className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-black/20" />
    </div>
  );
}

function MockCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm ${className}`}
      style={{ filter: "grayscale(0.6) opacity(0.5)" }}
    >
      <div className="flex items-center gap-2 border-b border-black/8 px-4 py-3">
        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <div className="ml-4 h-2 flex-1 rounded bg-black/10" />
      </div>
      <div className="p-4">
        <div className="mb-3 aspect-[3/2] rounded-lg bg-black/8" />
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded bg-black/10" />
          <div className="h-2 w-1/2 rounded bg-black/8" />
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  data,
  index,
}: {
  data: SectionData;
  index: number;
}) {
  const isLast = index === SECTIONS.length - 1;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        position: "sticky",
        top: 0,
        zIndex: index + 1,
        height: "100vh",
        minHeight: "100vh",
        backgroundColor: data.bg,
      }}
    >
      <div className="flex h-full flex-col px-6 py-8 md:px-12 md:py-10 lg:px-16 xl:px-20">
        {/* Top row: label left, number right */}
        <div className="flex items-start justify-between">
          <span
            className="text-xs font-medium uppercase tracking-widest text-black/50 md:text-sm"
          >
            ({data.label})
          </span>
          <span
            className="text-2xl font-bold leading-none text-black/15 md:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--_font-family---font-family)" }}
          >
            {data.number}
          </span>
        </div>

        {/* Heading */}
        <div className="mt-6 md:mt-8 lg:mt-10">
          <h2
            className="text-left font-display text-4xl font-bold leading-[0.9] tracking-tight text-black md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {data.heading[0]}
            <br />
            {data.heading[1]}
          </h2>
        </div>

        {/* Divider */}
        <div className="mt-6 md:mt-8 lg:mt-10">
          <DividerWithTicks />
        </div>

        {/* Two-column row */}
        <div className="mt-4 flex flex-wrap gap-x-12 gap-y-3 md:mt-5 lg:mt-6">
          <div className="flex-1">
            <span className="text-xs font-medium uppercase tracking-wider text-black/50 md:text-sm">
              {data.leftLabel}
            </span>
          </div>
          <div className="flex-1">
            <span className="text-xs font-medium uppercase tracking-wider text-black/50 md:text-sm">
              {data.rightLabel}
            </span>
          </div>
        </div>

        {/* Subheading + button row */}
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4 md:mt-4 lg:mt-5">
          <div className="max-w-xs">
            <p className="text-sm leading-snug text-black/80 md:text-base lg:text-lg">
              <span className="font-semibold">{data.subheading[0]}</span>
              <br />
              <span className="text-black/50">{data.subheading[1]}</span>
            </p>
          </div>
          <a
            href="#get-started"
            className="group relative inline-flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 md:px-6 md:py-3 md:text-sm"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, #FF7A1A, #FF5A1F)",
              }}
            />
            <span className="relative flex items-center gap-1.5">
              Get started
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
        </div>

        {/* Preview card */}
        <div className="mt-auto flex justify-center md:justify-end">
          <MockCard
            className={`w-full max-w-sm ${
              isLast
                ? ""
                : "md:max-h-[55%] md:overflow-hidden"
            }`}
          />
        </div>
      </div>
    </section>
  );
}

export function ParallaxStackedSections() {
  return (
    <div className="relative w-full" style={{ height: SECTIONS.length * 100 + "vh" }}>
      {/* Intro header */}
      <div
        className="relative z-0 flex w-full flex-col items-start justify-center bg-white px-6 py-16 md:px-12 md:py-20 lg:px-16 xl:px-20"
        style={{ height: "100vh", minHeight: "100vh" }}
      >
        <div className="mb-6 w-full border-t border-black/10 md:mb-8" />

        <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <h1
              className="font-display text-5xl font-bold leading-[0.9] tracking-tight text-black md:text-6xl lg:text-7xl xl:text-8xl"
            >
              From idea to assets
              <br />
              <span className="text-black/40">in four steps.</span>
            </h1>
          </div>
          <p
            className="max-w-xs text-right text-sm leading-relaxed text-black/50 md:text-base"
          >
            Sign up for free and supercharge your creative workflow.
          </p>
        </div>
      </div>

      {/* Stacked sections */}
      {SECTIONS.map((data, i) => (
        <SectionCard key={data.id} data={data} index={i} />
      ))}
    </div>
  );
}
