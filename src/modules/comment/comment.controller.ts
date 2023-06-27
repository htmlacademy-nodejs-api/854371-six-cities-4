import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { DEFAULT_OBJECT_TO_RESPONSE } from '../../common/const.js';
import { fillDto } from '../../common/utils.js';
import ControllerAbstract from '../../core/controller/controller-abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectId.middleware.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { HttpMethod } from '../../types/http-method.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CommentRdo from './rdo/comment.rdo.js';

@injectable()
export default class CommentController extends ControllerAbstract {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.CommentServiceInterface) private commentService: CommentServiceInterface
  ) {
    super(logger);

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      next: this.index,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async index({params}: Request, res: Response): Promise<void> {
    const offerId = params.offerId;
    const comments = await this.commentService.findCommentsByOfferId(offerId);

    if (comments) {
      const commentsToResponse = fillDto(CommentRdo, comments);
      this.ok(res, commentsToResponse);
    } else {
      this.ok(res, DEFAULT_OBJECT_TO_RESPONSE);
    }
  }
}
