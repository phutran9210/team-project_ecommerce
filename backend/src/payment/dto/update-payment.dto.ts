import { IsInt, Min, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetOrderQuery {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  order_id?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsString()
  tagValue?: string;
}
