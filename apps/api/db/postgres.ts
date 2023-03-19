import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export class ConfigServicePostgres {
  constructor(private env: Record<string, string | undefined>) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public getPort() {
    return this.getValue('POSTGRES_PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: Number(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [join(__dirname, '../src/**/**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
      ssl: this.isProduction(),
      extra: {
        charset: 'utf8',
      },
      uuidExtension: 'uuid-ossp',
    };
  }
}

export const dataSourceOptions = new ConfigServicePostgres(
  process.env,
).getTypeOrmConfig();

export default new DataSource(dataSourceOptions);
