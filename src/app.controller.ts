import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from './common/response/base-response';

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
    return BaseResponse.success<{ text: string }>({
      text: `${this.appService.getHello2(id)}, id: ${id}`,
    });
  }
}
