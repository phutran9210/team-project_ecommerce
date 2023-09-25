import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerService } from '../providers/mailer/nodemailer.provider';
import { DatabaseModule } from '../../database/database.module';
import { userProvider } from '../providers/user/user.provider';
// import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailerService, ...userProvider],
})
export class AuthModule {}
