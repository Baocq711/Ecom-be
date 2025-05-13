import { discount } from '@/helper/checkTotalAmount';
import env from '@/shared/config/env/env';
import { BadRequestException } from '@/shared/exception/bad-request.exception';
import { NotFoundException } from '@/shared/exception/not-found.exception';
import { OrderRepository } from '@/shared/repositories/order.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { OrderStatus, PaymentStatus } from '@prismaclient/index';

@Injectable()
export class PaymentService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async sepayWebhook(sepayWebhookRequest: SepayWebhookRequest) {
    const { content, transferAmount, transferType } = sepayWebhookRequest;
    if (transferType === 'out') {
      throw new BadRequestException();
    }

    const paymentCode = Number(content.split(env.PREFIX_PAYMENT_CODE)[1]);

    if (isNaN(paymentCode)) {
      throw new NotFoundException();
    }

    const order = await this.orderRepository.findOneByPaymentCode(paymentCode);

    if (!order) {
      throw new NotFoundException();
    }

    if (transferAmount !== discount(order.totalAmount, order.discount, order.discountType)) {
      throw new ConflictException();
    }

    await this.orderRepository.update(order.id, {
      status: OrderStatus.PROCESSING,
      paymentStatus: PaymentStatus.PAID,
    });
  }
}
