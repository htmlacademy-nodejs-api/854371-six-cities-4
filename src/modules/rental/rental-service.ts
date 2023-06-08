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

  async find(limit?: number): Promise<DocumentType<RentalEntity>[]> {
    const result = await this.rentalModel.find({}, null, {limit: getLimit(limit)})
      .populate(['userId'])
      .exec();
    this.logger.info(`find: Returned (${result.length}) of offers`);
    return result;
  }

  async findById(offerId: string): Promise<DocumentType<RentalEntity> | null> {
    const result = await this.rentalModel.findById({offerId})
      .populate(['userId'])
      .exec();
    if (result) {
      this.logger.info(`findById: Returned the offer with ID ${offerId}`);
    } else {
      this.logger.info(`findById: The offer with ID ${offerId} was not found`);
    }
    return result;
  }

  async delete(offerId: string): Promise<DocumentType<RentalEntity> | null> {
    const result = await this.rentalModel.findByIdAndDelete(offerId);
    if (result) {
      this.logger.info(`delete: The offer with ID ${offerId} has been deleted`);
    } else {
      this.logger.info(`delete: The offer with ID ${offerId} was not found`);
    }
    return result;
  }
}
