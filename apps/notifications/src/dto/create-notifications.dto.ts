import { IsEmail } from "class-validator";

export class CreateNotificationsDto{
    @IsEmail()
    email:string
}