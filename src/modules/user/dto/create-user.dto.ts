import { IsEmail, IsIn, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { NameLength, PasswordLength } from '../../../common/const.js';

export default class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @Length(NameLength.MIN, NameLength.MIN, { message: `Name length must be between ${NameLength.MIN} and ${NameLength.MIN} characters` })
  public name!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  public email!: string;

  @IsOptional()
  @IsString({ message: 'Avatar URL must be a string' })
  @Matches(/\.(jpg|png)$/, { message: 'Avatar URL must be a .jpg or .png image' })
  public avatarUrl?: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(PasswordLength.MIN, { message: `Password length must be at least ${PasswordLength.MIN} characters` })
  @MaxLength(PasswordLength.MAX, { message: `Password length must not exceed ${PasswordLength.MAX} characters` })
  public password!: string;

  @IsIn(['base', 'pro'], { message: 'User type must be either "base" or "pro"' })
  public userType!: 'base' | 'pro';
}
