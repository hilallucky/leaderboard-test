import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { Users } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HashingService } from 'src/common/hashing/hashing.service';
import { BaseResponseData } from 'src/common/base-response/base-response-data.model';
import { CreateLogDto } from 'src/logs/dto/create-log.dto';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private readonly logsService: LogsService,
    private readonly hashingService: HashingService,
    private readonly response: BaseResponseData<any> = new BaseResponseData<any>(),
  ) { }

  async create(
    createRegisterDto: CreateRegisterDto,
    req,
  ) {
    const createLogDto: CreateLogDto = new CreateLogDto
    createLogDto.endpoint = req.url;
    createLogDto.http_version = req.httpVersion;
    createLogDto.ip_address = req.ip;
    createLogDto.http_method = req.method;
    createLogDto.request_header = JSON.stringify(req.rawHeaders);
    createLogDto.request_body = JSON.stringify(req.body);
    createLogDto.createdBy = req.body.email;
    createLogDto.response_code = HttpStatus.OK;

    try {
      createRegisterDto.password = await this.hashingService.hash(createRegisterDto.password);;

      const newUser: Users = await this.userRepo.save(createRegisterDto);

      const data = {
        "id": newUser.id,
        "name": newUser.name,
        "user_type": newUser.user_type,
        "username": newUser.username,
        "email": newUser.email,
        "createdAt": newUser.createdAt,
        "createdBy": newUser.createdBy,
        "updatedAt": newUser.updatedAt || newUser.createdAt,
        "updatedBy": newUser.updatedBy || newUser.createdBy
      };

      this.response.successMessage(data, HttpStatus.CREATED, `${newUser.name} has been registered.`);

      createLogDto.response_code = HttpStatus.CREATED;
      createLogDto.response_body = JSON.stringify(this.response);
      this.logsService.create(createLogDto);

    } catch (error) {
      const ret = {
        "code": HttpStatus.CONFLICT,
        "message": (error.driverError.errno == 1062) ? error.driverError.sqlMessage : error
      };

      createLogDto.response_body = JSON.stringify(ret);
      this.logsService.create(createLogDto);

      throw new ConflictException(ret);
    }

    return this.response;
  }
}
