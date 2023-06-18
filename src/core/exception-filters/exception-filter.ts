import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register ExceptionFilter');
  }

  catch(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({error: error.message});
  }
}
