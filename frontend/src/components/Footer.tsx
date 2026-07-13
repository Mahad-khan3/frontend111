"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="w-full px-8 xl:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <Link href="/" className="text-lg font-display font-bold tracking-tight">
            <span className="text-lime">Nova</span><span className="text-text">Drive</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/shop" className="text-sm text-text-secondary hover:text-text">Shop</Link>
            <Link href="/faq" className="text-sm text-text-secondary hover:text-text">FAQ</Link>
            <Link href="/contact" className="text-sm text-text-secondary hover:text-text">Contact</Link>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">&copy; {new Date().getFullYear()} NovaDrive. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-text-secondary hover:text-text">Privacy</Link>
            <Link href="/terms" className="text-xs text-text-secondary hover:text-text">Terms</Link>
            <Link href="/shipping-returns" className="text-xs text-text-secondary hover:text-text">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
