import ControllerAbstract from '../../core/controller/controller-abstract.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.js';
import { Request, Response } from 'express';
import RentalService from './rental-service.js';
import { MAX_RETURNED_OFFERS } from '../../common/const.js';
import { fillDto } from '../../common/utils.js';
import RentalRdo from './rdo/rental.rdo.js';
import RentalCreatedRdo from './rdo/rental-created.rdo.js';
import CreateRentalDto from './dto/create-rental.dto.js';

@injectable()
export default class RentalController extends ControllerAbstract {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalServiceInterface) private rentalService: RentalService
  ) {
    super(logger);
    this.logger.info('Route registration for listings');

    this.addRoute({path: '/', method: HttpMethod.Get, next: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, next: this.create});
    // this.addRoute({path: '/:offerId', method: HttpMethod.Get, next: this.getInfo});
    // this.addRoute({path: '/:offerId', method: HttpMethod.Put, next: this.edit});
    // this.addRoute({path: '/:offerId', method: HttpMethod.Delete, next: this.remove});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const rentalOffers = await this.rentalService.find(MAX_RETURNED_OFFERS);
    const rentalOffersToResponse = fillDto(RentalRdo, rentalOffers);
    this.ok(res, rentalOffersToResponse);
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateRentalDto>,
    res: Response): Promise<void> {
    console.log(body);
    const result = await this.rentalService.create(body);
    this.created(res, fillDto(RentalCreatedRdo, result));
  }

  /*public getInfo(req: Request, res: Response): void {
    //
  }

  public edit(req: Request, res: Response): void {
    //
  }

  public remove(req: Request, res: Response): void {
    //
  }*/
}
