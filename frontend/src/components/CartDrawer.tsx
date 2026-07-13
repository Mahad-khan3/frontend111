"use client";

import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCartStore();

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={closeCart} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-border z-[101] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-display font-bold">Cart</h2>
            <button onClick={closeCart} className="text-text-secondary hover:text-text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center text-text-secondary mt-20">
                <p className="mb-4">Your cart is empty</p>
                <Link href="/shop" className="text-lime underline" onClick={closeCart}>Start shopping</Link>
              </div>
            ) : items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-surface-alt rounded-lg p-3">
                <div className="w-20 h-20 bg-surface rounded flex items-center justify-center text-xs text-text-secondary">{item.name.slice(0, 2)}</div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <p className="text-xs text-text-secondary">{item.capacity} • {item.sku}</p>
                  <p className="text-sm text-lime mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="w-6 h-6 rounded border border-border flex items-center justify-center text-xs" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button className="w-6 h-6 rounded border border-border flex items-center justify-center text-xs" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-text-secondary hover:text-red-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                </button>
              </div>
            ))}
          </div>
          {items.length > 0 && (
            <div className="border-t border-border p-6 space-y-4">
              <div className="flex justify-between text-sm"><span className="text-text-secondary">Subtotal</span><span className="font-medium">{formatPrice(subtotal())}</span></div>
              <button className="w-full py-3 bg-lime text-white font-bold rounded-lg text-sm hover:bg-lime/90 transition-colors" onClick={() => { closeCart(); window.location.href = "/checkout"; }}>Checkout</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
