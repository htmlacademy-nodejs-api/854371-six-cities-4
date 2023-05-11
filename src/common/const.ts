import { Coordinates } from '../types/rental-offer.js';

export const CitiesLocation: Record<string, Coordinates> = {
  Paris: {
    latitude: 48.85661,
    longitude: 2.351499
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697
  },
  Amsterdam: {
    latitude: 52.370216,
    longitude: 4.895168
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654
  },
  Dusseldorf: {
    latitude: 51.225402,
    longitude: 6.776314
  }
} as const;

export const MIN_RANDOM_VALUE = 0;
export const MAX_RANDOM_VALUE_FOR_BOOL = 1;
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const MIN_BEDROOMS = 1;
export const MAX_BEDROOMS = 8;
export const MULTIPLIER_FOR_GUESTS = 2;
export const MODULO_FOR_GUESTS = 10;
export const MIN_PRICE_PER_NIGHT = 1;
export const MAX_PRICE_PER_NIGHT = 1000;
export const PRICE_MULTIPLIER = 100;
export const MAX_COMMENTS_COUNTER = 1000;
export const FIRST_WEEK_DAY = 1;
export const LAST_WEEK_DAY = 7;
