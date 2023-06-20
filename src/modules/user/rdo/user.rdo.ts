import { Expose } from 'class-transformer';

export default class UserRdo {
  @Expose()
    name!: string;

  @Expose()
    avatarUrl!: string;

  @Expose()
    userType!: string;
}
