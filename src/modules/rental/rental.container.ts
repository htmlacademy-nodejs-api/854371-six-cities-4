import { Container } from 'inversify';
import { RentalEntity, RentalModel } from './rental.entity.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { types } from '@typegoose/typegoose';

export function createRentalContainer() {
  const rentalContainer = new Container();

  rentalContainer.bind<types.ModelType<RentalEntity>>(APPLICATION_DEPENDENCIES.RentalModel).toConstantValue(RentalModel)

  return rentalContainer;
}
