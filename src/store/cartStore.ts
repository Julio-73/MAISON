import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    if (existing) {
      return { items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i), isOpen: true };
    }
    return { items: [...state.items, { ...item, quantity: 1 }], isOpen: true };
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(i => i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)
  })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [] }),
  cartTotal: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
