import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { BaseResponse } from '../response/base-response';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): any {
    const httpArgumentsHost = host.switchToHttp();
    const request = httpArgumentsHost.getRequest<Request>();
    const { httpAdapter } = this.httpAdapterHost;
    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : exception instanceof Error
        ? exception
        : null;

    httpAdapter.reply(
      httpArgumentsHost.getResponse(),
      BaseResponse.fail(
        exceptionResponse['message'] ||
          exceptionResponse['errmsg'] ||
          'interval server error',
        exceptionResponse['errorCode'] || HttpStatus.INTERNAL_SERVER_ERROR + '',
      ),
    );
  }
}
