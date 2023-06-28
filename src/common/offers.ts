import { RentalOffer } from '../types/rental-offer.js';

export function createOffer(offerData: string): RentalOffer {
  const [
    title, description, city, previewImage, mainImages, isPremium, isFavorite,
    housingType, roomsCounter, guestsCounter, rentalCost, amenities, coordinates,
    username, email, userType,
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
    rating: 0,
    housingType: housingType,
    roomsCounter: parseInt(roomsCounter, 10),
    guestsCounter: parseInt(guestsCounter, 10),
    rentalCost: parseInt(rentalCost, 10),
    amenities: amenities.split(';'),
    user: {
      name: username,
      email: email,
      userType,
    },
    commentsNumber: 0,
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
  return `${city[0].toUpperCase()}${city.substring(1)}`;
}
