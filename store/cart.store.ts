import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartType>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item: CartItem) =>
        set((state) => {
          const exists = state.items.find(
            (i) => i.product.id === item.product.id,
          );

          // Se já existe, só aumenta a quantidade
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.product.id === item.product.id
                  ? { ...i, quantity: i.quantity! + item.quantity }
                  : i,
              ),
            };
          }

          // Se não existe, adiciona o item
          return { items: [...state.items, item] };
        }),

      removeItem: (id: number) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        })),

      updateQuantity: (id: number, quantity: number) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === id ? { ...i, quantity } : i,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),

    { name: "cart-storage" },
  ),
);
