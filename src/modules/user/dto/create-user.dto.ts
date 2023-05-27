export default class CreateUserDto {
  name!: string;
  password!: string;
  eMail!: string;
  avatarUrl!: string;
  userType!: 'base' | 'pro';
};
