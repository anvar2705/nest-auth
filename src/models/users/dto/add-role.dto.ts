import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ example: 1, description: 'ID роли' })
  @IsNumber()
    roleId: number;
}
