import PinoService from './core/logger/pino.service.js';
import RestApplication from './app/rest.js';
import ConfigService from './core/config/config.service.js';

async function bootstrap() {
  const logger = new PinoService();
  const application = new RestApplication(logger);
  const config = new ConfigService(process.env);
  const port = config.get('PORT');

  await application.init();
  logger.info(String(port));
}

bootstrap();
