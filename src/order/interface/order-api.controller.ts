import { Body, Controller, Post } from '@nestjs/common';
import { OrderDto } from './order.dto';
import { OrderFacade } from '../application/order.facade';
import { BaseResponse } from '../../common/response/base-response';
import { OrderCommand } from '../domain/order/order.command';
import { OrderDtoMapper } from './order-dto.mapper';

@Controller('/api/v1/order')
export class OrderApiController {
  constructor(private readonly orderFacade: OrderFacade) {}

  @Post()
  async registerOrder(
    @Body() request: OrderDto.RegisterOrderRequest,
  ): Promise<BaseResponse<OrderDto.RegisterResponse>> {
    const of = OrderDtoMapper.of(OrderCommand.RegisterOrder, request);
    const orderToken = await this.orderFacade.registerOrder(of);
    const registerResponse = OrderDtoMapper.of(OrderDto.RegisterResponse, {
      orderToken,
    });

    return BaseResponse.success(registerResponse);
  }
}
