import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsIn,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
export class CategoryDto {
  @IsString()
  @Length(1, 12)
  category: string;
}

export class ProductIdDto {
  @IsString()
  @Length(1, 50)
  productId: string;
}
export class EditProductIdDto {
  @IsString()
  @Length(1, 50)
  product_id: string;
}

// properties-value.dto.ts

export class PropertiesValueDTO {
  @IsString()
  @IsIn(['product_type', 'engraving'])
  properties: string;

  // @Transform((value) =>
  //   typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value,
  // )
  @IsIn(['new', 'feature', 'trending', 0, 1, '0', '1'])
  valueOfProperties: string | number;
}

export class PayloadSearch {
  @IsString()
  @Length(1, 100)
  payload: string;
}

//payload getAllEditProduct
export class PayloadEditProduct {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;
}
