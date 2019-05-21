import { NestMiddleware, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { secret } from '../config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: () => void) {

    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Token Is Required');
    }

    try {

      const tokenHeader = authorization.slice(6);
      const token = await jwt.verify(tokenHeader, secret);
      next();

    } catch (error) {

      throw new UnauthorizedException('Invalid Token');

    }

  }

}
