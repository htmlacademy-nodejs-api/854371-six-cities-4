export default class CreateUserDto {
  name!: string;
  password!: string;
  email!: string;
  avatarUrl?: string;
  userType!: 'base' | 'pro';
}
