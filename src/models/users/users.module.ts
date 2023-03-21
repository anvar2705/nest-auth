import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// eslint-disable-next-line import/no-cycle
import { AuthModule } from '../../auth/auth.module';
import { RolesModule } from '../roles/roles.module';

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
