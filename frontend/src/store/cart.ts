import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  capacity: string;
  sku: string;
  slug: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

const STORAGE_KEY = "novadrive-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadCart(),
  isOpen: false,
  addItem: (item, quantity = 1) => {
    const items = get().items;
    const existing = items.find((i) => i.id === item.id);
    let newItems: CartItem[];
    if (existing) {
      newItems = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
      );
    } else {
      newItems = [...items, { ...item, quantity }];
    }
    saveCart(newItems);
    set({ items: newItems, isOpen: true });
  },
  removeItem: (id) => {
    const newItems = get().items.filter((i) => i.id !== id);
    saveCart(newItems);
    set({ items: newItems });
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    const newItems = get().items.map((i) =>
      i.id === id ? { ...i, quantity } : i
    );
    saveCart(newItems);
    set({ items: newItems });
  },
  clearCart: () => {
    saveCart([]);
    set({ items: [] });
  },
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));
