export {};

declare global {
  interface CreateCartItem {
    quantity: number;
    cartId: string;
    variantId: string;
  }

  interface UpdateCartItem extends Partial<CreateCartItem> {}
}
