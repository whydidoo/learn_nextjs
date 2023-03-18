import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { AllowUnauthorizedRequest } from 'src/decorators';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/CreateBookDto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    @Inject('WORKER') private readonly workerClient: ClientProxy,
  ) {}

  @ApiResponse({
    status: 200,
    type: [Book],
  })
  @Get()
  getBooks() {
    return this.booksService.getAllBooks();
  }

  @AllowUnauthorizedRequest()
  @ApiResponse({
    status: 201,
    type: Book,
  })
  @Post()
  async createBook(@Body() bookDTO: CreateBookDto) {
    const response = await firstValueFrom(
      this.workerClient.send('create_book', 'started creating book'),
    );

    // it is for testing of response from worker
    if (response !== 'ok') {
      throw new InternalServerErrorException();
    }

    return this.booksService.createBook(bookDTO);
  }
}
