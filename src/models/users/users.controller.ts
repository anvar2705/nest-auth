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
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { ApiResponse } from '@nestjs/swagger'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entity/user.entity'
import { CreateRoleDto } from '../roles/dto/create-role.dto'
import { Roles } from 'auth/decorators'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiOkResponse({ type: [User] || User || '' })
  @Roles('ADMIN')
  @Get()
  find(@Query('username') username: string) {
    return username ? this.userService.findByUsername(username) : this.userService.findAll()
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiCreatedResponse({ type: User })
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(Number(id), dto)
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiNoContentResponse()
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: string) {
    this.userService.delete(Number(id))
  }

  @ApiOperation({ summary: 'Добавление роли пользователю' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Patch(':id/role')
  addRole(@Param('id', new ParseIntPipe()) id: string, @Body() dto: CreateRoleDto) {
    return this.userService.addRole(Number(id), dto)
  }

  @ApiOperation({ summary: 'Удаление роли пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Roles('ADMIN')
  @Delete(':id/role')
  removeRole(@Param('id', new ParseIntPipe()) id: string, @Body() dto: CreateRoleDto) {
    return this.userService.removeRole(Number(id), dto)
  }
}
