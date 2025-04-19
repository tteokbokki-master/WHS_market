import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class TransferDto {
  @Type(() => Number)
  @IsInt()
  toUserId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  amount: number;
}
