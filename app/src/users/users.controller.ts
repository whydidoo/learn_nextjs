import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AllowUnauthorizedRequest } from 'src/decorators';
import { UserDto } from './dto/UserDto';
import { User } from './entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWT_RESPONSE } from './types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @AllowUnauthorizedRequest()
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: JWT_RESPONSE,
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async singIn(@Request() req) {
    return this.usersService.getJwt(req.user);
  }

  @AllowUnauthorizedRequest()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: User,
  })
  @Post('sign-up')
  async singUp(@Body() userDto: UserDto) {
    const user = await this.usersService.findByEmail(userDto.email);

    if (user) {
      throw new BadRequestException();
    }

    const createdUser = await this.usersService.createUser(userDto);
    delete createdUser.password;
    return createdUser;
  }
}
