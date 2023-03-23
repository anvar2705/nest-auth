import {
  Request,
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'models/users/dto/create-user.dto';
import { User } from 'models/users/entity/user.entity';

import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LocalAuthGuard } from './guards';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Логин' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user);
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @Public()
  @Post('registration')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Получение информации о пользователе' })
  @ApiResponse({ status: 200, type: User })
  @Get('info')
  async getUserInfo(@Request() req) {
    return this.authService.getUserInfo(req.user);
  }
}
