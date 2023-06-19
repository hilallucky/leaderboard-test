import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { LoginService } from 'src/users/login/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { HashingService } from 'src/common/hashing/hashing.service';
import { BcryptService } from 'src/common/hashing/bcrypt.service';
import { RegisterService } from 'src/users/register/register.service';
import { BaseResponseData } from 'src/common/base-response/base-response-data.model';
import { LogsService } from 'src/logs/logs.service';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';
import { Log } from 'src/logs/entities/log.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      Users,
      Log,
    ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LoginService,
    LogsService,
    CreateLogDto,
    RegisterService,
    BaseResponseData,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
