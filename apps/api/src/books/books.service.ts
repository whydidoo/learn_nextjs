import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/CreateBookDto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.find({});
  }

  async createBook({ author, title, description }: CreateBookDto) {
    const book = new Book();
    book.author = author;
    book.title = title;
    book.description = description;

    return this.booksRepository.save(book);
  }
}
