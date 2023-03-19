import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

import { BooksModule } from './books/books.module';
import { dataSourceOptions } from 'db/postgres';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from 'environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return { ...dataSourceOptions, autoLoadEntities: true };
      },
    }),
    BullModule.forRoot({
      connection: {
        host: env.REDIS_URL,
        port: Number(env.REDIS_PORT),
      },
    }),
    ClientsModule.register([
      {
        name: 'WORKER',
        transport: Transport.REDIS,
        options: {
          host: env.REDIS_URL,
          port: Number(env.REDIS_PORT),
        },
      },
    ]),
    BooksModule,
    UsersModule,
  ],
})
export class AppModule {}
