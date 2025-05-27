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

  interface ProductSql {
    id: string;
    name: string;
    slug: string;
    description: string;
    images: string[];
    discount: number;
    discountType: DiscountType;
    isActive: boolean;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    variants: VariantSql[];
  }

  interface VariantSql {
    id: string;
    size: string;
    color: string;
    material: string;
    stock: number;
    price: number;
    images: string[];
    isActive: boolean;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
}
