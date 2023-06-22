import { Injectable } from '@nestjs/common';
import { CreateNotificationsDto } from './dto/create-notifications.dto';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'

@Injectable()
export class NotificationsService {
constructor(private readonly configService:ConfigService){}
private readonly transporter = nodemailer.createTransport({
   service:'gmail',
   //this is an authentication object
   auth: {
      //if we are not using any type here it takes default authentiction
      user:this.configService.get('SMTP_USER'),
      pass: this.configService.get('SMTP_PASSWORD')
  },
  /*  auth:{
      // OAuth2 is a Open Authentication and for that we have to give below options,
      // OAuth2 is a standard designed to allow a website or application to access resources,
      //hosted by other web apps on behalf of a user
      type:'OAuth2',
      user:this.configService.get('SMTP_USER'),
      clientId:this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret:this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken:this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN')
   } */
})
async emailNotify({email}:CreateNotificationsDto){
   console.log("email....................",email);
   await this.transporter.sendMail({
      from:this.configService.get('SMTP_USER'),
      to:email,
      subject:'reservation Booking',
      text:'reservation done successfully'
   })
}
}
