import type { Product } from "@/lib/products";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export const CART_STORAGE_KEY = "botanica-cart";

export function cartItemFromProduct(product: Product): CartItem {
  return { id: product.id, name: product.name, price: product.price, quantity: 1 };
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
