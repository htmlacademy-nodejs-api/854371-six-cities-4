import CreateRentalDto from './dto/create-rental.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { RentalEntity } from './rental.entity.js';
import UpdateRentalDto from './dto/update-rental.dto.js';

export interface RentalServiceInterface {
  /**
   * Создать объявление об аренде
   * @param dto объект с данными объявления
   */
  create(dto: CreateRentalDto): Promise<DocumentType<RentalEntity>>

  /**
   * Получить список объявлений, но не более чем `limit`
   * @param limit количество объявлений к возврату, не может быть больше чем `60`
   */
  find(limit: number): Promise<DocumentType<RentalEntity>[]>

  /**
   * Получить объект с данными конкретного объявления
   * @param offerId id объявления
   */
  findById(offerId: string): Promise<DocumentType<RentalEntity> | null>

  /**
   * найти офферы с отметкой избранное для города `city`
   * @param city город по которому будет осуществляться поиск
   * @param limit лимит офферов для возврата не может быть больше 3
   */
  findByCityAndPremium(city: string, limit?: number): Promise<DocumentType<RentalEntity>[] | null>

  /**
   * Обновить объявление в базе данных
   * @param offerId id объявления
   * @param dto объект с обновлёнными данными объявления
   */
  findByIdAndUpdate(offerId: string, dto: UpdateRentalDto): Promise<DocumentType<RentalEntity> | null>;

  /**
   * Найти все предложения с флагом favorite
   */
  findFavorite(): Promise<DocumentType<RentalEntity>[] | null>

  /**
   * Обновить объявление об аренде
   * @param offerId id объявления
   * @param dto объект с новыми данными для объявления
   */
  updateRentalOffer(offerId: string, dto: UpdateRentalDto): Promise<DocumentType<RentalEntity> | null>

  /**
   * Поменять флаг избранного у объявления с id `offerId`
   * @param offerId id объявления
   */
  changeFavoriteFlag(offerId: string): Promise<DocumentType<RentalEntity> | null>

  /**
   * Удалить объявление с `offerId`
   * @param offerId id объявления
   */
  deleteRental(offerId: string): Promise<DocumentType<RentalEntity> | null>
}
