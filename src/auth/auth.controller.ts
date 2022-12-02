import { Request, Controller, Post, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards'
import { Public } from './decorators'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateToken(req.user)
  }
}
