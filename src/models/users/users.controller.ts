import { Controller, Get, ParseIntPipe, Param, Post, Body, HttpCode, Delete } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return this.userService.findOne(Number(id))
  }

  @Post(':id')
  create(@Param('id', new ParseIntPipe()) id: string, @Body() dto: CreateUserDto) {
    return this.userService.create(Number(id), dto)
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.userService.remove(Number(id))
  }
}
