import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { fillDto } from '../../common/utils.js';
import ConfigService from '../../core/config/config.service.js';
import ControllerAbstract from '../../core/controller/controller-abstract.js';
import HttpError from '../../core/errors/http-error.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import UploadFileMiddleware from '../../core/middlewares/upload-file.middleware.js';
import ValidateDtoMiddleware from '../../core/middlewares/validate-dto.middleware.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { HttpMethod } from '../../types/http-method.js';
import CreateUserDto from './dto/create-user.dto.js';
import UserRdo from './rdo/user.rdo.js';
import { UserServiceInterface } from './user-service.interface.js';

@injectable()
export default class UserController extends ControllerAbstract {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.UserServiceInterface) private userService: UserServiceInterface,
    @inject(APPLICATION_DEPENDENCIES.ConfigService) private configService: ConfigService
  ) {
    super(logger);

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      next: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      next: this.uploadAvatar,
      middlewares: [new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')]
    });
  }

  public async create({body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>, res: Response) {
    const salt = this.configService.get('SALT');

    const result = await this.userService.findOrCreate(body, salt);

    if (!result) {
      throw new HttpError(StatusCodes.CONFLICT, `User with email ${body.email} already exist`);
    }

    const createdUserToResponse = fillDto(UserRdo, result);

    this.created(res, createdUserToResponse);
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
