type OrderItem = {
  id: number;
  quantity: number;
  product: Product;
  order?: Order;
} & DateTypes;

type CartItem = Pick<OrderItem, "id" | "product" | "quantity">;

type CartType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};
