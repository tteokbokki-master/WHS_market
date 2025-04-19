import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  introduce?: string;

  @IsOptional()
  @IsDateString()
  banUntil?: string;
}
