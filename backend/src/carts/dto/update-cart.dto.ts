import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateCartDto {
  @IsNumber()
  @IsNotEmpty()
  cart_id: number;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  engraving_checked: boolean;

  @IsString()
  @IsOptional()
  engraving_content?: string;
}
