// jwt-auth-guard-check.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { TOKEN_NAME } from './decorator/token-name.decorator'; // Đảm bảo đường dẫn này đúng với vị trí của bạn

dotenv.config();

@Injectable()
export class JwtGuardCheck implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const tokenName = this._getTokenName(context) || 'access_jwt';
    const token = request.cookies[tokenName];

    if (!token) {
      throw new UnauthorizedException(`Token not found in cookie`);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_KEY,
      });
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private _getTokenName(context: ExecutionContext): string | undefined {
    return this.reflector.get<string>(TOKEN_NAME, context.getHandler());
  }
}
