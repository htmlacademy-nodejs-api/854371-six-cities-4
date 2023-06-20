import { Container } from 'inversify';
import { RentalEntity, RentalModel } from './rental.entity.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { types } from '@typegoose/typegoose';
import RentalService from './rental-service.js';
import { RentalServiceInterface } from './rental-service.interface.js';
import { ControllerInterface } from '../../core/controller/controller-interface.js';
import RentalController from './rental.controller.js';
import RentalSpecialController from './rental-special.controller.js';

export function createRentalContainer() {
  const rentalContainer = new Container();

  rentalContainer.bind<RentalServiceInterface>(APPLICATION_DEPENDENCIES.RentalServiceInterface).to(RentalService).inSingletonScope();
  rentalContainer.bind<types.ModelType<RentalEntity>>(APPLICATION_DEPENDENCIES.RentalModel).toConstantValue(RentalModel);
  rentalContainer.bind<ControllerInterface>(APPLICATION_DEPENDENCIES.RentalController).to(RentalController).inSingletonScope();
  rentalContainer.bind<ControllerInterface>(APPLICATION_DEPENDENCIES.RentalSpecialController).to(RentalSpecialController).inSingletonScope();

  return rentalContainer;
}
