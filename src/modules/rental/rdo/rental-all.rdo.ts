import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class RentalAllRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public mainImages!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public roomsCounter!: number;

  @Expose()
  public guestsCounter!: number;

  @Expose()
  public cost!: number;

  @Expose()
  public amenities!: string[];

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;

  @Expose()
  public numberComments!: number;

  @Expose()
  public coordinates!: {
    latitude: number,
    longitude: number
  };
}
