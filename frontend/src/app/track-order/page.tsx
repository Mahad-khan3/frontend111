"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

const statusOrder = ["pending", "paid", "shipped", "delivered"];
const statusLabels: Record<string, string> = {
  pending: "Order Placed", paid: "Processing", shipped: "Shipped", delivered: "Delivered", refunded: "Refunded", cancelled: "Cancelled",
};

export default function TrackOrderPage() {
  const [orderNum, setOrderNum] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const result: any = await api.get(`/orders?email=${encodeURIComponent(email)}`);
      const found = result.orders?.find((o: any) =>
        String(o._id).includes(orderNum) || String(o._id).startsWith(orderNum)
      );
      if (found) {
        setOrder(found);
      } else {
        setError("No order found with that number and email combination.");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to look up order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentStatusIndex = order ? statusOrder.indexOf(order.status) : -1;

  return (
    <div className="min-h-screen pt-32 pb-32 px-8 xl:px-12">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Track Your <span className="text-lime">Order</span></h1>
        <p className="text-text-secondary mb-8">Enter your order number and email to check status.</p>
        <form onSubmit={handleTrack} className="space-y-4 mb-8">
          <input type="text" placeholder="Order Number" required className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime" value={orderNum} onChange={(e) => setOrderNum(e.target.value)} />
          <input type="email" placeholder="Email" required className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-lime" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full py-3 bg-lime text-white font-bold rounded-lg text-sm hover:bg-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? "Searching..." : "Track Order"}
          </button>
        </form>
        {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-sm text-red-500">{error}</div>}
        {order && (
          <div className="bg-surface rounded-xl p-6 border border-border">
            <h3 className="font-bold mb-1">{order.customerName}</h3>
            <p className="text-xs text-text-secondary mb-4 font-mono">Order #{String(order._id).slice(0, 8)}</p>
            <div className="space-y-4 mb-6">
              {statusOrder.map((s) => {
                const idx = statusOrder.indexOf(s);
                const done = idx <= currentStatusIndex;
                return (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${done ? "bg-lime text-white" : "bg-surface border border-border text-text-secondary"}`}>
                      {done ? "✓" : ""}
                    </div>
                    <span className={`text-sm ${done ? "text-text" : "text-text-secondary"}`}>{statusLabels[s]}</span>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-text-secondary">Items</span><span>{order.items?.length || 0}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Total</span><span className="text-lime font-medium">{formatPrice(order.total)}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Shipping to</span><span>{order.shippingAddr?.city}, {order.shippingAddr?.state}</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
