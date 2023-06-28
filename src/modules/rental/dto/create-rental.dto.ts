import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber, IsObject,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { Amenity, City, Coordinates, HouseType } from '../../../types/rental-offer.js';

export default class CreateRentalDto {
  @IsString({message: 'Title must be a string'})
  @MinLength(10, {message: 'Title must be at least 10 characters'})
  @MaxLength(100, {message: 'Title cannot exceed 100 characters'})
  public title!: string;

  @IsString({message: 'Description must be a string'})
  @MinLength(20, {message: 'Description must be at least 20 characters'})
  @MaxLength(1024, {message: 'Description cannot exceed 1024 characters'})
  public description!: string;

  @IsEnum(City, {message: 'City must be a valid city enum value', each: true})
  public city!: City;

  @IsUrl({}, {message: 'Preview image must be a valid URL'})
  public previewImage!: string;

  @IsArray({message: 'Main images must be an array'})
  public mainImages!: string[];

  @IsBoolean({message: 'IsPremium must be a boolean'})
  public isPremium!: boolean;

  @IsBoolean({message: 'IsFavorite must be a boolean'})
  public isFavorite!: boolean;

  @IsEnum(HouseType, {message: 'Housing type must be a valid housing type enum value'})
  public housingType!: HouseType;

  @IsNumber({}, {message: 'Rooms counter must be a number'})
  @Min(1, {message: 'Rooms counter must be at least 1'})
  @Max(8, {message: 'Rooms counter cannot exceed 8'})
  public roomsCounter!: number;

  @IsNumber({}, {message: 'Guests counter must be a number'})
  @Min(1, {message: 'Guests counter must be at least 1'})
  @Max(10, {message: 'Guests counter cannot exceed 10'})
  public guestsCounter!: number;

  @IsNumber()
  @Min(100)
  @Max(100000)
  public rentalCost!: number;

  @IsEnum(Amenity, { message: 'Invalid amenity value', each: true })
  public amenities!: Amenity[];

  @IsMongoId()
  public userId!: string;

  @IsObject()
  public coordinates!: Coordinates;
}
