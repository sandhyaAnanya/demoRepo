import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "../interfaces/token-payload.interfaces";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
        //get access to configService and userService
        configService: ConfigService,
        private readonly userService: UsersService
    ) {
        // the jwtFromRequest property is to specify where on the request object 'jwt' lives, in our jwt is a cookie itself
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: any) =>
                // the request which comes from the rpc will not be in the cookies object,it will be attched to the request directly
                // to the request object so we have to use request?.Authentication
                    request?.cookies?.Authentication || request?.Authentication

            ]),
            //secret key to decode the cookie which is the same secret key which we used to generate the jwt
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

 //this function will be called by the extended PassportStrategy
    async validate({ userId }: TokenPayload) {
        try{
            const user = await this.userService.getUser({ _id: userId })
            if (!user) {
                throw new UnauthorizedException();
              }
            return user
        }catch(err){
            console.log("-----------------------jwt-startegy",err);
            throw new ExceptionsHandler(err)
        }
    }
}