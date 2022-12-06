import { Controller, Get } from '@nestjs/common'

import { UsersService } from './models/users/users.service'
import { RolesService } from './models/roles/roles.service'
import { Public } from './auth/decorators'

@Controller('app')
export class AppController {
  constructor(private userServise: UsersService, private roleService: RolesService) {}

  @Public()
  @Get('start')
  async start() {
    await this.roleService.create({ name: 'USER' })
    await this.roleService.create({ name: 'ADMIN' })

    await this.userServise.create({
      username: 'anvar2705',
      email: 'anvar978@yandex.ru',
      password: '123456789',
      roles: ['ADMIN'],
    })

    await this.userServise.create({
      username: 'john',
      email: 'john@user.com',
      password: 'qwerty123',
      roles: [],
    })

    await this.userServise.create({
      username: 'Kevin',
      email: 'KeViN@mail.ru',
      password: 'qazwsxedc123',
      roles: [],
    })
  }
}
