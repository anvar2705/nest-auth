import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class FindAllQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
    page?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
    per_page: number = 10;
}
