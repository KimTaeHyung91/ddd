import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from './common/response/base-response';
import { InvalidParameterRequestException } from './common/exception/invalid-parameter-request.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): BaseResponse<{ text: string }> {
    return BaseResponse.success<{ text: string }>({
      text: this.appService.getHello(),
    });
  }

  @Get('/fail/hello2')
  getHello2(): BaseResponse<any> {
    return BaseResponse.fail('fail', '404000');
  }

  @Get('/fail/hello2/:id')
  getHello3(@Param('id') id: string): BaseResponse<any> {
    if (+id === 2) {
      throw new InvalidParameterRequestException(
        `invalid parameter, id: ${id}`,
        '400001',
      );
    }

    return BaseResponse.success<{ text: string }>({
      text: `${this.appService.getHello()}, id: ${id}`,
    });
  }
}
