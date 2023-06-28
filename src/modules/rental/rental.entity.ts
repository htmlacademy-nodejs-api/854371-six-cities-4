import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';

import { Amenity, City, Coordinates, HouseType, MainImages } from '../../types/rental-offer.js';
import { UserEntity } from '../user/user.entity.js';
import {
  OfferDescriptionLimit,
  OfferGuestsLimit,
  OfferPriceLimit,
  OfferRoomsLimit,
  OfferTitleLimit, RatingLimit,
} from '../../common/const.js';


export interface RentalEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})
export class RentalEntity extends defaultClasses.TimeStamps {
  @prop({
    required: true,
    trim: true,
    minlength: OfferTitleLimit.MIN,
    maxlength: OfferTitleLimit.MAX
  })
  public title!: string;

  @prop({
    required: true,
    minlength: OfferDescriptionLimit.MIN,
    maxlength: OfferDescriptionLimit.MAX
  })
  public description!: string;

  @prop({
    enum: City,
    required: true
  })
  public city!: City;

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
    default: 0,
    min: RatingLimit.MIN,
    max: RatingLimit.MAX
  })
  public rating!: number;

  @prop({
    required: true,
    enum: HouseType
  })
  public housingType!: HouseType;

  @prop({
    required: true,
    min: OfferRoomsLimit.MIN,
    max: OfferRoomsLimit.MAX
  })
  public roomsCounter!: number;

  @prop({
    required: true,
    min: OfferGuestsLimit.MIN,
    max: OfferGuestsLimit.MAX})
  public guestsCounter!: number;

  @prop({
    required: true,
    min: OfferPriceLimit.MIN,
    max: OfferPriceLimit.MAX
  })
  public rentalCost!: number;

  @prop({
    type: String,
    required: true,
    enum: Amenity
  })
  public amenities!: Amenity[];

  @prop({
    required: true,
    ref: UserEntity,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    default: 0
  })
  public commentsNumber!: number;

  @prop({
    required: true
  })
  public coordinates!: Coordinates;
}

export const RentalModel = getModelForClass(RentalEntity);
