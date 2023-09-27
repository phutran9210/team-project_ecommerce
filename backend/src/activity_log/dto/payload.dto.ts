// pagination.dto.ts
import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(0)
  page: number;

  @IsNotEmpty()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  @Max(100)
  rowsPerPage: number;
}
