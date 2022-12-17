import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { getEnvPath } from 'common/helpers/env.helper'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard, RolesGuard } from './auth/guards'
import { UsersModule, RolesModule } from './models'
import dbConfiguration from './db/data-source.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(`${__dirname}/common/envs`),
      isGlobal: true,
      load: [dbConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'nest-auth-connection',
      useFactory: async (configService: ConfigService) => configService.get('database'),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
