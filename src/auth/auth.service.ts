import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { User } from '../models/users/entity/user.entity';
import { UsersService } from '../models/users/users.service';

// TODO Почему работает старый токен для удаленного пользователя ?
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService._getUserWithPassword(username);
    const passwordEquals = await bcrypt.compare(password, user.password);

    if (user && passwordEquals) {
      delete user.password;
      return user;
    }
    return null;
  }

  async generateToken(user: User) {
    const payload = {
      sub: user.id, username: user.username, email: user.email, roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registration(userDto: CreateUserDto) {
    const { roles, ...userDtoWithoutRoles } = userDto;
    const user = await this.usersService.create(userDtoWithoutRoles);
    return this.generateToken(user);
  }

  async getUserInfo(user: { id: number, username: string }) {
    return this.usersService.findById(user.id);
  }
}
