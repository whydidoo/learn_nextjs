import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserDto } from './dto/UserDto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  createUser({ email, password }: UserDto) {
    const user = new User();
    user.email = email;
    user.password = password;

    return this.userRepository.save(user);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOne({ email, password }: UserDto) {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await argon2.verify(user.password, password);

    if (isPasswordCorrect) {
      return user;
    }

    return null;
  }

  async getJwt(user: User) {
    return {
      accessToken: this.jwtService.sign({ email: user.email, sub: user._id }),
    };
  }
}
