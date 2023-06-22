import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express'
import { UserDocument } from './users/model/users.schema';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interfaces';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly jwtService: JwtService,
  ) { }
  async login(user: UserDocument, response: Response) {
    try {
      const tokenPayload: TokenPayload = {
        //to get the id on the token
        userId: user._id.toHexString(),
      };
      //generating the token
      const token = this.jwtService.sign(tokenPayload);
      //setting the cookie on to the response payload
      response.cookie('Authentication', token, {
        httpOnly: true,
      });
      return {
        status:200,
        message: 'Login Successful',
        data: user
      };
    } catch (err) {
      console.log("---------------------------------errr",err);
      throw new BadRequestException(err)
    }
  }
}
