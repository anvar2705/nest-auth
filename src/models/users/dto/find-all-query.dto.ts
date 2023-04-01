import { IsInt, IsOptional } from 'class-validator';

export class FindAllQueryDto {
  @IsOptional()
    username: string;

  @IsOptional()
  @IsInt()
    page: number = 1;

  @IsOptional()
  @IsInt()
    per_page: number = 10;
}
