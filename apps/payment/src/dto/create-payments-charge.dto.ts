import { CreateChargeDto } from "@app/common";
import { IsEmail } from "class-validator";

export class CreatePaymentChargeDto extends CreateChargeDto{
    
  @IsEmail()
  email:string

}