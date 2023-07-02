import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  public email!: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password length must be at least 6 characters' })
  @MaxLength(12, { message: 'Password length must not exceed 12 characters' })
  public password!: string;
}
