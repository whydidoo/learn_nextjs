import { Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getBooks() {
    return 'get all';
  }

  @Post()
  createBook() {
    return 'all books are returned';
  }
}
