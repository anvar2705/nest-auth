import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  Post,
  Body,
  HttpCode,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { Roles } from 'auth/decorators';
import { ExcludeIdPipe } from 'common/pipes';

import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiOkResponse({ type: [User] || User || '' })
  @Roles('ADMIN')
  @Get()
  find(@Query() query: FindAllQueryDto) {
    return query.username
      ? this.userService.findByUsername(query.username)
      : this.userService.findAll(query.page, query.per_page);
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiOkResponse({ type: User || '' })
  @Roles('ADMIN')
  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiCreatedResponse({ type: User })
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Patch(':id')
  update(
  @Param('id', new ParseIntPipe()) id: number,
    @Body(new ExcludeIdPipe()) dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiNoContentResponse()
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Добавление роли пользователю' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Patch(':id/role')
  addRole(@Param('id', new ParseIntPipe()) id: number, @Body() dto: AddRoleDto) {
    return this.userService.addRole(id, dto);
  }

  @ApiOperation({ summary: 'Удаление роли пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Delete(':id/role')
  removeRole(@Param('id', new ParseIntPipe()) id: number, @Body() dto: AddRoleDto) {
    return this.userService.removeRole(id, dto);
  }
}
