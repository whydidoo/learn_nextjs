import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BullModule } from '@nestjs/bullmq';
import { BooksProcessor } from './books.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    BullModule.registerQueue({
      name: 'books',
    }),
  ],
  providers: [BooksService, BooksProcessor],
  controllers: [BooksController],
})
export class BooksModule {}
