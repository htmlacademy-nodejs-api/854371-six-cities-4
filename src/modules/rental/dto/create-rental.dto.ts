export default class CreateRentalDto {
  public title!: string;
  public description!: string;
  public city!: string;
  public previewImage!: string;
  public mainImages!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public type!: string;
  public roomsCounter!: number;
  public guestsCounter!: number;
  public cost!: number;
  public amenities!: string[];
  public userId!: string;
  public coordinates!: {
    latitude: number,
    longitude: number
  };
}
