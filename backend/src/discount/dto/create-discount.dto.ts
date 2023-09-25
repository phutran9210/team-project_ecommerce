import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';

export class DiscountForm {
  @IsString()
  @IsNotEmpty()
  code_discount: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  discount_description?: string;

  @IsNotEmpty()
  @IsNumber()
  discount_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  use_limit?: number;

  @IsString()
  @IsNotEmpty()
  discount_scope: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  start_date?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  end_date?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @IsString({ each: true })
  selectedProductValues?: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @IsString({ each: true })
  selectedProductCategory?: string[];
}
