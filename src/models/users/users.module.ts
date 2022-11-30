import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './entity/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([User], 'nest-auth-connection')],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
