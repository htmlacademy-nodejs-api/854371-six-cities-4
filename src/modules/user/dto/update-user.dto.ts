export default class UpdateUserDto {
  name?: string;
  password?: string;
  email!: string;
  avatarUrl?: string;
  userType?: 'base' | 'pro';
}
