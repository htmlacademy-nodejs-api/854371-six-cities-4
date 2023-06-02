import { Container } from 'inversify';
import RestApplication from './rest.js';
import { APPLICATION_DEPENDENCIES } from '../types/application.dependencies.js';
import { LoggerInterface } from '../core/logger/logger.interface.js';
import PinoService from '../core/logger/pino.service.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { DatabaseClientInterface } from '../core/databese-client/database-client.interface.js';
import MongoClientService from '../core/databese-client/mongo-client.service.js';
import ConfigService from '../core/config/config.service.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(APPLICATION_DEPENDENCIES.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<LoggerInterface>(APPLICATION_DEPENDENCIES.LoggerInterface).to(PinoService).inSingletonScope();
  restApplicationContainer.bind<ConfigInterface<RestSchema>>(APPLICATION_DEPENDENCIES.ConfigService).to(ConfigService).inSingletonScope();
  restApplicationContainer.bind<DatabaseClientInterface>(APPLICATION_DEPENDENCIES.DatabaseClientInterface).to(MongoClientService).inSingletonScope();

  return restApplicationContainer;
}
