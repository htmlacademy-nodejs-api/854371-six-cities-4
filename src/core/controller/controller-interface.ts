import { Response, Router } from 'express';
import { RouteInterface } from '../../types/route.interface.js';

export interface ControllerInterface {
  readonly router: Router;
  addRoute(route: RouteInterface): void;
  send<DataType>(res: Response, statusCode: number, data: DataType): void;
  ok<DataType>(res: Response, data: DataType): void;
  created<DataType>(res: Response, data: DataType): void;
  noContent<DataType>(res: Response, data: DataType): void;
}
