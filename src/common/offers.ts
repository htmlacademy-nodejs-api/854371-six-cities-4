import { RentalOffer } from '../types/rental-offer.js';

export function createOffer(offerData: string): RentalOffer {
  const [
    title,
    description,
    city,
    previewImage,
    mainImages,
    isPremium,
    isFavorite,
    rating,
    type,
    roomsCounter,
    guestsCounter,
    cost,
    amenities,
    numberComments,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const coordinatesArray = coordinates.split(';').map((coordinate) => parseFloat(coordinate));
  return {
    title,
    description,
    city: city,
    previewImage,
    mainImages: mainImages.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    type: type,
    roomsCounter: parseInt(roomsCounter, 10),
    guestsCounter: parseInt(guestsCounter, 10),
    cost: parseInt(cost, 10),
    amenities: amenities.split(';'),
    numberComments: parseInt(numberComments, 10),
    coordinates: {
      latitude: coordinatesArray[0],
      longitude: coordinatesArray[1]
    }
  } as RentalOffer;
}

export function getLimit(maxLimit: number, limit?: number): number {
  if (!limit) {
    return maxLimit;
  }
  return limit > maxLimit ? maxLimit : limit;
}

export function transformCityWord(city: string): string {
  const cityLetters = city.trim().split('');
  cityLetters[0].toUpperCase();
  return cityLetters.join('');
}
