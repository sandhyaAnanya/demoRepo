import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const configService = app.get(ConfigService)
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      //host is '0.0.0.0' to bind to all the IP adress on the machine
      host: '0.0.0.0',
      port: configService.get('PORT')
    }
  })
  app.useLogger(app.get(Logger))
  // to start up the tcp microservice
  await app.startAllMicroservices();
}
bootstrap();
 