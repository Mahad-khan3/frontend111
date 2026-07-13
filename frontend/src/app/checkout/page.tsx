"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const SHIPPING = 499;
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", state: "", zip: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.zip) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        customerName: form.name,
        customerEmail: form.email,
        shippingAddr: {
          line1: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: "US",
        },
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          capacity: item.capacity,
          sku: item.sku,
          image: item.image || "",
        })),
        subtotal: subtotal(),
        shipping: SHIPPING,
        paymentMethod: "cod",
      };
      const result: any = await api.post("/orders", orderData);
      toast.success("Order placed successfully!");
      clearCart();
      window.location.href = `/shop?order=${result.data._id}`;
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return (
    <div className="min-h-screen pt-32 pb-32 px-8 xl:px-12"><div className="max-w-2xl mx-auto text-center"><h1 className="text-4xl font-display font-bold mb-6">Nothing to checkout</h1><a href="/shop" className="px-10 py-4 bg-lime text-white font-bold rounded-lg text-base inline-block hover:bg-lime/90 transition-colors">Shop Now</a></div></div>
  );

  return (
    <div className="min-h-screen pt-32 pb-32 px-8 xl:px-12">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-12"><span className="text-lime">Checkout</span></h1>
        <div className="flex items-center gap-3 mb-12">
          {["Info", "Shipping", "Payment"].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold ${step >= i + 1 ? "bg-lime text-white" : "bg-surface-alt text-muted border border-border"}`}>{i + 1}</div>
              <span className={`text-base ${step >= i + 1 ? "text-text" : "text-muted"}`}>{s}</span>
              {i < 2 && <div className="w-10 h-px bg-border" />}
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            {step === 1 && (
              <div className="bg-surface rounded-xl p-8 border border-border space-y-5">
                <h2 className="text-xl font-display font-bold">Contact Info</h2>
                <input type="text" placeholder="Full Name" className="w-full bg-bg border border-border rounded-lg px-5 py-4 text-base focus:outline-none focus:border-lime" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input type="email" placeholder="Email" className="w-full bg-bg border border-border rounded-lg px-5 py-4 text-base focus:outline-none focus:border-lime" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <button className="px-10 py-4 bg-lime text-white font-bold rounded-lg text-base hover:bg-lime/90 transition-colors" onClick={() => setStep(2)}>Continue</button>
              </div>
            )}
            {step === 2 && (
              <div className="bg-surface rounded-xl p-8 border border-border space-y-5">
                <h2 className="text-xl font-display font-bold">Shipping Address</h2>
                <input type="text" placeholder="Address" className="w-full bg-bg border border-border rounded-lg px-5 py-4 text-base focus:outline-none focus:border-lime" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <div className="grid grid-cols-3 gap-6">
                  <input type="text" placeholder="City" className="w-full bg-bg border border-border rounded-lg px-5 py-4 text-base focus:outline-none focus:border-lime" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  <input type="text" placeholder="State" className="w-full bg-bg border border-border rounded-lg px-5 py-4 text-base focus:outline-none focus:border-lime" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                  <input type="text" placeholder="ZIP Code" className="w-full bg-bg border border-border rounded-lg px-5 py-4 text-base focus:outline-none focus:border-lime" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
                </div>
                <div className="flex gap-4">
                  <button className="px-10 py-4 border border-border text-text rounded-lg text-base hover:bg-surface-alt transition-colors" onClick={() => setStep(1)}>Back</button>
                  <button className="px-10 py-4 bg-lime text-white font-bold rounded-lg text-base hover:bg-lime/90 transition-colors" onClick={() => setStep(3)}>Continue</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="bg-surface rounded-xl p-8 border border-border space-y-5">
                <h2 className="text-xl font-display font-bold">Payment</h2>
                <div className="flex items-center gap-3 p-4 bg-lime/5 border border-lime/20 rounded-lg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/><path d="M18 12h4"/><path d="M2 12h4"/></svg>
                  <div>
                    <p className="text-sm font-bold text-lime">Cash on Delivery</p>
                    <p className="text-xs text-text-secondary">Pay with cash when your order arrives</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-2">
                  <button className="px-10 py-4 border border-border text-text rounded-lg text-base hover:bg-surface-alt transition-colors" onClick={() => setStep(2)}>Back</button>
                  <button className="px-10 py-4 bg-lime text-white font-bold rounded-lg text-base hover:bg-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={loading}>{loading ? "Processing..." : `Place Order — ${formatPrice(subtotal() + SHIPPING)}`}</button>
                </div>
              </div>
            )}
          </div>
          <div className="bg-surface rounded-xl p-8 border border-border h-fit">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-base"><span className="text-muted">{item.name} ({item.capacity}) x{item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div>
              ))}
            </div>
            <div className="border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-base"><span className="text-muted">Subtotal</span><span>{formatPrice(subtotal())}</span></div>
              <div className="flex justify-between text-base"><span className="text-muted">Shipping</span><span>{formatPrice(SHIPPING)}</span></div>
              <div className="flex justify-between text-lg font-bold pt-4 border-t border-border"><span>Total</span><span className="text-lime">{formatPrice(subtotal() + SHIPPING)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
