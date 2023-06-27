import { Expose, Type } from 'class-transformer';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class CommentRdo {

  @Expose()
    id!: string;

  @Expose()
    text!: string;

  @Expose()
    rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user!: UserRdo;
}
