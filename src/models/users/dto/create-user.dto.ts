import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'username', description: 'Ник пользователя' })
  @Length(3, 30, { message: 'длина ника должна быть не менее 3 и не более 30 символов' })
  username: string

  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @IsEmail({}, { message: 'некорректный email' })
  @Length(3, 60, { message: 'длина email должна быть не менее 3 и не более 30 символов' })
  @IsOptional()
  email: string

  @ApiProperty({ example: 'abcd12345', description: 'Пароль' })
  @Length(8, 20, { message: 'длина пароля должна быть не менее 8 и не более 20 символов' })
  @IsString({ message: 'должно быть строкой' })
  password: string
}
