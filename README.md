# frontend111 — NovaDrive

A modern marketing / e‑commerce frontend for **NovaDrive** (2‑in‑1 cable flash drive), built with Next.js (App Router), Tailwind CSS v4, TypeScript and React 19. It includes animated product showcases, an AI‑style split showcase section, smooth scrolling, light/dark theming, and a full storefront + admin UI.

## Tech Stack & Dependencies

**Runtime dependencies**
- `next` ^16.0.0 — App Router framework
- `react` / `react-dom` ^19.0.0
- `tailwindcss` ^4.0.0 + `@tailwindcss/postcss` ^4.0.0 — utility CSS (v4 engine)
- `framer-motion` ^12.0.0 — component animations
- `gsap` ^3.15.0 — letter‑by‑letter heading reveal
- `lenis` ^1.3.0 — smooth scroll
- `three` ^0.185.0, `@react-three/fiber` ^9.0.0, `@react-three/drei` ^10.0.0 — 3D product viewer
- `zustand` ^5.0.0 — cart / global state
- `axios` ^1.18.1 — API client
- `clsx` ^2.1.1, `tailwind-merge` ^3.6.0 — class utilities
- `react-hot-toast` ^2.6.0 — toasts

**Dev dependencies**
- `typescript` ^5.9.3, `@types/react`, `@types/react-dom`, `@types/node`, `@types/three`
- `postcss` ^8.5.0, `autoprefixer` ^10.5.0

## Getting Started

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
```

Other scripts:
```bash
npm run build    # production build
npm run start    # serve production build
```

## Project Structure

```
frontend/
├─ src/
│  ├─ app/                 # App Router pages + global styles
│  │  ├─ layout.tsx        # root layout (ThemeProvider, fonts)
│  │  ├─ page.tsx          # home page (composes all sections)
│  │  ├─ globals.css       # Tailwind v4 theme tokens + keyframes
│  │  └─ <route>/page.tsx  # about, shop, product/[slug], cart, checkout,
│  │                       #   contact, faq, features, how-it-works, privacy,
│  │                       #   terms, reviews, shipping-returns, track-order,
│  │                       #   admin/* (login, products, orders, customers,
│  │                       #   discounts, pages, reviews)
│  ├─ components/          # UI + section components
│  │  ├─ Navbar.tsx, Footer.tsx, Hero.tsx
│  │  ├─ BrandVisuals.tsx, AIFashionShowcase.tsx, CTASection.tsx
│  │  ├─ ShowcaseSection.tsx   # AI Product Shots / AI Video Production split
│  │  ├─ HowItWorks.tsx, TrustedBy.tsx, ParallaxStackedSections.tsx
│  │  ├─ FAQSection.tsx, LetterReveal.tsx, AnimatedHeading.tsx
│  │  ├─ Logo.tsx, CartDrawer.tsx, StickyProductBar.tsx, Preloader.tsx
│  │  ├─ ThreeD/ProductModel.tsx, context/ThemeContext.tsx
│  ├─ context/ThemeContext.tsx  # light / dark theme (toggles .dark on <html>)
│  ├─ lib/                 # api.ts, utils.ts
│  ├─ store/cart.ts        # zustand cart store
│  └─ images/              # placeholder product images
```

## Theme System

- Light/dark is driven by a `.dark` class on `<html>` (see `context/ThemeContext.tsx`).
- All colors are CSS variables defined in `app/globals.css` (`@theme` block + `.dark` override): `--color-bg`, `--color-surface`, `--color-text`, `--color-text-secondary`, `--color-border`, `--color-accent`, `--color-lime`, etc.
- The ShowcaseSection halves read these variables, so their background + text swap automatically with the theme.

## Custom Work Implemented

The following features were added / modified on top of the base project:

### 1. Letter‑by‑letter orange heading reveal (`components/LetterReveal.tsx`)
- Splits heading text into per‑character `<span>`s and reveals them one‑by‑one with **GSAP**.
- Each letter appears in orange `#e8572a`, then animates to its final (design) color.
- **First‑load only** — gated by a `sessionStorage` flag (`introPlayed`), so it does not replay on scroll or in‑session navigation, but replays on a full page reload.
- Applied to: `BrandVisuals` ("On‑brand visuals." / "Made by AI."), `PremiumShowcase` / `CTASection` / `AIFashionShowcase` ("Studio‑quality, without the studio."), `HowItWorks` ("How It Works" + both "AI that"), `ParallaxStackedSections` ("From idea to assets in four steps.") and `FAQSection` ("Not AI‑gen answers. Real ones here.").

### 2. Transparent header (`components/Navbar.tsx`)
- Removed the scroll‑triggered background, blur and bottom border. The header is now **fully transparent at all scroll positions** in both light and dark mode (the `scrolled` state logic is kept but no longer applies any background/border).

### 3. Rebuilt split showcase (`components/ShowcaseSection.tsx`)
- Two equal, rounded **theme‑colored** halves: **AI Product Shots** (left) and **AI Video Production** (right), with a center gutter.
- Each half is a **rounded card** — `border-radius: 1rem` + `1px solid var(--color-border)` border (so the shape is visible against the page background) and `overflow-hidden`, which clips the inner content to the rounded corners. Background + text follow the theme (`--color-bg` / `--color-text`).
- **Left collage** — asymmetric 5‑image grid: tall full‑height left anchor, center column (1 larger top image + 2 smaller images side‑by‑side), tall full‑height right anchor. Images are **flush to the card edges** (outer‑edge‑only radius, horizontal padding `0`) so they sit chipka against the border.
- **Right video row** — 3 looping placeholder videos; the center video is taller and pokes out above/below the side videos, with outer‑edge‑only border‑radius on the side videos and `0` side padding so the row fills edge‑to‑edge.
- **Circular dot buttons** — pill replaced with a perfect circle containing 4 staggered, animated "loading" dots (`dot-wave` keyframe), hover turns accent‑orange.
- **Eyebrow labels** ("AI Product Shots" / "AI Video Production") are **black in light mode and white in dark mode** (previously accent orange).
- **Responsive**: on desktop the two halves sit side‑by‑side (`md:flex-row`); on mobile they **stack** (left on top, right below) keeping the exact same internal layout. Half height is `clamp(32rem,80svh,56rem)` on desktop and a shorter `60svh` on mobile so the tall anchor images are not too tall on small screens. A top padding (`pt-[clamp(2rem,4vw,3.5rem)]`) separates the section from the one above.

### 4. Logo accent color
- Changed the logo green (`--color-lime`) to orange **`#e8572a`** in three places only: the icon dot (`Logo.tsx`), and the "Nova" wordmark text in the **header** (`Navbar.tsx`) and **footer** (`Footer.tsx`). All other `text-lime` usages (buttons, headings) are untouched.

### 5. BrandVisuals — pure-black dark bg + lighter, smaller heading (`components/BrandVisuals.tsx`)
- Section background is `bg-surface`; in **dark mode** it now uses `dark:bg-black` so it renders pure black (`#000`) instead of the default dark surface (`#141414`).
- Heading ("On-brand visuals." / "Made by AI.") is reduced in size (`clamp(3rem, 6.5vw, 6.5rem)`, down from `7.5rem`) and lightened to `font-weight: 300`.
- The section's overall height is preserved — `py-[1.5rem]` padding is added to the inner row so only the text shrinks; the section box keeps its original height.

### 6. CTASection — pure-black dark bg (`components/CTASection.tsx`)
- The "Studio-quality, without the studio." section (sits directly below the Hero) uses `dark:bg-black` in dark mode for a pure-black background (it is `hidden md:block`, i.e. desktop/tablet only).

### 7. Hero heading — smaller + flush-left (`components/Hero.tsx`)
- "Your Catalog, instantly re-shots" heading reduced in size (desktop `md:text-7xl → md:text-5xl`, etc.).
- Aligned flush to the left edge: left padding reduced (`px-8 xl:px-12` → `px-4 xl:px-8`) while keeping `text-left`, so it no longer reads as centered.
- Top spacing of `80px` added to the heading on **both** the mobile/tablet block (`mt-[80px]`) and the desktop block (`marginTop: 80px`), so it sits lower with a clear gap above it. (The mobile/tablet block is `lg:hidden`, so on desktop the separate desktop heading block carries the spacing.)

## Notes
- Placeholder images live in `src/images/` and placeholder videos use public Pixabay URLs — swap these for real assets later.
- The dev server runs on port `3000`; if changes don't appear, restart `npm run dev` and hard‑refresh the browser.
