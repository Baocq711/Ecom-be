export {};

declare global {
  interface CreateVariant {
    sku: string;
    size: string;
    color: string;
    material: string;
    stock?: number;
    price: number;
    images?: string[];
  }

  interface UpdateVariant extends Partial<CreateVariant> {}
}
