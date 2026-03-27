import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';

class TicketDto {
  @IsUUID()
  film: string;

  @IsUUID()
  session: string;

  @IsDateString()
  daytime: string;

  @IsString()
  day: string;

  @IsString()
  time: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  items: TicketDto[];
}
