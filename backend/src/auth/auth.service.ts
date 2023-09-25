import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  UnauthorizedException,
  BadRequestException,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Repository } from 'typeorm';
import { Auth } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../providers/mailer/nodemailer.provider';
import { User } from '../users/entities/user.entity';
import { BasicResponse } from './interface/response';
import { JwtService } from '@nestjs/jwt';
import { serialize } from 'cookie';
import { TokenUser } from './interface/response';
import { Guest } from './entities/guest.entity';

@Injectable()
export class AuthService {
  constructor(
    private mailService: MailerService,
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('GUEST_REPOSITORY')
    private guestRepository: Repository<Guest>,
  ) {}

  async loginService(
    loginData: Auth,
    @Res({ passthrough: true }) res: Response,
  ): Promise<BasicResponse> {
    const { user_name, user_password } = loginData;

    const user = await this.userRepository.findOne({
      where: { username: user_name },
      relations: ['roles'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.user_status !== 'active') {
      throw new BadRequestException('User is Deactive');
    }
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      throw new BadRequestException('Invalid username or password.');
    }

    const highestRole = [...user.roles].sort(
      (a, b) => b.priority - a.priority,
    )[0];

    const verification_code = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

    const currentDate = new Date();

    currentDate.setMinutes(currentDate.getMinutes() + 5);
    const payload = {
      sub: user.user_id,
      username: user.username,
      role: highestRole.role_name,
    };

    const confirm_token = await this.jwtService.signAsync(payload);
    const cookie = serialize('access_jwt', confirm_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 5,
      path: '/',
    });
    res.setHeader('Set-Cookie', cookie);

    user.verification_code = verification_code;
    user.verification_expires = currentDate;
    await this.userRepository.save(user);
    this.mailService.sendConfirmationEmail(user.email, verification_code);
    return { message: 'Admin login', status: HttpStatus.OK };
  }

  //kiểm tra code khi đăng nhập vào admin
  async checkLoginStep2(
    req: Request,
    code: { code: string },
    res: Response,
  ): Promise<BasicResponse> {
    const user_id = (req.user as TokenUser).sub;
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
      relations: ['roles'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (user.verification_code !== code.code) {
      throw new HttpException(
        'Verification code is incorrect! ',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    //Xóa code và hạn sử dụng
    (user.verification_code = null), (user.verification_expires = null);
    await this.userRepository.save(user);

    //lấy role cao nhất
    const highestRole = [...user.roles].sort(
      (a, b) => b.priority - a.priority,
    )[0];

    // set jwt vào cookie
    const payload = {
      sub: user.user_id,
      username: user.username,
      role: highestRole.role_name,
    };

    const confirm_token = await this.jwtService.signAsync(payload);
    const cookie = serialize('access_jwt', confirm_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 36,
      path: '/',
    });
    res.setHeader('Set-Cookie', cookie);

    return {
      message: 'Login success',
      status: 200,
    };
  }

  async checkLoggedIn(@Req() req: Request, @Res() res: Response) {
    const user_id = (req.user as TokenUser).sub;
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    res.status(200).json('Is logged');
  }

  //kiểm tra guest
  async checkGuestLogin(@Req() req: Request, @Res() res: Response) {
    const guest_id = (req.user as TokenUser).sub;
    const guest = await this.guestRepository.findOne({
      where: { guest_id: guest_id },
    });
    if (!guest) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    res.status(200).json({ message: 'Is logged', guest_id: guest_id });
  }

  //guest
  async saveFingerprint(
    fingerprint: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const existingGuest = await this.guestRepository
      .createQueryBuilder('guest')
      .where('guest.guest_fingerprint = :fingerprint', { fingerprint })
      .getOne();

    if (existingGuest) {
      const payload = {
        sub: existingGuest.guest_id,
      };
      const guest_token = await this.jwtService.signAsync(payload);
      const cookie = serialize('LOGIN_INFO', guest_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 72,
        path: '/',
      });
      res.setHeader('Set-Cookie', cookie);
      return {
        message: 'Create token success',
        status: 200,
      };
    }

    const newGuest = this.guestRepository.create({
      guest_fingerprint: fingerprint,
    });

    const addedGuest = await this.guestRepository.save(newGuest);
    const payload = {
      sub: addedGuest.guest_id,
    };
    const guest_token = await this.jwtService.signAsync(payload);
    const cookie = serialize('LOGIN_INFO', guest_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 72,
      path: '/',
    });
    res.setHeader('Set-Cookie', cookie);

    return { status: 201, result: addedGuest };
  }
}
