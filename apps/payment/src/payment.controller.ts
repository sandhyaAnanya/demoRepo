import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePaymentChargeDto } from './dto/create-payments-charge.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  async createCharge(
    @Payload() data: CreatePaymentChargeDto
  ) {
    console.log("payment data", data);
    return this.paymentService.createCharge(data)
  }
}
