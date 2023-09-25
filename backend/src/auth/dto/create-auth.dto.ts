import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class Auth {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(24)
  user_name: string;

  @MinLength(8)
  @MaxLength(24)
  @IsString()
  @IsNotEmpty()
  user_password: string;
}

export class CreateAuthDto {}
