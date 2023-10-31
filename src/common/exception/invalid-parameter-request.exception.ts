import { HttpException } from '@nestjs/common';

export class InvalidParameterRequestException extends HttpException {
  constructor(message: string, errorCode: string) {
    super({ message, errorCode }, 400);
  }
}
