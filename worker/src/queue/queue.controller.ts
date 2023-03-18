import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class QueueController {
  @EventPattern('create_book')
  async createBook() {
    return 'ok';
  }
}
