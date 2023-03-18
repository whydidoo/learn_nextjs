import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Queue } from 'bullmq';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/CreateBookDto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    @InjectQueue('books') private readonly booksQueue: Queue,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [Book],
  })
  getBooks() {
    this.booksQueue.add('create', { test: 'test' });
    return this.booksService.getAllBooks();
  }

  @Post()
  @ApiResponse({
    status: 201,
  })
  createBook(@Body() bookDTO: CreateBookDto) {
    this.booksQueue.add('createBook', bookDTO);
  }
}
