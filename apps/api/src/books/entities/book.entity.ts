import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('books')
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @ObjectIdColumn()
  _id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  author: string;

  @Column()
  @ApiProperty()
  description: string;
}
