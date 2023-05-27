import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Amenity, Cities, Coordinates, HouseType, MainImages, RentalOffer } from '../../types/rental-offer.js';
import { UserEntity } from '../user/user.entity.js';

export interface RentalEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class RentalEntity extends defaultClasses.TimeStamps implements RentalOffer {
  @prop({
    required: true,
    minlength: 10,
    maxlength: 100,
    trim: true
  })
  public title!: string;
  @prop({
    required: true,
    minlength: 20,
    maxlength: 1024
  })
  public description!: string;
  @prop({
    required: true
  })
  public publishDate!: Date;
  @prop({
    required: true
  })
  public city!: Cities;
  @prop({
    required: true
  })
  public previewImage!: string;
  @prop({
    type: () => [String],
    required: true
  })
  public mainImages!: MainImages;
  @prop({
    required: true
  })
  public isPremium!: boolean;
  @prop({
    required: true
  })
  public isFavorite!: boolean;
  @prop({
    required: true,
    min: 1,
    max: 5
  })
  public rating!: number;
  @prop({
    required: true
  })
  public type!: HouseType;
  @prop({
    required: true,
    min: 1,
    max: 8
  })
  public roomsCounter!: number;
  @prop({
    required: true,
    min: 1,
    max: 10
  })
  public guestsCounter!: number;
  @prop({
    required: true,
    min: 100,
    max: 100000
  })
  public cost!: number;
  @prop({
    type: () => [String],
    required: true
  })
  public amenities!: Amenity[];
  @prop({
    ref: UserEntity
  })
  public userId!: Ref<UserEntity>;
  @prop({
    required: true
  })
  public numberComments!: number;
  @prop({
    required: true
  })
  public coordinates!: Coordinates;
}

export const RentalModel = getModelForClass(RentalEntity);
