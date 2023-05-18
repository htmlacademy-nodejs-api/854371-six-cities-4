import 'reflect-metadata';
import PinoService from './core/logger/pino.service.js';
import RestApplication from './app/rest.js';
import ConfigService from './core/config/config.service.js';
import { Container } from 'inversify';
import { LoggerInterface } from './core/logger/logger.interface.js';
import { APPLICATION_DEPENDENCIES } from './types/application.dependencies.js';
import { ConfigInterface } from './core/config/config.interface.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(APPLICATION_DEPENDENCIES.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<LoggerInterface>(APPLICATION_DEPENDENCIES.LoggerInterface).to(PinoService).inSingletonScope();
  container.bind<ConfigInterface>(APPLICATION_DEPENDENCIES.ConfigService).to(ConfigService).inSingletonScope();

  const application = container.get<RestApplication>(APPLICATION_DEPENDENCIES.RestApplication);
  await application.init();
}

bootstrap();
