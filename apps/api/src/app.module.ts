import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

import { BooksModule } from './books/books.module';
import { dataSourceOptions } from 'api/db/postgres';
import { UsersModule } from './users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from 'api/environment';
import { redisStore } from 'cache-manager-redis-store';

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
    CacheModule.register({
      ttl: 60000,
      max: 10,
      isGlobal: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      store: async () => {
        const store = await redisStore({
          socket: {
            host: env.REDIS_URL,
            port: Number(env.REDIS_PORT),
          },
        });
        return store;
      },
    }),
    BooksModule,
    UsersModule,
  ],
})
export class AppModule {}
