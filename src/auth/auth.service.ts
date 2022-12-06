import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../models/users/users.service'
import { CreateUserDto } from '../models/users/dto/create-user.dto'
import { User } from '../models/users/entity/user.entity'

// TODO если база пустая, то почему-то работает прежний токен для удаленного пользователя
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findByUsername(username)
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async generateToken(user: User) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto)
    return this.generateToken(user)
  }
}
