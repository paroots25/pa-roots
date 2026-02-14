export type CartItem = {
  plantType: string;
  plantName: string;
  message: string;
  email: string;
  price: number;
};

const CART_KEY = "pa_roots_cart";

/* ---------- GET CART ---------- */
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

/* ---------- ADD TO CART ---------- */
export function addToCart(item: CartItem) {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ---------- CLEAR CART ---------- */
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

/* ---------- CART COUNT ---------- */
export function getCartCount() {
  return getCart().length;
}