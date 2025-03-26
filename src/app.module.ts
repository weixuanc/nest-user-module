import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { JwtModule } from '@nestjs/jwt';

import { User } from './user/entities/user.entity';
import { Permission } from './user/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'login_test',
      synchronize: true,
      logging: false,
      entities: [User, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugins: 'sha256_password'
      }
    }),
    JwtModule.register({
      global: true, // 声明为全局模块，不用每个模块都引入
      secret: 'test',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
