import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import ControllerAbstract from '../../core/controller/controller-abstract.js';
import { RentalServiceInterface } from './rental-service.interface.js';
import { HttpMethod } from '../../types/http-method.js';
import { Request, Response } from 'express';
import { fillDto } from '../../common/utils.js';
import RentalShortRdo from './rdo/rental-short.rdo.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class RentalSpecialController extends ControllerAbstract {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalServiceInterface) private rentalService: RentalServiceInterface
  ) {
    super(logger);
    this.logger.info('Route registration for special-listings');

    this.addRoute({path: '/', method: HttpMethod.Get, next: this.index});
    this.addRoute({path: '/:city', method: HttpMethod.Get, next: this.getPremiumRentalsByCity});
    this.addRoute({path: '/:offerId', method: HttpMethod.Post, next: this.changeFavoriteStatus});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const favoriteRentals = await this.rentalService.findFavorite();

    if (favoriteRentals) {
      const favoriteRentalsToResponse = fillDto(RentalShortRdo, favoriteRentals);
      this.ok(res, favoriteRentalsToResponse);
    } else {
      this.ok(res, {});
    }
  }

  public async getPremiumRentalsByCity(req: Request, res: Response): Promise<void> {
    const cityName = req.params.city;
    const premiumRentals = await this.rentalService.findByCityAndPremium(cityName);

    if (premiumRentals) {
      const premiumRentalsToResponse = fillDto(RentalShortRdo, premiumRentals);
      this.ok(res, premiumRentalsToResponse);
    } else {
      this.ok(res, {});
    }
  }

  public async changeFavoriteStatus(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const updatedRental = await this.rentalService.changeFavoriteFlag(offerId);

    if (updatedRental) {
      const updatedRentalToResponse = fillDto(RentalShortRdo, updatedRental);
      this.ok(res, updatedRentalToResponse);
    } else {
      this.send(res, StatusCodes.NOT_FOUND, {error: `The offer with ID ${offerId} was not found`});
    }
  }
}
