import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.js';
import { getRandomItem, getRandomItems, getRandomValue } from '../../common/utils.js';
import {
  CitiesLocation,
  MAX_PRICE_PER_NIGHT,
  MAX_RANDOM_VALUE_FOR_BOOL,
  MIN_PRICE_PER_NIGHT,
  MIN_RANDOM_VALUE,
  OfferGuestsLimit, OfferRoomsLimit,
  PRICE_MULTIPLIER,
} from '../../common/const.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {
  }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.title);
    const description = getRandomItem<string>(this.mockData.description);
    const city = getRandomItem<string>(this.mockData.city);
    const previewUrl = getRandomItem<string>(this.mockData.previewUrl);
    const photoUrls = getRandomItem<string>(this.mockData.photoUrls);
    const isPremium = String(!!getRandomValue(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE_FOR_BOOL));
    const isFavorite = String(!!getRandomValue(MIN_RANDOM_VALUE, MAX_RANDOM_VALUE_FOR_BOOL));
    const housingType = getRandomItem<string>(this.mockData.housingType);
    const roomsCounter = String(getRandomValue(OfferRoomsLimit.MIN, OfferRoomsLimit.MAX));
    const guestsCounter = String(getRandomValue(OfferGuestsLimit.MIN, OfferGuestsLimit.MAX));
    const rentalCost = String(getRandomValue(MIN_PRICE_PER_NIGHT, MAX_PRICE_PER_NIGHT) * PRICE_MULTIPLIER);
    const amenities = getRandomItems<string>(this.mockData.amenities).join(';');
    const coordinates = [CitiesLocation[city].latitude, CitiesLocation[city].longitude].join(';');

    const username = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.email);
    const userType = getRandomItem<string>(['base', 'pro']);

    return [
      title, description, city, previewUrl, photoUrls, isPremium, isFavorite,
      housingType, roomsCounter, guestsCounter, rentalCost, `${amenities ? amenities : 'Washer'}`, coordinates,
      username, email, userType,
    ].join('\t');
  }
}
