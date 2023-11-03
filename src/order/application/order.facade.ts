import { Inject, Injectable } from '@nestjs/common';
import { IOrderService } from '../domain/order/order-service.interface';
import { OrderCommand } from '../domain/order/order.command';

@Injectable()
export class OrderFacade {
  constructor(
    @Inject(IOrderService)
    private readonly orderService: IOrderService,
  ) {}

  async registerOrder(request: OrderCommand.RegisterOrder): Promise<string> {
    return await this.orderService.registerOrder(request);
  }
}
