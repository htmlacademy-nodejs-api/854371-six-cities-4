import { RentalServiceInterface } from './rental-service.interface.js';
import CreateRentalDto from './dto/create-rental.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentalEntity } from './rental.entity.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { getLimit, transformCityWord } from '../../common/offers.js';
import UpdateRentalDto from './dto/update-rental.dto.js';
import { MAX_RETURNED_OFFERS, MAX_RETURNED_PREMIUM_OFFERS_FOR_CITY, SortType } from '../../common/const.js';

@injectable()
export default class RentalService implements RentalServiceInterface {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalModel) private rentalModel: types.ModelType<RentalEntity>
  ) {
  }

  async create(dto: CreateRentalDto): Promise<DocumentType<RentalEntity>> {
    const result = await this.rentalModel.create(dto);
    this.logger.info(`Rental offer created: ${result.title}`);

    return result;
  }

  async find(limit?: number): Promise<DocumentType<RentalEntity>[]> {
    const result = await this.rentalModel.aggregate([
      {$addFields: {id: {$toString: '$_id'}}},
      {$sort: {createdAt: SortType.DEC}},
      {$limit: getLimit(MAX_RETURNED_OFFERS, limit)},
    ]).exec();
    this.logger.info(`find: Returned (${getLimit(MAX_RETURNED_OFFERS, limit)}) of offers`);
    return result;
  }

  async findById(offerId: string): Promise<DocumentType<RentalEntity> | null> {
    const result = await this.rentalModel.findById(offerId)
      .populate(['userId'])
      .exec();

    if (result) {
      this.logger.info(`findById: Returned the offer with ID ${offerId}`);
    } else {
      this.logger.info(`findById: The offer with ID ${offerId} was not found`);
    }
    return result;
  }

  async findByCityAndPremium(city: string, limit?: number): Promise<DocumentType<RentalEntity>[] | null> {
    const transformedCityWord = transformCityWord(city);
    const result = await this.rentalModel.find({
      city: transformedCityWord,
      isPremium: true
    }, null, {limit: getLimit(MAX_RETURNED_PREMIUM_OFFERS_FOR_CITY, limit)})
      .sort({createdAt: SortType.DEC})
      .exec();

    if (result) {
      this.logger.info(`findByCityAndPremium: Found ${result.length} premium offers for city ${transformedCityWord}`);
    } else {
      this.logger.info(`findByCityAndPremium: No offers found for city ${transformedCityWord}`);
    }

    return result;
  }

  async findByIdAndUpdate(offerId: string, dto: UpdateRentalDto): Promise<DocumentType<RentalEntity> | null> {
    const result = await this.rentalModel.findByIdAndUpdate(offerId, dto, {new: true})
      .populate('userId')
      .sort({createdAt: SortType.DEC})
      .exec();
    if (result) {
      this.logger.info(`findByIdAndUpdate: The offer with ID ${offerId} has been updated`);
    } else {
      this.logger.info(`findByIdAndUpdate: The offer with ID ${offerId} was not found`);
    }
    return result;
  }

  async findFavorite(): Promise<DocumentType<RentalEntity>[] | null> {
    const result = await this.rentalModel.find({isFavorite: true})
      .populate(['userId'])
      .exec();

    if (result) {
      this.logger.info(`findFavorite: Found ${result.length} listings added to favorites`);
    } else {
      this.logger.info('No favorite listings found');
    }

    return result;
  }

  async updateRentalOffer(offerId: string, dto: UpdateRentalDto): Promise<DocumentType<RentalEntity> | null> {
    const result = await this.rentalModel.findByIdAndUpdate(offerId, dto, {new: true});

    if (result) {
      this.logger.info(`updateRentalOffer: Offer with ID ${offerId} has been update`);
    } else {
      this.logger.info(`updateRentalOffer: Offer with ID ${offerId} not found`);
    }

    return result;
  }

  async changeFavoriteFlag(offerId: string): Promise<DocumentType<RentalEntity> | null> {

    const rentalOffer = await this.findById(offerId);

    if (!rentalOffer) {
      this.logger.error(`changeFavoriteFlag: The offer with ID ${offerId} was not found`);
      return null;
    }

    const changedRentalOffer = await this.rentalModel.findByIdAndUpdate(offerId, {isFavorite: !rentalOffer.isFavorite}, {new: true})
      .populate(['userId'])
      .exec();

    this.logger.info(`changeFavoriteFlag: The offer with ID ${offerId} has been updated`);

    return changedRentalOffer;
  }

  async findByIdAndDelete(offerId: string): Promise<DocumentType<RentalEntity> | null> {

    const result = await this.rentalModel.findByIdAndDelete(offerId);

    if (result) {
      this.logger.info(`delete: The offer with ID ${offerId} has been deleted`);
    } else {
      this.logger.info(`delete: The offer with ID ${offerId} was not found`);
    }

    return result;
  }

  async exist(offerId: string): Promise<boolean> {
    return (await this.rentalModel.exists({_id: offerId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<RentalEntity> | null> {
    return this.rentalModel
      .findByIdAndUpdate(offerId, {'$inc': {commentsNumber: 1}})
      .exec();
  }
}
