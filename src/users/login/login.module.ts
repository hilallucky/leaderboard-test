import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { HashingService } from 'src/common/hashing/hashing.service';
import { BcryptService } from 'src/common/hashing/bcrypt.service';
import { BaseResponseData } from 'src/common/base-response/base-response-data.model';
import { LogsService } from 'src/logs/logs.service';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';
import { Log } from 'src/logs/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Log
    ]),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    LogsService,
    CreateLogDto,
    BaseResponseData,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ]
})
export class LoginModule { }
