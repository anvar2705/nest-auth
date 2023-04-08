import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class FindAllQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
    page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
    per_page: number = 10;
}
