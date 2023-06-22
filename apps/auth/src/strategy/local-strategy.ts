import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "../users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local'){
    //get access to the userService
    constructor(private readonly userService:UsersService){
        //usernameField allows us to specify different fields to check the user
        super({usernameField:'email'});
    }

    //this function will be called by the extended PassportStrategy when we check to see whether the user is valid or not
    async validate(email:string,password:string){
        try{
            const data = this.userService.verifyUser(email,password)
             //whatever returns from here will be automatically added to the request object
             if (!data) {
                throw new UnauthorizedException();
              }
            return data
        }catch(err){
            throw err
        }
    }
}   