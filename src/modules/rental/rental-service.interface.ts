import CreateRentalDto from './dto/create-rental.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { RentalEntity } from './rental.entity.js';

export interface RentalServiceInterface {
  create(dto: CreateRentalDto): Promise<DocumentType<RentalEntity>>
}
