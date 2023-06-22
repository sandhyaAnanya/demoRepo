import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common';
import { CreatePaymentChargeDto } from './dto/create-payments-charge.dto';
@Injectable()
export class PaymentService {
  constructor(private readonly configService: ConfigService , @Inject(NOTIFICATION_SERVICE) private readonly notifyService:ClientProxy) { }
  //Initialize the Stripe with the secret key and the apiVersion
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: "2022-11-15",
    }
  );
  async createCharge({card,amount,email}:CreatePaymentChargeDto) {    
    console.log("card,amount,email",card,amount,email);
    
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card', 
      card,
    })
    console.log("paymentMethod",paymentMethod);
    
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount*100,
      currency: 'INR',
      payment_method_types: ['card'],
      confirm: true 
    })
    this.notifyService.emit('notify-email',{email})
    return paymentIntent
  }
}
