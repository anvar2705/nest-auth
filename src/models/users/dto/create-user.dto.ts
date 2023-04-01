import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'username', description: 'Ник пользователя' })
  @Length(3, 30)
    username: string;

  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @IsOptional()
  @IsEmail()
  @Length(3, 60)
    email: string;

  @ApiProperty({ example: 'abcd12345', description: 'Пароль' })
  @Length(8, 20)
    password: string;

  @ApiProperty({ example: [1, 2], description: 'Роли пользователя' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
    roles?: number[];
}
