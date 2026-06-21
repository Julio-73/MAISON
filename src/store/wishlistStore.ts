import { create } from "zustand";

export interface WishlistItem {
  id: string; name: string; price: number; image: string;
}

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
  toggle: () => void;
  toggleItem: (item: WishlistItem) => void;
  add: (item: WishlistItem) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
}

export const useWishlist = create<WishlistState>((set, get) => ({
  items: [],
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  toggleItem: (item) => set((s) => {
    if (s.items.find(i => i.id === item.id)) {
      return { items: s.items.filter(i => i.id !== item.id) };
    }
    return { items: [...s.items, item] };
  }),
  add: (item) => set((s) => {
    if (s.items.find(i => i.id === item.id)) return s;
    return { items: [...s.items, item] };
  }),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
  has: (id) => get().items.some(i => i.id === id),
}));