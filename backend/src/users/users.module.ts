import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailerService } from '../providers/mailer/nodemailer.provider';
import { userProvider } from '../providers/user/user.provider';
import { DatabaseModule } from '../../database/database.module';
import {ActivityLogModule} from "../activity_log/activity_log.module"
import {activityProvider} from "../providers/activity/activity.provider"

@Module({
  imports: [DatabaseModule,ActivityLogModule],
  controllers: [UsersController],
  providers: [UsersService, MailerService, ...userProvider,...activityProvider],
})
export class UsersModule {}
