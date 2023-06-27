import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../types/application.dependencies.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { DatabaseClientInterface } from '../core/databese-client/database-client.interface.js';
import { getUri } from '../common/db.js';
import express, { Express } from 'express';
import { ControllerInterface } from '../core/controller/controller-interface.js';
import ExceptionFilter from '../core/exception-filters/exception-filter.js';

@injectable()
export default class RestApplication {
  private expressApplication: Express;
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.ConfigService) private config: ConfigInterface<RestSchema>,
    @inject(APPLICATION_DEPENDENCIES.DatabaseClientInterface) private dbClient: DatabaseClientInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalController) private rentalController: ControllerInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalSpecialController) private rentalSpecialController: ControllerInterface,
    @inject(APPLICATION_DEPENDENCIES.UserController) private userController: ControllerInterface,
    @inject(APPLICATION_DEPENDENCIES.CommentController) private commentController: ControllerInterface,
    @inject(APPLICATION_DEPENDENCIES.ExceptionFilter) private exceptionFilter: ExceptionFilter
  ) {
    this.expressApplication = express();
  }

  private async _initDb() {
    await this.dbClient.connect(getUri(
      this.config.get('DB_HOST'),
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    ));
  }

  private async _initServer() {
    this.logger.info('Init server');
    const port = this.config.get('APP_PORT');

    this.expressApplication.listen(port);

    this.logger.info(`🚀Server started on http://localhost:${port}/`);
  }

  private async _initRouters() {
    this.logger.info('Controller initialization…');
    this.expressApplication.use('/rental-offers', this.rentalController.router);
    this.expressApplication.use('/city-favorite-offers', this.rentalSpecialController.router);
    this.expressApplication.use('/users', this.userController.router);
    this.expressApplication.use('/comments', this.commentController.router);
    this.logger.info('Controller initialization completed');
  }

  private async _initMiddleware() {
    this.logger.info('Global middleware initialization…');
    this.expressApplication.use(express.json());
    this.logger.info('Global middleware initialization completed');
  }

  private async _initExceptionFilters() {
    this.logger.info('Exception filters initialization');
    this.expressApplication.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    this.logger.info('Exception filters completed');
  }

  public async init() {
    this.logger.info('Application init...');
    this.logger.info('Init database');
    await this._initDb();
    this.logger.info('Init database completed');
    await this._initMiddleware();
    await this._initServer();
    await this._initRouters();
    await this._initExceptionFilters();
  }
}
