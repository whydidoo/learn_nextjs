import { InjectQueue } from '@nestjs/bullmq';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Queue } from 'bullmq';

@Controller()
export class QueueController {
  constructor(@InjectQueue('books') private readonly booksQueue: Queue) {}
  @EventPattern('create_book')
  async createBook(input: any) {
    try {
      await this.booksQueue.add('createBook', input);
      return true;
    } catch {
      return false;
    }
  }
}
