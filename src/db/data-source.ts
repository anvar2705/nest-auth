import { DataSource, DataSourceOptions } from 'typeorm'

// TODO env
export const dataSourceOptions: DataSourceOptions = {
  name: 'nest-auth-connection',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root123',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false, // !!! no true in production or with migrations
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
