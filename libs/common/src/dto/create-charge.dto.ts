import { IsDefined, IsNotEmptyObject , ValidateNested, IsNumber, IsNotEmpty} from "class-validator";
import { CreateCardDto } from "./card.dto";
import { Type } from "class-transformer";

export class CreateChargeDto{
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateCardDto)
    card: CreateCardDto;

    @IsNumber()
    amount: number;
}