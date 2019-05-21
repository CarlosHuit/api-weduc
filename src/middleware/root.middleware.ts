import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

export class RootMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: () => void) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token Root Is Required');
    }

    if (authHeader !== 'mX179zAzA') {
      throw new UnauthorizedException('Invalid Token Root');
    }

    next();

  }

}
