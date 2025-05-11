import { DiscountType, OrderStatus, PaymentMethod, PaymentStatus } from '@prismaclient/index';

export {};

declare global {
  interface CreateOrderItem {
    quantity: number;

    name: string;
    description?: string;
    discount?: number;
    discountType?: DiscountType;

    sku: string;
    size: string;
    color: string;
    material: string;
    stock: number;
    price: number;
  }

  interface CreateOrder {
    totalAmount: number;
    status?: OrderStatus;
    discount?: number;
    discountType?: DiscountType;
    paymentMethod: PaymentMethod;
    paymentStatus?: PaymentStatus;
    trackingNumber?: string;
    shippingAddress: string;
    shippingFee: number;
    items: CreateOrderItem[];
  }

  interface UpdateOrder extends Partial<Omit<CreateOrder, 'items'>> {}
}
