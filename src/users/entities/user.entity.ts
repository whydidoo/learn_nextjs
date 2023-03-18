import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { hash } from 'argon2';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @ObjectIdColumn()
  _id: string;

  @ApiProperty()
  @Column()
  email: string;

  @Column()
  password: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
