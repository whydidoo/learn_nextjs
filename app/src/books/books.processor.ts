import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/CreateBookDto';

@Processor('books')
export class BooksProcessor extends WorkerHost {
  constructor(private readonly booksService: BooksService) {
    super();
  }
  async process(job: Job<CreateBookDto, any, string>): Promise<any> {
    if (job.name === 'createBook') {
      this.booksService.createBook(job.data);
    }
  }
}
