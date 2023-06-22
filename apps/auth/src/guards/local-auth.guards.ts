import { AuthGuard } from "@nestjs/passport";
 //the string passed to the authGuard corresponds to the strategy
export class LocalAuthGuard extends AuthGuard('local'){}