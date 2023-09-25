import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUpData } from './dto/userPipe';
import { JwtAuthGuardCheck } from '../guard/JwtAuthGuardCheck.guard';

@Controller('api/v1/admins')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //Đăng nhập
  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() userSignupData: UserSignUpData,
  ): Promise<{ status: number; message: string }> {
    console.log(userSignupData);

    return await this.usersService.createService(userSignupData);
  }

  // lấy toàn bộ users
  @Get()
  @UseGuards(JwtAuthGuardCheck)
  async getUserEndpoint() {
    return await this.usersService.getUser();
  }

  //chỉnh sửa user
  @Patch(':id')
  @UseGuards(JwtAuthGuardCheck)
  async updateUser(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(req, id, updateUserDto);
  }

  //logout
  @UseGuards(JwtAuthGuardCheck)
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.usersService.userLogout(request, res);
  }
}
