export {};

declare global {
  interface CreateVariant {
    size: string;
    color: string;
    material: string;
    stock?: number;
    price: number;
    images?: string[];
  }

  interface UpdateVariant extends Partial<CreateVariant> {}

  interface VariantExist {
    productId: string;
    size: string;
    color: string;
    material: string;
  }
}
