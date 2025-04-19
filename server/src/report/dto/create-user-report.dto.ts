import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserReportDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  reportedUserId: number;
}
