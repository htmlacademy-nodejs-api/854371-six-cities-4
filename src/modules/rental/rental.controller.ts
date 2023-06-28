import ControllerAbstract from '../../core/controller/controller-abstract.js';
import { inject, injectable } from 'inversify';
import ValidateDtoMiddleware from '../../core/middlewares/validate-dto.middleware.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.js';
import { Request, Response } from 'express';
import RentalService from './rental-service.js';
import { MAX_RETURNED_OFFERS } from '../../common/const.js';
import { fillDto } from '../../common/utils.js';
import RentalShortRdo from './rdo/rental-short.rdo.js';
import RentalAllRdo from './rdo/rental-all.rdo.js';
import CreateRentalDto from './dto/create-rental.dto.js';
import UpdateRentalDto from './dto/update-rental.dto.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectId.middleware.js';
import DocumentExistMiddleware from '../../core/middlewares/document-exist.middleware.js';

@injectable()
export default class RentalController extends ControllerAbstract {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalServiceInterface) private rentalService: RentalService
  ) {
    super(logger);
    this.logger.info('Route registration for listings');

    this.addRoute({path: '/', method: HttpMethod.Get, next: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      next: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateRentalDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      next: this.getInfo,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistMiddleware(rentalService, 'Rental', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      next: this.edit,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistMiddleware(rentalService, 'Rental', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      next: this.remove,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistMiddleware(rentalService, 'Rental', 'offerId')
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const rentalOffers = await this.rentalService.find(MAX_RETURNED_OFFERS);
    const rentalOffersToResponse = fillDto(RentalShortRdo, rentalOffers);
    this.ok(res, rentalOffersToResponse);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentalDto>,
    res: Response): Promise<void> {
    const result = await this.rentalService.create(body);
    this.created(res, fillDto(RentalAllRdo, result));
  }

  public async getInfo({params}: Request, res: Response): Promise<void> {
    const rental = await this.rentalService.findById(params.offerId);
    const rentalToResponse = fillDto(RentalAllRdo, rental);
    this.ok(res, rentalToResponse);
  }

  public async edit(req: Request<Record<string, string>, Record<string, unknown>, UpdateRentalDto>, res: Response): Promise<void> {
    const offerId = req.params.offerId;
    const body = req.body;

    const updatedRental = await this.rentalService.findByIdAndUpdate(offerId, body);
    const updatedRentalToResponse = fillDto(RentalAllRdo, updatedRental);
    this.ok(res, updatedRentalToResponse);
  }

  public async remove(req: Request, res: Response): Promise<void> {
    const offerId = req.params.offerId;

    const deletedRental = await this.rentalService.findByIdAndDelete(offerId);
    const deletedRentalToResponse = fillDto(RentalShortRdo, deletedRental);

    this.ok(res, deletedRentalToResponse);
  }
}
