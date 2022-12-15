import { DataSource, DataSourceOptions } from 'typeorm'

// TODO env
export const dataSourceOptions: DataSourceOptions = {
  name: 'nest-auth-connection',
  type: 'postgres',
  host: 'db', // if docker - "db", if local database - "localhost"
  port: 5432,
  username: 'postgres',
  password: 'root123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
