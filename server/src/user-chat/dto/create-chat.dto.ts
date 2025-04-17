import { IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  receiverId: number;

  @IsNumber()
  productId: number;

  @IsString()
  message: string;
}
