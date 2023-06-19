import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScoreModule } from './score/score.module';
import { LogsModule } from './logs/logs.module';

const cf = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.dev', '.env.stage', '.env.prod'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: cf.get<string>('DB_HOST'),
      port: cf.get<number>('DB_PORT'),
      username: cf.get<string>('DB_USERNAME'),
      password: cf.get<string>('DB_PASSWORD'),
      database: cf.get<string>('DB_NAME'),
      synchronize: cf.get<boolean>('DB_SYNC'),
      entities: [__dirname + '/**/*.{model,entity}.{ts,js}'],
      migrations: ['dist/migrations/**/*.js'],
      subscribers: ['dist/subscriber/**/*.js'],
      logging: false
    }),
    AuthModule,
    UsersModule,
    ScoreModule,
    LogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
