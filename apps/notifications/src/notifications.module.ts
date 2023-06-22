import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi'
import { LoggerModule } from '@app/common';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: joi.object({
           PORT: joi.number().required(),
           SMTP_USER: joi.string().required(),
           GOOGLE_OAUTH_CLIENT_ID: joi.string().required(),
           GOOGLE_OAUTH_CLIENT_SECRET : joi.string().required(),
           GOOGLE_OAUTH_REFRESH_TOKEN: joi.string().required(),
           SMTP_PASSWORD:joi.string().required()
        })
      }),
      //without importing the logger module, we can't see the logs of this service in the console
      LoggerModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
