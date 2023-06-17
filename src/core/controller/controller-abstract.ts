import { ControllerInterface } from './controller-interface.js';
import { injectable } from 'inversify';
import { Response, Router } from 'express';
import { LoggerInterface } from '../logger/logger.interface.js';
import { RouteInterface } from '../../types/route.interface.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default abstract class ControllerAbstract implements ControllerInterface {
  private readonly _router: Router;

  constructor(
    protected readonly logger: LoggerInterface
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface) {
    this._router[route.method](route.path, route.next.bind(this));
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<DataType>(res: Response, statusCode: number, data: DataType) {
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public ok<DataType>(res: Response, data: DataType) {
    this.send(res, StatusCodes.OK, data);
  }

  public created<DataType>(res: Response, data: DataType) {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<DataType>(res: Response, data: DataType) {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}