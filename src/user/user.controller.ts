import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Res, ValidationPipe, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Inject(JwtService)
  private jwtService: JwtService

  @Post('jwt/login')
  async jwtLogin(@Body(ValidationPipe) user: LoginDto, @Res({ passthrough: true }) res: Response) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      const token = await this.jwtService.signAsync({
        user: {
          id: foundUser.id,
          username: foundUser.username
        }
      })
      res.setHeader('token', token);
      return 'JWT登录成功';
    } else {
      return 'JWT登录失败';
    }
  }

  @Post('session/login')
  async sessionLogin(
    @Body(ValidationPipe) user: LoginDto,
    @Session() session
  ) {
    const foundUser = await this.userService.login(user);
    if (foundUser) {
      session.user = {
        username: user.username
      }
      return 'Session登录成功';
    } else {
      return 'Session登录失败';
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterDto) {
    return await this.userService.register(user);
  }

  @Get('init')
  async initData() {
    await this.userService.initData();
    return 'done'
  }

}
