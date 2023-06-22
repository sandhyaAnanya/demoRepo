import { Response } from 'express';
import { AuthService } from './auth.service';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { CurrentUser } from '../../../libs/common/src/decorators/currentUser-decorator';
import { UserDocument } from './users/model/users.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGaurd } from './guards/jwt-auth.guard';



@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //to execute a given guard 
  //we are using localAuthGuard here to attach the regitered user details here using @CurrentUser decorator
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    //pulling the user from the request body,@CurrentUser() this  defined in the common library
    @CurrentUser() user: UserDocument,
    //we are using response object here and a passthrough property as we are setting just as cookies on the response object
    //instead of passing jwt as a plain text as jwt cookies are more secure
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }

  @UseGuards(JwtAuthGaurd)
  //this helps us to accept incoming rpc calls on a chosen transport layer
  @MessagePattern('Authenticate') 
  // in this authentication method we need to just run through the exsisting jwtAuthGaurd and check the incoming jwt
  async authenticate(
    @Payload() data:any
  ){    
    console.log("data.user",data.user);
    return data.user;  
  }

}
