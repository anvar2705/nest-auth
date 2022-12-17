import { registerAs } from '@nestjs/config'
import { DataSourceOptions } from 'typeorm'

export default registerAs(
  'database',
  (): DataSourceOptions => ({
    name: 'nest-auth-connection',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    synchronize: false,
  })
)
