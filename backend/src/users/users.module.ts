import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailerService } from '../providers/mailer/nodemailer.provider';
import { userProvider } from '../providers/user/user.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, MailerService, ...userProvider],
})
export class UsersModule {}
