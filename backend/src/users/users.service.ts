import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
  Res,
  Req,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entities/role.entity';
import { UserSignUpData } from './dto/userPipe';
import { MailerService } from '../providers/mailer/nodemailer.provider';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { TokenUser } from '../auth/interface/response';
import { BadRequestException } from '@nestjs/common';
import { serialize } from 'cookie';

@Injectable()
export class UsersService {
  constructor(
    private mailService: MailerService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  async createService(
    userSignUpData: UserSignUpData,
  ): Promise<{ status: number; message: string }> {
    const { user_name, user_password, role, email } = userSignUpData;

    const existingUsername = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :user_name', { user_name })
      .getOne();

    if (existingUsername) {
      throw new HttpException('Người dùng đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    const existEmail = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (existEmail) {
      throw new HttpException('Email đã được sử dụng', HttpStatus.BAD_REQUEST);
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user_password, salt);

      const defaultRole = await this.roleRepository.findOne({
        where: { role_name: role },
      });

      if (!defaultRole) {
        throw new Error('Role not found');
      }

      const id = uuidv4();
      const newAdmin = this.userRepository.create({
        username: user_name,
        user_password: hash,
        user_id: id,
        email: email,
        roles: [defaultRole],
      });

      await this.userRepository.save(newAdmin);

      return {
        message: 'User created successfully!',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUser() {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.user_id',
        'user.username',
        'user.user_status',
        'user.email',
      ])
      .leftJoinAndSelect('user.roles', 'roles')
      .getMany();

    if (!users) {
      return { status: 403, message: 'No user' };
    }
    //lấy role cao nhất
    const transformedUsers = users.map((user) => {
      let highestPriority = -Infinity;
      let highestRoleName = '';

      user.roles.forEach((role) => {
        if (role.priority > highestPriority) {
          highestPriority = role.priority;
          highestRoleName = role.role_name;
        }
      });

      return {
        user_id: user.user_id,
        username: user.username,
        user_status: user.user_status,
        email: user.email,
        role: highestRoleName,
      };
    });
    return transformedUsers;
  }

  //Update user
  async updateUser(req: Request, userId: string, updateUserDto: UpdateUserDto) {
    const editor_id = (req.user as TokenUser).sub;
    console.log(updateUserDto);

    const editor_user = await this.userRepository.findOne({
      where: { user_id: editor_id },
      relations: ['roles', 'roles.permissions'], // Lấy roles và permissions của user
    });
    if (!editor_user) {
      throw new NotFoundException('Not found');
    }

    // Kiểm tra xem người dùng có quyền permission_id = 2 hay không
    const hasPermission = editor_user.roles.some((role) =>
      role.permissions.some((permission) => permission.permission_id === 2),
    );

    if (!hasPermission) {
      throw new HttpException(
        'User does not have the required permission',
        HttpStatus.FORBIDDEN,
      );
    }

    const user = await this.userRepository.findOne({
      where: { user_id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.user_password) {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(updateUserDto.user_password, salt);
        user.user_password = hash;

        await this.userRepository.save(user);
        return { status: 200, message: 'Success to change pasword' };
      } catch (error) {
        throw new HttpException(
          'Failed to change pasword',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    if (updateUserDto.role) {
      // Tìm role mới dựa trên tên role từ updateUserDto
      const newRole = await this.roleRepository.findOne({
        where: { role_name: updateUserDto.role },
      });
      if (!newRole) {
        throw new NotFoundException('Role not found');
      }

      // Cập nhật role cho user
      user.roles = [newRole];
      const editedUser = await this.userRepository.save(user);
      return {
        status: 200,
        editedUser: editedUser,
      };
    }

    Object.assign(user, updateUserDto);

    const editedUser = await this.userRepository.save(user);
    return {
      status: 200,
      editedUser: editedUser,
    };
  }

  //logout
  async userLogout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    console.log('req', req.user);

    if (!req.user) {
      return HttpStatus.NOT_ACCEPTABLE;
    }
    const user_id = (req.user as TokenUser).sub;
    const user = await this.userRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    // user.refresh_token = null;
    await this.userRepository.save(user);

    const accessCookie = serialize('access_jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });

    res.setHeader('Set-Cookie', accessCookie);

    return HttpStatus.OK;
  }
}
