import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AUTH_SERVICE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { Observable, catchError, map, of, tap } from "rxjs";
import { UserDto } from "../dto";

@Injectable()
export class JwtAuthGaurd implements CanActivate {
    private readonly logger = new Logger(JwtAuthGaurd.name);
    constructor(
        // we are injecting the authservice as a client proxy 
        @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy
    ) { }
    //The code is a function that takes in an observable and returns the result of the observable.
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
            console.log("jwt", jwt);
            if (!jwt) {
                return false
            }
            console.log("commom library jwt------------------------------",jwt);
            
            const data = this.authClient.send<UserDto>('Authenticate',
                {
                    Authentication: jwt
                }
            )
            data.forEach((data)=>{
              console.log("foreach data",data);
              
            })
            //The code above uses a pipe to pass in data, then uses a tap to output the result of the data.
            const newData = data.pipe(
                tap((res) => {
                    console.log("res--------------------------->",res);
                    console.log("observable----------------------------->>>>>",of(false));
                    context.switchToHttp().getRequest().user = res
                }),
                map(() => true),
                catchError((err) => {
                    this.logger.error(err);
                    console.log("---------- common library err-------------",err);
                    return of(false);
                  }),
            )    
           return newData
        } catch (err) {
            throw new UnauthorizedException(err)
        }
    }
}