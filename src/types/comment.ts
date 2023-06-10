import { Ref } from '@typegoose/typegoose';
import { UserEntity } from '../modules/user/user.entity.js';
import { RentalEntity } from '../modules/rental/rental.entity.js';

export type Comment = {
  text: string;
  rating: number;
  userId: Ref<UserEntity>;
  offerId: Ref<RentalEntity>
}
