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
  find(@Query('username') username: string) {
    return username ? this.userService.findByUsername(username) : this.userService.findAll();
  }

  @ApiOperation({ summary: 'Получение пользователя по id' })
  @ApiOkResponse({ type: User || '' })
  @Roles('ADMIN')
  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: string) {
    return this.userService.findById(Number(id));
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
  @Param('id', new ParseIntPipe()) id: string,
    @Body(new ExcludeIdPipe()) dto: UpdateUserDto,
  ) {
    return this.userService.update(Number(id), dto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiNoContentResponse()
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: string) {
    this.userService.delete(Number(id));
  }

  @ApiOperation({ summary: 'Добавление роли пользователю' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Patch(':id/role')
  addRole(@Param('id', new ParseIntPipe()) id: string, @Body() dto: AddRoleDto) {
    return this.userService.addRole(Number(id), dto);
  }

  @ApiOperation({ summary: 'Удаление роли пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Delete(':id/role')
  removeRole(@Param('id', new ParseIntPipe()) id: string, @Body() dto: AddRoleDto) {
    return this.userService.removeRole(Number(id), dto);
  }
}
