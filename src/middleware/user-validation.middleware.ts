import { NestMiddleware, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from '../api/users/users.service';
import { secret } from '../config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserValidationMiddleware implements NestMiddleware {

  constructor(private readonly userService: UsersService) {}

  async use(req: Request, res: Response, next: () => void) {

    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Token Is Required');
    }

    try {

      const tokenHeader = authorization.slice(6);
      const token = await jwt.verify(tokenHeader, secret);

      const email = token.user.email;
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Invalid User');
      }

      next();

    } catch (error) {

      throw new UnauthorizedException('Impossible validate user');

    }

  }

}
