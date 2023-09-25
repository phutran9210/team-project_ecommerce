import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto {
  username?: string;
  user_status?: string;
  email?: string;
  role?: string;
  user_password?: string;
}
