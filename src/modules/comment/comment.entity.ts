import { defaultClasses, getModelForClass, modelOptions, post, prop, Ref } from '@typegoose/typegoose';
import { Comment } from '../../types/comment.js';
import { UserEntity } from '../user/user.entity.js';
import { RentalEntity, RentalModel } from '../rental/rental.entity.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
@post<CommentEntity>('save', async function() {
  const rental = await RentalModel.findById(this.offerId);
  if (rental) {
    rental.numberComments++;
    await rental.save();
  }
})
export class CommentEntity extends defaultClasses.TimeStamps implements Comment {
  @prop({
    required: true,
    minlength: 5,
    maxlength: 1024
  })
  public text!: string;

  @prop({
    required: true,
    min: 1,
    max: 5
  })
  public rating!: number;

  @prop({
    required: true,
    ref: UserEntity
  })
  public userId!: Ref<UserEntity>;

  @prop({
    required: true,
    ref: RentalEntity
  })
  public offerId!: Ref<RentalEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
