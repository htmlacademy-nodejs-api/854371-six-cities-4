import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export default class PrivateRouteMiddleware implements MiddlewareInterface {
  public async execute({user}: Request, _res: Response, next: NextFunction) {
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized — Private route, authentication required'
      );
    }

    next();
  }
}
