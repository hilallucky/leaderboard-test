import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { BaseResponseData } from 'src/common/base-response/base-response-data.model';

export type User = any;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private readonly response: BaseResponseData<any> = new BaseResponseData<any>(),
  ) { }

  async findOneById(id: number) {
    try {
      const data = await this.userRepo.findOneByOrFail({ id: id });
      this.response.successMessage(data, HttpStatus.OK, `Success`);
    } catch (error) {
      this.response.successMessage(null, HttpStatus.OK, `Invalid Player ID!`);
    }

    return this.response;
  }

}