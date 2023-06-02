import { config } from 'dotenv';
import { ConfigInterface } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { configurationSchema, RestSchema } from './rest.schema.js';

@injectable()
export default class ConfigService implements ConfigInterface<RestSchema> {
  private readonly config: RestSchema;
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      this.logger.error(`Can't parse .env file. \n ${parsedOutput.error}`);
    }

    configurationSchema.load({});
    configurationSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configurationSchema.getProperties();
    this.logger.info('.env parsed');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
