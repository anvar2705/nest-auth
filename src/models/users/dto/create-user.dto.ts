import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Email' })
  @IsEmail({}, { message: 'некорректный email' })
  email: string

  @ApiProperty({ example: 'abcd12345', description: 'Пароль' })
  @Length(8, 20, { message: 'длина пароля должна быть не менее 8 и не более 20 символов' })
  @IsString({ message: 'должно быть строкой' })
  password: string
}
