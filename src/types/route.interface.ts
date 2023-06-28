import { HttpMethod } from './http-method.js';
import { NextFunction, Request } from 'express';
import { Response } from 'express';
import { MiddlewareInterface } from '../core/middlewares/middleware.interface.js';

export interface RouteInterface {
  path: string;
  method: HttpMethod;
  next: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: MiddlewareInterface[];
}
