import { IsEmail, IsIn, IsOptional, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @Length(1, 15, { message: 'Name length must be between 1 and 15 characters' })
  public name!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  public email!: string;

  @IsOptional()
  @IsString({ message: 'Avatar URL must be a string' })
  @Matches(/\.(jpg|png)$/, { message: 'Avatar URL must be a .jpg or .png image' })
  public avatarUrl?: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password length must be at least 6 characters' })
  @MaxLength(12, { message: 'Password length must not exceed 12 characters' })
  public password!: string;

  @IsIn(['base', 'pro'], { message: 'User type must be either "base" or "pro"' })
  public userType!: 'base' | 'pro';
}
