import { inject, injectable } from 'inversify';
import { DEFAULT_OBJECT_TO_RESPONSE } from '../../common/const.js';
import DocumentExistMiddleware from '../../core/middlewares/document-exist.middleware.js';
import PrivateRouteMiddleware from '../../core/middlewares/private-route.middleware.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import ControllerAbstract from '../../core/controller/controller-abstract.js';
import { RentalServiceInterface } from './rental-service.interface.js';
import { HttpMethod } from '../../types/http-method.js';
import { Request, Response } from 'express';
import { fillDto } from '../../common/utils.js';
import RentalShortRdo from './rdo/rental-short.rdo.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectId.middleware.js';

@injectable()
export default class RentalSpecialController extends ControllerAbstract {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalServiceInterface) private rentalService: RentalServiceInterface
  ) {
    super(logger);
    this.logger.info('Route registration for special-listings');

    this.addRoute({path: '/', method: HttpMethod.Get, next: this.index, middlewares: [new PrivateRouteMiddleware]});
    this.addRoute({path: '/:city', method: HttpMethod.Get, next: this.getPremiumRentalsByCity});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      next: this.changeFavoriteStatus,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistMiddleware(this.rentalService, 'rental', 'offerId')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const favoriteRentals = await this.rentalService.findFavorite();

    if (favoriteRentals) {
      const favoriteRentalsToResponse = fillDto(RentalShortRdo, favoriteRentals);
      this.ok(res, favoriteRentalsToResponse);
    } else {
      this.ok(res, DEFAULT_OBJECT_TO_RESPONSE);
    }
  }

  public async getPremiumRentalsByCity(req: Request, res: Response): Promise<void> {
    const cityName = req.params.city;
    const premiumRentals = await this.rentalService.findByCityAndPremium(cityName);

    if (premiumRentals) {
      const premiumRentalsToResponse = fillDto(RentalShortRdo, premiumRentals);
      this.ok(res, premiumRentalsToResponse);
    } else {
      this.ok(res, DEFAULT_OBJECT_TO_RESPONSE);
    }
  }

  public async changeFavoriteStatus({params}: Request, res: Response): Promise<void> {
    const offerId = params.offerId;
    const updatedRental = await this.rentalService.changeFavoriteFlag(offerId);

    const updatedRentalToResponse = fillDto(RentalShortRdo, updatedRental);
    this.ok(res, updatedRentalToResponse);
  }
}
