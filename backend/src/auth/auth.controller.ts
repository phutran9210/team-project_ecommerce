import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { Auth } from './dto/create-auth.dto';

import { BasicResponse } from './interface/response';
import { JwtAuthGuardCheck } from '../guard/JwtAuthGuardCheck.guard';
import { JwtGuardCheck } from '../guard/JwtGuardCheck.guard';
import { TokenName } from '../guard/decorator/token-name.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/v1/admin')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginData: Auth,
    @Res({ passthrough: true }) res: Response,
  ): Promise<BasicResponse> {
    console.log(loginData);
    return await this.authService.loginService(loginData, res);
  }

  @Post('api/v1/admin/verify')
  @UseGuards(JwtAuthGuardCheck)
  async verifyCodeLogin(
    @Req() req: Request,
    @Body() code: { code: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.checkLoginStep2(req, code, res);
  }

  @Get('status')
  @UseGuards(JwtAuthGuardCheck)
  async refresh(@Req() req: Request, @Res() res: Response) {
    return await this.authService.checkLoggedIn(req, res);
  }

  @Post('save-fingerprint')
  async saveFingerprint(
    @Body('fingerprint') fingerprint: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.saveFingerprint(fingerprint, res);
  }

  @Get('guest-login')
  @UseGuards(JwtGuardCheck)
  @TokenName('LOGIN_INFO')
  async guestLogin(@Req() req: Request, @Res() res: Response) {
    return await this.authService.checkGuestLogin(req, res);
  }
}
