import { Amenity, Coordinates, HouseType } from '../../../types/rental-offer.js';

export default class CreateRentalDto {
  public title!: string;
  public description!: string;
  public city!: string;
  public previewImage!: string;
  public mainImages!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public housingType!: HouseType;
  public roomsCounter!: number;
  public guestsCounter!: number;
  public cost!: number;
  public rentalCost!: number;
  public amenities!: Amenity[];
  public userId!: string;
  public coordinates!: Coordinates;
}
