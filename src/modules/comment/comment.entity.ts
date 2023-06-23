import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Comment } from '../../types/comment.js';
import { UserEntity } from '../user/user.entity.js';
import { RentalEntity } from '../rental/rental.entity.js';
// import { DECIMAL_PLACES_COUNT, Field } from '../../common/const.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})
/*@post<CommentEntity>('save', async function() {
  const CommentModel = getModelForClass(CommentEntity);
  const RentalModel = getModelForClass(RentalEntity);

  const rental = await RentalModel.findById(this.offerId);
  if (rental) {
    rental.numberComments++;

    const comments = await CommentModel.find({offerId: this.offerId}, {rating: Field.INCLUDE});
    const ratings = comments.map((comment) => comment.rating);
    const average = ratings.reduce((accumulator, currentValue) => accumulator + currentValue) / ratings.length;

    rental.rating = Number.parseFloat(average.toFixed(DECIMAL_PLACES_COUNT));

    await rental.save();
  }
})*/
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
