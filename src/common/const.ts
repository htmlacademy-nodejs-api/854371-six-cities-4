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

export const OfferTitleLimit = {
  MIN: 10,
  MAX: 100,
};
export const OfferDescriptionLimit = {
  MIN: 20,
  MAX: 1024,
};
export const OfferRoomsLimit = {
  MIN: 1,
  MAX: 8,
};
export const OfferGuestsLimit = {
  MIN: 1,
  MAX: 10,
};
export const OfferPriceLimit = {
  MIN: 100,
  MAX: 100000,
};
export const OFFER_IMAGES_LIMIT = 6;

export const RatingLimit = {
  MIN: 0,
  MAX: 5
};

export const Field = {
  INCLUDE: 1,
  EXCLUDE: 0
};

export const MIN_RANDOM_VALUE = 0;
export const MAX_RANDOM_VALUE_FOR_BOOL = 1;
export const MIN_PRICE_PER_NIGHT = 1;
export const MAX_PRICE_PER_NIGHT = 1000;
export const PRICE_MULTIPLIER = 100;

export const MAX_RETURNED_OFFERS = 60;
export const MAX_RETURNED_PREMIUM_OFFERS_FOR_CITY = 3;
export const MAX_RETURNED_COMMENTS = 50;

export const SortType = {
  DEC: 1,
  INC: -1
} as const;

export const DEFAULT_OBJECT_TO_RESPONSE = {};

export const DECIMAL_PLACES_COUNT = 2;
