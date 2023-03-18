import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

import { BooksModule } from './books/books.module';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';

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
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BooksModule,
    UsersModule,
  ],
})
export class AppModule {}
