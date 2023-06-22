import { IsNotEmpty, IsString } from "class-validator";


export class GetUsersDto{
    @IsString()
    @IsNotEmpty()
    _id:string
}