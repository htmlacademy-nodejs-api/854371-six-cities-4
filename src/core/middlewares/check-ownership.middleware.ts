import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RentalServiceInterface } from '../../modules/rental/rental-service.interface.js';
import HttpError from '../errors/http-error.js';
import { MiddlewareInterface } from './middleware.interface.js';

export default class CheckOwnershipMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: RentalServiceInterface,
    private readonly paramName: string
  ) {}

  public async execute({params, user}: Request, _res: Response, next: NextFunction) {
    if (!user.id) {
      return next();
    }

    const documentId = params[this.paramName];
    const entity = await this.service.findById(documentId);

    if (entity?.userId?.id !== user.id) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `The rental offer with ID ${documentId} does not belong to the user`,
        'Rental Service'
      );
    }

    next();
  }
}
