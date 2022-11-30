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
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.userService.findOne(Number(id))
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    this.userService.delete(Number(id))
  }

  @Patch(':id')
  update(@Param('id', new ParseIntPipe()) id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(Number(id), dto)
  }
}
