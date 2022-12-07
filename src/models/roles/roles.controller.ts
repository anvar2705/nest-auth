import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './entity/role.entity'
import { Roles } from '../../auth/decorators'

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Получение ролей' })
  @ApiOkResponse({ type: [Role] })
  @Roles('ADMIN')
  @Get()
  find() {
    return this.roleService.findAll()
  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiOkResponse({ type: Role })
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @ApiOperation({ summary: 'Обновление роли' })
  @ApiOkResponse({ type: Role })
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: string, @Body() dto: CreateRoleDto) {
    return this.roleService.update(Number(id), dto)
  }

  @ApiOperation({ summary: 'Удаление роли' })
  @ApiNoContentResponse()
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: string) {
    return this.roleService.delete(Number(id))
  }
}
