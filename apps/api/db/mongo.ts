import { env } from 'api/environment';
import { join } from 'path';
import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  url: env.DATABASE_URL,
  entities: [join(__dirname, '../src/**/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  useNewUrlParser: true,
  logging: true,
  useUnifiedTopology: true,
  ssl: false,
  username: 'booksuser',
  password: 'bookspassword',
  database: 'books',
  synchronize: true,
};

export default new DataSource(dataSourceOptions);
