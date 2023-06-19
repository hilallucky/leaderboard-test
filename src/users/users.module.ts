import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { Users } from './entities/user.entity';
import { BaseResponseData } from 'src/common/base-response/base-response-data.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    RegisterModule,
    LoginModule
  ],
  providers: [
    UsersService,
    BaseResponseData,
  ],
  exports: [UsersService],
})
export class UsersModule { }
