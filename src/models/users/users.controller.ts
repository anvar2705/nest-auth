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
  UseGuards,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { ApiResponse } from '@nestjs/swagger'
import { UpdateResult } from 'typeorm'

import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entity/user.entity'
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiOkResponse({ type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  find(@Query('username') username: string) {
    return username ? this.userService.findByUsername(username) : this.userService.findAll()
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiCreatedResponse({ type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    this.userService.delete(Number(id))
  }

  @ApiOperation({ summary: 'Обновление пользователя' })
  @ApiResponse({ status: 200, type: UpdateResult })
  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(Number(id), dto)
  }
}
