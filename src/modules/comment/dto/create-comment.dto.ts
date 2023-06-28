import { IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'Text must be a string' })
  @MinLength(5, { message: 'Text must be at least 5 characters' })
  @MaxLength(1024, { message: 'Text cannot exceed 1024 characters' })
  public text!: string;

  @IsNumber()
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot exceed 5' })
  public rating!: number;

  @IsMongoId({ message: 'UserId must be a valid Mongo ID' })
  public userId!: string;

  @IsMongoId({ message: 'OfferId must be a valid Mongo ID' })
  public offerId!: string;
}

