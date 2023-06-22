import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser'
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  //pull the configService to make use of it to get env 
  const configService = app.get(ConfigService);
  // to connect to the microservice
  app.connectMicroservice({
    transport:Transport.TCP,
    options:{
      host: '0.0.0.0',
      port: configService.get('TCP_PORT')
    }
    
  })
  //it is  a middleware which parses cookies attached to the client request object
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  app.useLogger(app.get(Logger))
  // to start the microservice
  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));

}
bootstrap();
