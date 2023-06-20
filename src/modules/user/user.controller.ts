import ControllerAbstract from '../../core/controller/controller-abstract.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { UserServiceInterface } from './user-service.interface.js';
import { HttpMethod } from '../../types/http-method.js';
import { Request, Response } from 'express';
import CreateUserDto from './dto/create-user.dto.js';
import ConfigService from '../../core/config/config.service.js';
import { StatusCodes } from 'http-status-codes';
import { fillDto } from '../../common/utils.js';
import UserRdo from './rdo/user.rdo.js';

@injectable()
export default class UserController extends ControllerAbstract {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.UserServiceInterface) private userService: UserServiceInterface,
    @inject(APPLICATION_DEPENDENCIES.ConfigService) private configService: ConfigService
  ) {
    super(logger);

    this.addRoute({path: '/', method: HttpMethod.Post, next: this.create});
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response) {
    const salt = this.configService.get('SALT');

    const result = await this.userService.findOrCreate(body, salt);

    if (!result) {
      this.send(res, StatusCodes.CONFLICT, {error: `User with email ${body.email} already exist`});
      return;
    }

    const createdUserToResponse = fillDto(UserRdo, result);

    this.created(res, createdUserToResponse);
  }
}
