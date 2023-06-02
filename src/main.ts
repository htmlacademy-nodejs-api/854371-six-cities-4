import 'reflect-metadata';
import RestApplication from './app/rest.js';
import { APPLICATION_DEPENDENCIES } from './types/application.dependencies.js';
import { Container } from 'inversify';
import { createRestApplicationContainer } from './app/rest.container.js';
import { createUserContainer } from './modules/user/user.container.js';
import { createRentalContainer } from './modules/rental/rental.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(createRestApplicationContainer(), createUserContainer(), createRentalContainer());

  const application = mainContainer.get<RestApplication>(APPLICATION_DEPENDENCIES.RestApplication);


  await application.init();
}

bootstrap();
