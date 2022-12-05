import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { Role } from './entity/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Role], 'nest-auth-connection')],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
