"use client";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore();

  return (
    <div className="min-h-screen pt-32 pb-32 px-8 xl:px-12">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-12">Your <span className="text-lime">Cart</span></h1>
        {items.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-muted mb-8 text-lg">Your cart is empty</p>
            <Link href="/shop" className="px-10 py-4 bg-lime text-white font-bold rounded-lg text-base inline-block hover:bg-lime/90 transition-colors">Start Shopping</Link>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-12">
              {items.map((item) => (
                <div key={item.id} className="flex gap-8 bg-surface rounded-xl p-8 border border-border">
                  <div className="w-32 h-32 bg-surface-alt rounded-lg flex items-center justify-center text-sm text-muted flex-shrink-0">{item.name.slice(0, 2)}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium">{item.name}</h3>
                    <p className="text-base text-muted">{item.capacity} • {item.sku}</p>
                    <p className="text-lime font-bold text-xl mt-2">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <button className="w-10 h-10 rounded border border-border flex items-center justify-center text-base" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span className="text-base w-8 text-center">{item.quantity}</span>
                      <button className="w-10 h-10 rounded border border-border flex items-center justify-center text-base" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      <button className="text-base text-muted hover:text-red-400 ml-4" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-surface rounded-xl p-10 border border-border">
              <div className="flex justify-between text-xl mb-3"><span className="text-muted">Subtotal</span><span className="font-bold">{formatPrice(subtotal())}</span></div>
              <p className="text-sm text-muted mb-6">Shipping calculated at checkout</p>
              <Link href="/checkout" className="block w-full py-4 bg-lime text-white font-bold rounded-lg text-base text-center hover:bg-lime/90 transition-colors">Proceed to Checkout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
