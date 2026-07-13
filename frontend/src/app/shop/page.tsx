"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { fetchProducts } from "@/lib/api";

const connectorColors: Record<string, string> = {
  lightning: "#a3e635",
  "usb-c": "#6366f1",
};
const connectorLabels: Record<string, string> = {
  lightning: "Lightning",
  "usb-c": "USB-C",
};

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts("active").then((r: any) => {
      setProducts(r.data || []);
      const defaults: Record<string, string> = {};
      (r.data || []).forEach((p: any) => {
        if (p.variants?.length > 0) defaults[p.slug] = p.variants[0].capacity;
      });
      setSelected(defaults);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen pt-32 pb-32 px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto text-center text-text-secondary">Loading products...</div>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-32 px-8 xl:px-12">
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-4">All <span className="text-lime">Products</span></h1>
        <p className="text-text-secondary mb-16 max-w-3xl">Choose your connector and capacity. Every NovaDrive comes with a 1-year warranty and free shipping.</p>
        <div className="grid md:grid-cols-2 gap-12">
          {products.map((p: any) => {
            const color = connectorColors[p.connector] || "#a3e635";
            const selectedCap = selected[p.slug] || p.variants?.[0]?.capacity || "";
            const variant = p.variants?.find((v: any) => v.capacity === selectedCap);
            const price = variant?.price || p.basePrice;
            return (
              <div key={p.slug} className="bg-surface rounded-2xl border border-border overflow-hidden group hover:border-white/20 transition-all duration-500">
                <div className="h-80 flex items-center justify-center" style={{ background: `radial-gradient(ellipse at center, ${color}10, transparent)` }}>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: color + "15" }}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /></svg>
                    </div>
                    <p className="text-sm text-muted">3D Model</p>
                    <p className="text-xs text-muted/50">Drag to interact</p>
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: color + "20", color }}>{connectorLabels[p.connector] || p.connector}</span>
                  <h3 className="text-2xl font-display font-bold mt-3 mb-2">{p.name}</h3>
                  <p className="text-lg text-muted mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.variants?.map((v: any) => (
                      <button key={v.capacity} onClick={() => setSelected((prev) => ({ ...prev, [p.slug]: v.capacity }))}
                        className={`px-4 py-2.5 text-base rounded-lg border transition-all ${selectedCap === v.capacity ? "border-lime bg-lime/10 text-lime" : "border-border text-muted hover:border-border"}`}>{v.capacity}</button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-display font-bold text-lime">{formatPrice(price)}</span>
                    <Link href={`/product/${p.slug}`} className="px-8 py-3 bg-lime text-white text-base font-bold rounded-lg hover:bg-lime/90 transition-colors">View Details</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
