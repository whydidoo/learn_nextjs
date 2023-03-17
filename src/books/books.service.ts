import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: MongoRepository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.find({});
  }
}
