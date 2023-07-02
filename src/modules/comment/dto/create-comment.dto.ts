import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CommentTextLength, RequestedRating } from '../../../common/const.js';

export default class CreateCommentDto {
  @IsString({ message: 'Text must be a string' })
  @MinLength(CommentTextLength.MIN, { message: `Text must be at least ${CommentTextLength.MIN} characters` })
  @MaxLength(CommentTextLength.MAX, { message: `Text cannot exceed ${CommentTextLength.MAX} characters` })
  public text!: string;

  @IsNumber()
  @Min(RequestedRating.MIN, { message: `Rating must be at least ${RequestedRating.MIN}` })
  @Max(RequestedRating.MAX, { message: `Rating cannot exceed ${RequestedRating.MAX}` })
  public rating!: number;

  public userId!: string;

  public offerId!: string;
}

