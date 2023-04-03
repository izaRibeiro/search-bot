import { IsNotEmpty } from "@nestjs/class-validator";
import { IsDateString } from "class-validator";

export class RequestDto {
    @IsNotEmpty()
    @IsDateString()
    checkin: string;

    @IsNotEmpty()
    @IsDateString()
    checkout: string;
  }