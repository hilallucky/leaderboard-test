import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { BaseResponse } from './base-response.model';

export class BaseResponseData<T> extends BaseResponse {
  data: T;

  successMessage(
    data: T,
    statusCode: number,
    message: string
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  failedMessage(
    statusCode: number,
    message: string
  ) {
    this.statusCode = statusCode;
    this.message = message;
  }

  failedMessageWithstring(
    statusCode: number,
    message: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
  }

  failedMessageWithstringAndData(
    statusCode: number,
    message: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
  }

  unauthorizedResponse(
    statusCode: number,
    message: string,
  ) {
    this.statusCode = statusCode || 401;
    this.message = message;
    throw new UnauthorizedException({
      code: this.statusCode,
      message: this.message,
    });
  }

  internalServerErrorResponse(
    statusCode: number,
    message: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    throw new InternalServerErrorException({
      code: this.statusCode,
      message: this.message,
    });
  }

  badRequestResponse(
    statusCode: number,
    message: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    throw new BadRequestException({
      code: this.statusCode,
      message: this.message,
    });
  }

  missingFieldMessage(
    statusCode: number,
    missingFieldName: string
  ) {
    this.statusCode = statusCode;
    this.message = 'Missing Field(s): '.concat(missingFieldName);
  }

  conflictRequestResponse(
    statusCode: number,
    message: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    throw new ConflictException({
      code: this.statusCode,
      message: this.message,
    });
  }
}
