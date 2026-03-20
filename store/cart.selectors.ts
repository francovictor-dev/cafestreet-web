import { useCartStore } from "./cart.store";

export const useCartItems = () => useCartStore((s) => s.items);

export const useCartCount = () =>
  useCartStore((s) =>
    s.items
      .map((item) => item.quantity)
      .reduce((prev, curr) => prev! + curr!, 0),
  );
