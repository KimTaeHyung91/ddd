import { Injectable } from '@nestjs/common';
import { InvalidParameterRequestException } from './common/exception/invalid-parameter-request.exception';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHello2(id: string) {
    if (id === '2') {
      throw new InvalidParameterRequestException(
        `invalid parameter, id: ${id}`,
        '400001',
      );
    }

    return 'Hello World2!';
  }
}
