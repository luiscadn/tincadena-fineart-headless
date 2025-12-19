import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartState {
  isOpen: boolean;
  cart: CartItem[]; // array donde se alojan los cuadros
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void; // accion de agregar
  removeItem: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  isOpen: false,
  cart: [],
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  
  addItem: (item) => set((state) => {
    // si ya existe para aumentar cantidad
    const existingItem = state.cart.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        isOpen: true, // abrir automáticamente al agregar
      };
    }
    return { cart: [...state.cart, item], isOpen: true };
  }),

  removeItem: (id) => set((state) => ({
    cart: state.cart.filter((i) => i.id !== id),
  })),
}));