import { StatusCodes } from 'http-status-codes';
import { createSecretKey } from 'node:crypto';
import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from 'jose';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(private readonly JSTSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction) {
    const authorizationHeader = req?.headers?.authorization?.split(' ');

    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const {payload} = await jwtVerify(token, createSecretKey(this.JSTSecret, 'utf-8'));
      req.user = {email: payload.email as string, id: payload.id as string};
      return next();
    } catch {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware')
      );
    }
  }
}
