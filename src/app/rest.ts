import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';

export default class RestApplication {
  constructor(
    private logger: LoggerInterface,
    private config: ConfigInterface
  ) {}

  public async init() {
    this.logger.info('Application init...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('APP_PORT')}`);
  }
}
