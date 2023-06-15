import { HttpMethod } from './http-method.js';
import { NextFunction, Request } from 'express';
import { Response } from 'express';

export interface RouteInterface {
  path: string;
  method: HttpMethod;
  next: (req: Request, res: Response, next: NextFunction) => void
}
