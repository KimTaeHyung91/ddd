import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseResponse } from '../response/base-response';

@Catch(HttpException)
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const httpArgumentsHost = host.switchToHttp();
    const request = httpArgumentsHost.getRequest<Request>();
    if (request.url !== '/favicon.ico') {
      const response = httpArgumentsHost.getResponse<Response>();
      const exceptionResponse = exception.getResponse();
      response.json(
        BaseResponse.fail(
          exceptionResponse['message'],
          exceptionResponse['errorCode'],
        ),
      );
    }
  }
}
