"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ProductViewer = dynamic(
  () => import("@/components/ThreeD/ProductModel").then((mod) => mod.ProductViewer),
  { ssr: false }
);
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { fetchProduct } from "@/lib/api";
import toast from "react-hot-toast";

const compatibilityMap: Record<string, string[]> = {
  lightning: ["iPhone 14/15/16 Series", "iPad Pro 12.9", "iPad Air", "iPad Mini", "iPod Touch"],
  "usb-c": ["Samsung Galaxy S23/S24/S25", "Google Pixel 8/9/10", "OnePlus 12/13", "iPad Pro (USB-C)", "MacBook / Chromebook"],
};

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCap, setSelectedCap] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetchProduct(slug as string).then((r: any) => {
      const p = r.data || r;
      setProduct(p);
      if (p.variants?.length > 0) setSelectedCap(p.variants[0].capacity);
    }).catch(() => setProduct(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen pt-24 px-8 xl:px-12 text-text-secondary">Loading...</div>;
  if (!product) return <div className="min-h-screen pt-24 px-8 xl:px-12"><h1 className="text-3xl font-display font-bold">Product not found</h1></div>;

  const currentVariant = product.variants?.find((v: any) => v.capacity === selectedCap);
  const price = currentVariant?.price || product.basePrice;
  const sku = currentVariant?.sku || "";
  const connectorLabel = product.connector === "usb-c" ? "USB-C" : "Lightning";
  const compatItems = compatibilityMap[product.connector] || [];

  const handleAddToCart = () => {
    addItem({
      id: `${slug}-${selectedCap}`,
      name: product.name,
      price,
      image: "",
      capacity: selectedCap,
      sku,
      slug: slug as string,
    }, quantity);
    toast.success("Added to cart!");
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="w-full px-8 xl:px-12 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-surface-alt rounded-xl border border-border overflow-hidden">
              <ProductViewer isTypeC={product.connector === "usb-c"} className="h-[400px] md:h-[500px]" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-text-secondary mb-4">{product.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-text-secondary bg-surface-alt px-2 py-0.5 rounded border border-border">{connectorLabel}</span>
              <span className="text-xs text-lime bg-lime/10 px-2 py-0.5 rounded">{selectedCap}</span>
            </div>
            <div className="text-3xl font-display font-bold text-lime mb-6">{formatPrice(price)}</div>
            <label className="text-sm text-text-secondary block mb-2">Capacity</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.variants?.map((v: any) => (
                <button key={v.capacity} onClick={() => setSelectedCap(v.capacity)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${selectedCap === v.capacity ? "border-lime bg-lime/10 text-lime" : "border-border text-text-secondary"}`}>
                  {v.capacity} — {formatPrice(v.price)}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-border rounded-lg">
                <button className="px-3 py-1.5 text-text-secondary hover:text-text" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span className="px-3 py-1.5 text-sm">{quantity}</span>
                <button className="px-3 py-1.5 text-text-secondary hover:text-text" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className="px-6 py-2 bg-lime text-white font-bold rounded-lg text-sm hover:bg-lime/90 transition-colors" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-secondary mb-6"><span>✓ 1-Year Warranty</span><span>✓ Free Shipping</span><span>✓ Secure Checkout</span></div>
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-medium mb-3">Compatibility</h3>
              <div className="flex flex-wrap gap-1.5">{compatItems.map((d: string) => <span key={d} className="text-xs px-2 py-0.5 bg-surface-alt rounded text-text-secondary border border-border">{d}</span>)}</div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div>
            <h2 className="text-xl font-display font-bold mb-4">Specifications</h2>
            <div className="space-y-2">{product.specs?.map((spec: any) => (
              <div key={spec.label} className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-text-secondary">{spec.label}</span>
                <span className="text-sm">{spec.value}</span>
              </div>
            ))}</div>
          </div>
          <div>
            <h2 className="text-xl font-display font-bold mb-4">Features</h2>
            <div className="grid grid-cols-2 gap-2">{product.features?.map((f: any) => (
              <div key={f.title} className="bg-surface-alt rounded-lg p-3 border border-border">
                <span className="text-base block mb-1">{f.icon}</span>
                <h4 className="text-sm font-bold">{f.title}</h4>
                <p className="text-xs text-text-secondary">{f.desc}</p>
              </div>
            ))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
