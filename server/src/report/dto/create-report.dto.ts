import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  reportedUserId: number;
}
