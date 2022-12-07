import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entity/user.entity'
import { RolesModule } from '../roles/roles.module'
import { AuthModule } from '../../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'nest-auth-connection'),
    RolesModule,
    forwardRef(() => AuthModule),
    JwtModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
