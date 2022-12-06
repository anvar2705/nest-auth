import { Request, Controller, Post, UseGuards, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards'
import { Public } from './decorators'
import { CreateUserDto } from '../models/users/dto/create-user.dto'

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user)
  }

  @Public()
  @Post('registration')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto)
  }
}
