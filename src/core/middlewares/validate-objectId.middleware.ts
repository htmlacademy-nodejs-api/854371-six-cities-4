import { MiddlewareInterface } from './middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class ValidateObjectIdMiddleware implements MiddlewareInterface {
  constructor(private mongodbIdParam: string) {}

  execute({params}: Request, _res: Response, next: NextFunction) {
    const id = params[this.mongodbIdParam];
    if (mongoose.Types.ObjectId.isValid(id)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `Your identifier ${id} does not match the format of a MongoDB ID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
