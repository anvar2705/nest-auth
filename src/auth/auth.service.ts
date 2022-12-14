import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

import { UsersService } from '../models/users/users.service'
import { CreateUserDto } from '../models/users/dto/create-user.dto'
import { User } from '../models/users/entity/user.entity'

// TODO Почему работает старый токен для удаленного пользователя ?
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService._getUserWithPassword(username)
    const passwordEquals = await bcrypt.compare(password, user.password)

    if (user && passwordEquals) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async generateToken(user: User) {
    const payload = { sub: user.id, username: user.username, email: user.email, roles: user.roles }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.usersService.create(userDto)
    return this.generateToken(user)
  }
}
