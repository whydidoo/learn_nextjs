import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStratergy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data: string = request?.cookies[process.env.JWT_COOKIE_NAME];

          if (!data) {
            return null;
          }
          return data;
        },
      ]),
    });
  }

  async validate(payload) {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
