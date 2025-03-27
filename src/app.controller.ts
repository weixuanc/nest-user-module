import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './user/guard/jwt.guard';
import { SessionGuard } from './user/guard/session.guard';
import { PermissionGuard } from './user/guard/permission.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtGuard)
  @Get('aaa')
  aaa() {
    return 'aaa';
  }

  @UseGuards(SessionGuard, PermissionGuard)
  @SetMetadata('permission', 'query_bbb')
  @Get('bbb')
  bbb() {
    return 'bbb';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
