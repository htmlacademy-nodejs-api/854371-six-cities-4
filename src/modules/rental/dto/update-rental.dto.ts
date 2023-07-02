import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber, IsObject,
  IsOptional,
  IsString,
  IsUrl, Max,
  MaxLength, Min,
  MinLength
} from 'class-validator';
import { Amenity, City, HouseType } from '../../../types/rental-offer.js';

export default class UpdateRentalDto {
  @IsOptional()
  @IsString({message: 'Title must be a string'})
  @MinLength(10, {message: 'Title must be at least 10 characters'})
  @MaxLength(100, {message: 'Title cannot exceed 100 characters'})
  public title?: string;

  @IsOptional()
  @IsString({message: 'Description must be a string'})
  @MinLength(20, {message: 'Description must be at least 20 characters'})
  @MaxLength(1024, {message: 'Description cannot exceed 1024 characters'})

  public description?: string;

  @IsOptional()
  @IsEnum(City, {message: 'City must be a valid city enum value', each: true})
  public city?: string;

  @IsOptional()
  @IsUrl({}, {message: 'Preview image must be a valid URL'})
  public previewImage?: string;

  @IsOptional()
  @IsArray({message: 'Main images must be an array'})
  public mainImages?: string[];

  @IsOptional()
  @IsBoolean({message: 'IsPremium must be a boolean'})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: 'IsFavorite must be a boolean'})
  public isFavorite?: boolean;

  @IsOptional()
  @IsEnum(HouseType, {message: 'Housing type must be a valid housing type enum value'})
  public housingType!: HouseType;

  @IsOptional()
  @IsNumber({}, {message: 'Rooms counter must be a number'})
  @Min(1, {message: 'Rooms counter must be at least 1'})
  @Max(8, {message: 'Rooms counter cannot exceed 8'})
  public roomsCounter?: number;

  @IsOptional()
  @IsNumber({}, {message: 'Guests counter must be a number'})
  @Min(1, {message: 'Guests counter must be at least 1'})
  @Max(10, {message: 'Guests counter cannot exceed 10'})
  public guestsCounter?: number;

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(100000)
  public rentalCost!: number;

  @IsOptional()
  @IsEnum(Amenity, { message: 'Invalid amenity value', each: true })
  public amenities?: string[];

  @IsOptional()
  @IsObject()
  public coordinates?: {
    latitude: number,
    longitude: number
  };

  public userId!: string;
}
