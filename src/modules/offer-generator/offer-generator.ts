import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.js';
import { getRandomItem, getRandomItems, getRandomValue } from '../../common/utils.js';
import {
  CitiesLocation,
  MAX_BEDROOMS,
  MAX_PRICE_PER_NIGHT,
  MAX_RANDOM_VALUE_FOR_BOOL,
  MAX_RATING,
  MIN_BEDROOMS,
  MIN_PRICE_PER_NIGHT,
  MIN_RANDOM_VALUE,
  MIN_RATING,
  MODULO_FOR_GUESTS,
  MULTIPLIER_FOR_GUESTS,
  PRICE_MULTIPLIER
} from '../../common/const.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {
  }

  public generate(): string {
    const createdAmenities = getRandomItems<string>(this.mockData.amenities).join(';');

    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const city = getRandomItem<string>(this.mockData.city);
    const previewUrl = getRandomItem<string>(this.mockData.previewUrl);
    const photoUrls = getRandomItem<string>(this.mockData.photoUrls);
    const isPremium = String(!!getRandomValue(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE_FOR_BOOL));
    const isFavorite = String(!!getRandomValue(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE_FOR_BOOL));
    const rating = String(getRandomValue(MIN_RATING, MAX_RATING));
    const propertyType = getRandomItem<string>(this.mockData.propertyType);
    const numberOfBedrooms = String(getRandomValue(MIN_BEDROOMS, MAX_BEDROOMS));
    const numberOfGuests = String((+numberOfBedrooms * MULTIPLIER_FOR_GUESTS) % MODULO_FOR_GUESTS);
    const pricePerNight = String(getRandomValue(MIN_PRICE_PER_NIGHT, MAX_PRICE_PER_NIGHT) * PRICE_MULTIPLIER);
    const amenities = createdAmenities ? createdAmenities : 'Washer';
    const commentsCounter = 0;
    const coordinates = [CitiesLocation[city].latitude, CitiesLocation[city].longitude].join(';');

    return [title, description, city, previewUrl, photoUrls, isPremium, isFavorite, rating, propertyType,
      numberOfBedrooms, numberOfGuests, pricePerNight, amenities, commentsCounter, coordinates].join('\t');
  }
}
