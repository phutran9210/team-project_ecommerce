import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  ArrayNotEmpty,
  IsDefined,
  IsEmail,
} from 'class-validator';

export class UserSignUpData {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  user_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  user_password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
