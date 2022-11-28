import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, { message: 'некорректный email' })
  email: string

  @Length(8, 20, { message: 'длина пароля должна быть не менее 8 и не более 20 символов' })
  @IsString({ message: 'должно быть строкой' })
  password: string
}
