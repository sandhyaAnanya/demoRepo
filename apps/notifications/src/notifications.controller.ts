import { Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateNotificationsDto } from './dto/create-notifications.dto';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  
  @EventPattern('notify-email')
  @UsePipes(new ValidationPipe())
  async emailNotify(@Payload() data:CreateNotificationsDto){
    console.log("data notification", data);
     this.notificationsService.emailNotify(data);
  }
  
 
}
