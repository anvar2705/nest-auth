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
} from '@nestjs/common';
import {
  ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags,
} from '@nestjs/swagger';

import { Roles } from 'auth/decorators';
import { ExcludeIdPipe } from 'common/pipes';

import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entity/role.entity';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Получение ролей' })
  @ApiOkResponse({ type: [Role] })
  @Roles('ADMIN')
  @Get()
  find() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiOkResponse({ type: Role })
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @ApiOperation({ summary: 'Обновление роли' })
  @ApiOkResponse({ type: Role })
  @Roles('ADMIN')
  @Patch(':id')
  update(
  @Param('id', new ParseIntPipe()) id: number,
    @Body(new ExcludeIdPipe()) dto: CreateRoleDto,
  ) {
    return this.roleService.update(id, dto);
  }

  @ApiOperation({ summary: 'Удаление роли' })
  @ApiNoContentResponse()
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.roleService.delete(id);
  }
}
