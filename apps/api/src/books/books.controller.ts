import {
  Body,
  CacheInterceptor,
  CacheKey,
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiResponse } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { AllowUnauthorizedRequest } from 'api/src/decorators';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/CreateBookDto';
import { Book } from './entities/book.entity';
import { Cache } from 'cache-manager';

const GET_BOOKS_CACHE_KEY = 'GET_BOOKS_CACHE_KEY';
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    @Inject('WORKER') private readonly workerClient: ClientProxy,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey(GET_BOOKS_CACHE_KEY)
  @AllowUnauthorizedRequest()
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
    const status = await firstValueFrom<boolean>(
      this.workerClient.send('create_book', bookDTO),
    );

    // it is for testing of response from worker
    if (!status) {
      throw new InternalServerErrorException();
    }

    this.clearCache();
  }

  async clearCache() {
    await this.cacheManager.del(GET_BOOKS_CACHE_KEY);
  }
}
