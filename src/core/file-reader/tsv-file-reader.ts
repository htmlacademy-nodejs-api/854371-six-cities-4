import { FileReaderInterface } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Amenity, Cities, HouseType, MainImages, RentalOffer } from '../../types/rental-offer.js';

export default class TsvFileReader implements FileReaderInterface {
  private readData = '';

  constructor(public fileName: string) {
  }

  public read() {
    this.readData = readFileSync(path.resolve(this.fileName), {encoding: 'utf-8'});
  }

  public toArray(): RentalOffer[] {
    if (!this.readData) {
      return [];
    }

    const lines = this.readData.split('\n');
    return lines
      .filter((line) => line !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, publishDate, city, previewImage, mainImages, isPremium, isFavorite, rating, type, roomsCounter, guestsCounter, cost, amenities, userId, numberComments, coordinates]) => {
        const coordinatesArray = coordinates.split(';').map((coordinate) => parseFloat(coordinate));
        return {
          title,
          description,
          publishDate: new Date(publishDate),
          city: city as Cities,
          previewImage,
          mainImages: mainImages.split(';') as MainImages,
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: parseFloat(rating),
          type: type as HouseType,
          roomsCounter: parseInt(roomsCounter, 10),
          guestsCounter: parseInt(guestsCounter, 10),
          cost: parseInt(cost, 10),
          amenities: amenities.split(';') as Amenity[],
          userId: parseInt(userId, 10),
          numberComments: parseInt(numberComments, 10),
          coordinates: {
            latitude: coordinatesArray[0],
            longitude: coordinatesArray[1]
          }
        };
      });
  }
}
