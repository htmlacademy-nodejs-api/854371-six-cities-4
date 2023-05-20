import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../types/application.dependencies.js';

@injectable()
export default class RestApplication {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.ConfigService) private config: ConfigInterface
  ) {}

  public async init() {
    this.logger.info('Application init...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('APP_PORT')}`);
  }
}
