import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/users/entities/user.entity';
import { BaseResponseData } from 'src/common/base-response/base-response-data.model';
import { LogsService } from 'src/logs/logs.service';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';
import { Log } from 'src/logs/entities/log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Score,
      Users,
      Log
    ])
  ],
  controllers: [ScoreController],
  providers: [
    LogsService,
    CreateLogDto,
    ScoreService,
    UsersService,
    BaseResponseData,
  ]
})
export class ScoreModule { }
