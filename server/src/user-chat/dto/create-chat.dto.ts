import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  @Type(() => Number)
  receiverId: number;

  @IsNumber()
  @Type(() => Number)
  productId: number;

  @IsString()
  message: string;
}
