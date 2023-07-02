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
import { CountersLimits, RentalCostLimits, ValidationLengths } from '../../../common/const.js';
import { Amenity, City, HouseType } from '../../../types/rental-offer.js';

export default class UpdateRentalDto {
  @IsOptional()
  @IsString({message: 'Title must be a string'})
  @MinLength(ValidationLengths.TITLE_MIN, {message: `Title must be at least ${ValidationLengths.TITLE_MIN} characters`})
  @MaxLength(ValidationLengths.TITLE_MAX, {message: `Title cannot exceed ${ValidationLengths.TITLE_MAX} characters`})
  public title?: string;

  @IsOptional()
  @IsString({message: 'Description must be a string'})
  @MinLength(ValidationLengths.DESC_MIN, {message: `Description must be at least ${ValidationLengths.DESC_MIN} characters`})
  @MaxLength(ValidationLengths.DESC_MAX, {message: `Description cannot exceed ${ValidationLengths.DESC_MAX} characters`})

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
  @Min(CountersLimits.ROOMS_MIN, {message: `Rooms counter must be at least ${CountersLimits.ROOMS_MIN}`})
  @Max(CountersLimits.ROOMS_MAX, {message: `Rooms counter cannot exceed ${CountersLimits.ROOMS_MAX}`})
  public roomsCounter?: number;

  @IsOptional()
  @IsNumber({}, {message: 'Guests counter must be a number'})
  @Min(CountersLimits.GUESTS_MIN, {message: `Guests counter must be at least ${CountersLimits.GUESTS_MIN}`})
  @Max(CountersLimits.GUESTS_MAX, {message: `Guests counter cannot exceed ${CountersLimits.GUESTS_MAX}`})
  public guestsCounter?: number;

  @IsOptional()
  @IsNumber()
  @Min(RentalCostLimits.MIN)
  @Max(RentalCostLimits.MAX)
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
