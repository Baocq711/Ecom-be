import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Public } from '@/shared/decorator/public.decorator';
import { ApiKeyGuard } from '@/shared/guard/api-key.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('sepay/webhook')
  @Public()
  @UseGuards(ApiKeyGuard)
  async sepayWebhook(@Body() body: SepayWebhookRequest) {
    return this.paymentService.sepayWebhook(body);
  }
}
