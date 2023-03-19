import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_URL,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    QueueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
