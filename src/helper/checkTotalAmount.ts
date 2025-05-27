import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { DiscountType } from '@prismaclient/index';

type Item = {
  quantity: number;
  price: number;
  discount: number;
  discountType: DiscountType;
};

export const discount = (amount: number, discount?: number | null, discountType?: DiscountType | null) => {
  if (!discount || discount <= 0) {
    return amount;
  }

  if (!discountType) discountType = DiscountType.PERCENT;

  if (discountType === DiscountType.PERCENT) {
    if (discount > 100) {
      throw new BadRequestException('modules.order.discountCannotBeGreaterThan100');
    }
    const resultWithoutRound = (amount * (100 - discount)) / 100;
    return Math.round(resultWithoutRound / 1000) * 1000;
  }
  if (discountType === DiscountType.MINUS) {
    if (discount > amount) {
      throw new BadRequestException('modules.order.discountCannotBeGreaterThanAmount');
    }
    const resultWithoutRound = amount - discount;
    return Math.round(resultWithoutRound / 1000) * 1000;
  }
  return amount;
};

export const isValidTotalAmount = (totalAmount: number, items: Item[]) => {
  const total = items.reduce((acc, item) => {
    return acc + discount(item.quantity * item.price, item.discount, item.discountType);
  }, 0);
  return total === totalAmount;
};
