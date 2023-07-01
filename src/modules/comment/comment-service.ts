import { StatusCodes } from 'http-status-codes';
import HttpError from '../../core/errors/http-error.js';
import { UserEntity } from '../user/user.entity.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { getLimit } from '../../common/offers.js';
import { MAX_RETURNED_COMMENTS } from '../../common/const.js';

@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.CommentModel) private commentModel: types.ModelType<CommentEntity>,
    @inject(APPLICATION_DEPENDENCIES.UserModel) private userModel: types.ModelType<UserEntity>,
  ) {
  }

  private async checkUserExist(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    return !!user;
  }

  public async createComment(dto: Omit<CreateCommentDto, 'offerId'>, offerId: string) {
    const isUserExist = await this.checkUserExist(dto.userId);

    if (!isUserExist) {
      throw new HttpError(StatusCodes.NOT_FOUND, `createComment: user with ID ${dto.userId} not found`, 'createComment');
    }

    const updatedDto: CreateCommentDto = {
      ...dto,
      offerId
    };
    const result = await this.commentModel.create(updatedDto);
    this.logger.info(`createComment: Created a comment for the user with ID ${dto.userId} and the rental listing with ID ${offerId}`);

    return this.commentModel.findById(result.id).populate(['userId']);
  }

  public async findCommentsByOfferId(offerId: string, limit?: number): Promise<DocumentType<CommentEntity>[] | null> {
    const result = await this.commentModel.find({offerId}, null, {limit: getLimit(MAX_RETURNED_COMMENTS, limit)})
      .populate(['userId'])
      .exec();
    if (result) {
      this.logger.info(`findCommentsByOfferId: Found ${result.length} comments for the listing with ID ${offerId}`);
    } else {
      this.logger.info(`findCommentsByOfferId: Comments for the listing with ID ${offerId} not found`);
    }
    return result;
  }
}
