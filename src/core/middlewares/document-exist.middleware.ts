import { MiddlewareInterface } from './middleware.interface.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export default class DocumentExistMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: DocumentExistsInterface,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params}: Request, _res: Response, next: NextFunction) {
    const documentId = params[this.paramName];
    if (!await this.service.exist(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `The document with ${this.paramName} ${documentId} was not found.`,
        `[${this.entityName}]`
      );
    }

    next();
  }
}
