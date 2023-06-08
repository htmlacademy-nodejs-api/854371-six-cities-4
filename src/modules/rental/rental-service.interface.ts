import CreateRentalDto from './dto/create-rental.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { RentalEntity } from './rental.entity.js';

export interface RentalServiceInterface {
  /**
   * Создать объявление об аренде
   * @param dto объект с данными объявления
   */
  create(dto: CreateRentalDto): Promise<DocumentType<RentalEntity>>

  /**
   * Получить список объявлний но не более чем `limit`
   * @param limit Колличество объялвний к возврату, не может быть больше чем `60`
   */
  find(limit: number): Promise<DocumentType<RentalEntity>[]>

  /**
   * Получить объект с данными конкертного объявления
   * @param offerId id объявления
   */
  findById(offerId: string): Promise<DocumentType<RentalEntity> | null>

  /**
   * Удалить объявление с `offerId`
   * @param offerId id объявления
   */
  delete(offerId: string): Promise<DocumentType<RentalEntity> | null>
}
