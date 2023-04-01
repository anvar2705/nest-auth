import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  @Length(3, 30)
    name: string;
}
