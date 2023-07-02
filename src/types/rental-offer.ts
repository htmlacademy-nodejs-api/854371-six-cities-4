import {AutoUserType} from './auto-user.js';

export enum City {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}

export enum HouseType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  ROOM = 'room',
  HOTEL = 'hotel',
}

export enum Amenity {
  BREAKFAST = 'Breakfast',
  AIR_CONDITIONING = 'Air conditioning',
  LAPTOP_FRIENDLY_WORKSPACE = 'Laptop friendly workspace',
  BABY_SEAT = 'Baby seat',
  WASHER = 'Washer',
  TOWELS = 'Towels',
  FRIDGE = 'Fridge',
}

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type MainImages = [string, string, string, string, string, string]

export type RentalOffer = {
  title: string;
  description: string;
  cost: number;
  city: City;
  previewImage: string;
  mainImages: MainImages;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HouseType;
  roomsCounter: number;
  guestsCounter: number;
  rentalCost: number;
  amenities: Amenity[];
  user: AutoUserType;
  commentsNumber: number;
  coordinates: Coordinates;
  postDate: string;
}
