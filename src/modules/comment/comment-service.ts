import { CommentServiceInterface } from './comment-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { inject } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { UserEntity } from '../user/user.entity.js';
import { RentalEntity } from '../rental/rental.entity.js';
import { getLimit } from '../../common/offers.js';
import { MAX_RETURNED_COMMENTS } from '../../common/const.js';

export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.CommentModel) private commentModel: types.ModelType<CommentEntity>,
    @inject(APPLICATION_DEPENDENCIES.UserModel) private userModel: types.ModelType<UserEntity>,
    @inject(APPLICATION_DEPENDENCIES.RentalModel) private rentalModel: types.ModelType<RentalEntity>
  ) {}

  private async checkUserExist(userId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    return !!user;
  }

  private async checkOfferExist(offerId: string): Promise<boolean> {
    const offer = await this.rentalModel.findById(offerId);
    return !!offer;
  }

  public async createComment(dto: CreateCommentDto) {
    const isUserExist = await this.checkUserExist(dto.userId);
    const isOfferExist = await this.checkOfferExist(dto.offerId);

    if (!isUserExist) {
      this.logger.error(`createComment: user with ID ${dto.userId} not found`);
      return null;
    }

    if (!isOfferExist) {
      this.logger.error(`createComment: offer with ID ${dto.offerId} not found`);
      return null;
    }

    const result = await this.commentModel.create(dto);
    this.logger.info(`createComment: Created a comment for the user with ID ${dto.userId} and the rental listing with ID ${dto.offerId}`);
    return result;
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
