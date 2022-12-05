import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entity/user.entity'
import { RolesModule } from '../roles/roles.module'

@Module({
  imports: [TypeOrmModule.forFeature([User], 'nest-auth-connection'), RolesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
