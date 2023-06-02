import { Container } from 'inversify';
import { RentalEntity, RentalModel } from './rental.entity.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { types } from '@typegoose/typegoose';
import RentalService from './rental-service.js';
import { RentalServiceInterface } from './rental-service.interface.js';

export function createRentalContainer() {
  const rentalContainer = new Container();

  rentalContainer.bind<RentalServiceInterface>(APPLICATION_DEPENDENCIES.RentalServiceInterface).to(RentalService).inSingletonScope();
  rentalContainer.bind<types.ModelType<RentalEntity>>(APPLICATION_DEPENDENCIES.RentalModel).toConstantValue(RentalModel);

  return rentalContainer;
}
