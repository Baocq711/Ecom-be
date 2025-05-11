import { DiscountType } from '@prismaclient/index';

export {};

declare global {
  interface CreateProduct {
    name: string;
    description?: string;
    discount?: number;
    discountType?: DiscountType;
    isActive?: boolean;
    categoryId?: string;
    images?: string[];
  }

  interface UpdateProduct extends Partial<CreateProduct> {}
}
