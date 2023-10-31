import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { BaseResponse } from '../response/base-response';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): any {
    const httpArgumentsHost = host.switchToHttp();
    const request = httpArgumentsHost.getRequest<Request>();
    if (request.url !== '/favicon.ico') {
      const { httpAdapter } = this.httpAdapterHost;
      const exceptionResponse = exception.getResponse();
      httpAdapter.reply(
        httpArgumentsHost.getResponse(),
        BaseResponse.fail(
          exceptionResponse['message'],
          exceptionResponse['errorCode'],
        ),
      );
    }
  }
}
