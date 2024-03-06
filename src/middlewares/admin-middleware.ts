// apikey.middleware.ts
import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.X_API_KEY) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    next();
  }
}
