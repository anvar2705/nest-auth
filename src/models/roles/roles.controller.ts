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

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Получение ролей' })
  @ApiOkResponse({ type: [Role] })
  @Get()
  find() {
    return this.roleService.findAll()
  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiOkResponse({ type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @ApiOperation({ summary: 'Обновление роли' })
  @ApiOkResponse({ type: Role })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: string, @Body() dto: CreateRoleDto) {
    return this.roleService.update(Number(id), dto)
  }

  @ApiOperation({ summary: 'Удаление роли' })
  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: string) {
    return this.roleService.delete(Number(id))
  }
}
