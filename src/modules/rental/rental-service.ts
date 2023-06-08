import { RentalServiceInterface } from './rental-service.interface.js';
import CreateRentalDto from './dto/create-rental.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentalEntity } from './rental.entity.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { getLimit } from '../../common/offers.js';

@injectable()
export default class RentalService implements RentalServiceInterface {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalModel) private rentalModel: types.ModelType<RentalEntity>
  ) {}

  create(dto: CreateRentalDto): Promise<DocumentType<RentalEntity>> {
    const result = this.rentalModel.create(dto);
    this.logger.info(`Rental offer created: ${dto.title}`);

    return result;
  }

  find(limit?: number): Promise<DocumentType<RentalEntity>[]> {
    const maxLimit = getLimit(limit);
    const result = this.rentalModel.find({}, null, {limit: getLimit()})
      .populate(['userId'])
      .exec();
    this.logger.info(`Returned the limit (${maxLimit}) of offers`);
    return result;
  }

  findById(offerId: string): Promise<DocumentType<RentalEntity> | null> {
    const result = this.rentalModel.findById({offerId})
      .populate(['userId'])
      .exec();
    this.logger.info(`Returned the offer with ID ${offerId}`);
    return result;
  }

  delete(offerId: string): Promise<DocumentType<RentalEntity> | null> {
    const result = this.rentalModel.findByIdAndDelete(offerId);
    this.logger.info(`The offer with ID ${offerId} has been deleted`);
    return result;
  }
}
