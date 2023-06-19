import {
  Bind, HttpCode, HttpStatus, Injectable, Req, Request, Res, Response,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { HashingService } from 'src/common/hashing/hashing.service';
import { JWTPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BaseResponseData } from 'src/common/base-response/base-response-data.model';
import { Http2ServerRequest } from 'http2';
import { LogsService } from 'src/logs/logs.service';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {

  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private readonly logsService: LogsService,
    private readonly jwtService: JwtService,
    private readonly response: BaseResponseData<any> = new BaseResponseData<any>(),
  ) { }

  async login(
    loginDto: LoginDto,
    req,
  ): Promise<any> {

    const createLogDto: CreateLogDto = new CreateLogDto
    createLogDto.endpoint = req.url;
    createLogDto.http_version = req.httpVersion;
    createLogDto.ip_address = req.ip;
    createLogDto.http_method = req.method;
    createLogDto.request_header = JSON.stringify(req.rawHeaders);
    createLogDto.request_body = JSON.stringify(req.body);
    createLogDto.createdBy = req.body.email;
    createLogDto.response_code = HttpStatus.UNAUTHORIZED;

    try {
      const user = await this.userRepo.findOne(
        { where: { email: loginDto.email } }
      );

      if (!user) {
        const ret = {
          "code": HttpStatus.UNAUTHORIZED,
          "message": `Invalid email. You are unauthorized!`
        };

        createLogDto.response_body = JSON.stringify(ret);
        this.logsService.create(createLogDto);

        throw new UnauthorizedException(ret);
      }

      const passwordMatches = await bcrypt.compare(loginDto.password, user.password);

      if (!passwordMatches) {
        const ret = {
          "code": HttpStatus.UNAUTHORIZED,
          "message": `Invalid password. You are unauthorized!`
        };

        createLogDto.response_body = JSON.stringify(ret);
        this.logsService.create(createLogDto);

        throw new UnauthorizedException(ret);
      } else {
        const payload: JWTPayload = {
          id: user.id,
          name: user.name,
          user_type: user.user_type,
          email: user.email,
        };
        const token = this.jwtService.sign(payload);

        const data = {
          token: token,
          user: {
            id: user.id,
            name: user.name,
            user_type: user.user_type,
            email: user.email,
          },
        };

        createLogDto.response_code = HttpStatus.OK;
        this.response.successMessage(data, HttpStatus.OK, `Login success.`);
        // console.log(token);
      }
    } catch (error) {
      this.response.unauthorizedResponse(HttpStatus.UNAUTHORIZED, `Invalid email/password!`);
    }

    createLogDto.response_body = JSON.stringify(this.response);
    this.logsService.create(createLogDto);

    return this.response;
  }

}
