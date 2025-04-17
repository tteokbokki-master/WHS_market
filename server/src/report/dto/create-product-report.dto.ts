import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductReportDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
