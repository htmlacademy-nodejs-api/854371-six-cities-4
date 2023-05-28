import { RentalServiceInterface } from './rental-service.interface.js';
import CreateRentalDto from './dto/create-rental.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentalEntity } from './rental.entity.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';

@injectable()
export default class RentalService implements RentalServiceInterface {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalModel) private rentalModel: types.ModelType<RentalEntity>
  ) {}

  create(dto: CreateRentalDto): Promise<DocumentType<RentalEntity>> {
    const result = this.rentalModel.create(dto)
    this.logger.info(`Rental offer created: ${dto.title}`)

    return result;
  }
}
