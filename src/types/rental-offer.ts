import { CitiesLocation } from '../common/const.js';
import { Ref } from '@typegoose/typegoose';
import { UserEntity } from '../modules/user/user.entity.js';

export type Cities = keyof typeof CitiesLocation;
export type HouseType =
  | 'apartment'
  | 'house'
  | 'room'
  | 'hotel';

export type Amenity =
  | 'Breakfast'
  | 'Air conditioning'
  | 'Laptop friendly workspace'
  | 'Baby seat'
  | 'Washer'
  | 'Towels'
  | 'Fridge';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MainImages = [string, string, string, string, string, string]

export type RentalOffer = {
  title: string;
  description: string;
  city: Cities;
  previewImage: string;
  mainImages: MainImages;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HouseType;
  roomsCounter: number;
  guestsCounter: number;
  cost: number;
  amenities: Amenity[];
  userId: Ref<UserEntity>;
  numberComments: number;
  coordinates: Coordinates;
}
