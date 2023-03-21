import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  @Length(3, 30, { message: 'название должно быть не менее 3 и не более 30 символов' })
    name: string;
}
