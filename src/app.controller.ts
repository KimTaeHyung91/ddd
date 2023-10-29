import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from './base/response/base-response';

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
}
