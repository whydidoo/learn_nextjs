import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';

@Module({
  controllers: [QueueController],
  imports: [],
})
export class QueueModule {}
