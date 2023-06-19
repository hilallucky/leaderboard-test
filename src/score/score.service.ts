import { HttpCode, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { Score } from './entities/score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { BaseResponseData } from 'src/common/base-response/base-response-data.model';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
    private readonly logsService: LogsService,
    private userService: UsersService,
    private readonly response: BaseResponseData<any> = new BaseResponseData<any>(),
  ) { }

  async create(
    createScoreDto: CreateScoreDto,
    user: any,
    req,
  ) {
    const createLogDto: CreateLogDto = new CreateLogDto;
    createLogDto.endpoint = req.url;
    createLogDto.http_version = req.httpVersion;
    createLogDto.ip_address = req.ip;
    createLogDto.http_method = req.method;
    createLogDto.request_header = JSON.stringify(req.rawHeaders);
    createLogDto.request_body = JSON.stringify(req.body);
    createLogDto.createdBy = user.email;
    createLogDto.response_code = HttpStatus.UNAUTHORIZED;

    try {
      if (req.user.user_type !== "admin" && createScoreDto.player_id !== req.user.id) {
        throw new UnauthorizedException();
      }

      const checkPlayerID = await this.userService.findOneById(createScoreDto.player_id);
      if (!checkPlayerID.data) {
        throw new UnauthorizedException();
      }

      const newScore: Score = await this.scoreRepository.save(createScoreDto);

      createLogDto.response_code = HttpStatus.CREATED;
      const data = await this.findAll(newScore.player_id, user);
      this.response.successMessage(data.data, HttpStatus.CREATED, `Success add new score`);

    } catch (error) {
      if (error.status === 401) {
        const ret = {
          "statusCode": HttpStatus.UNAUTHORIZED,
          "message": error.message
        };

        createLogDto.response_body = JSON.stringify(ret);
        this.logsService.create(createLogDto);

        this.response.unauthorizedResponse(HttpStatus.UNAUTHORIZED, error.message);
      } else {
        const ret = {
          "statusCode": HttpStatus.UNAUTHORIZED,
          "message": `Invalid Player ID!`
        };

        createLogDto.response_body = JSON.stringify(ret);
        this.logsService.create(createLogDto);

        this.response.successMessage(null, HttpStatus.OK, `Invalid Player ID!`);
      }
    }

    createLogDto.response_body = JSON.stringify(this.response);
    this.logsService.create(createLogDto);

    return this.response;
  }

  async findAll(player_id: number, user: any) {
    try {
      if (user.user_type == "player") {
        player_id = user.id;
      }

      const data = await this.scoreRepository.find({
        where: { player_id: player_id },
        order: { score: 'DESC' },
        take: 10,
      });

      this.response.successMessage(data, HttpStatus.OK, `Success add new score`);
    } catch (error) {
      this.response.successMessage(null, HttpStatus.OK, `Invalid Player ID!`);
    }

    return this.response;
  }
}
