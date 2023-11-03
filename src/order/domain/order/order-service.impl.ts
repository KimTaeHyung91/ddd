import { IOrderService } from './order-service.interface';
import { Inject, Injectable } from '@nestjs/common';
import { OrderCommand } from './order.command';
import { IOrderWriter } from './order-writer.interface';
import { Transactional } from '../../../common/transactional/transactional';

@Injectable()
export class OrderServiceImpl implements IOrderService {
  constructor(
    @Inject(IOrderWriter)
    private readonly orderWriter: IOrderWriter,
  ) {}

  @Transactional()
  async registerOrder(request: OrderCommand.RegisterOrder): Promise<string> {
    const orderEntity = request.toEntity();
    this.orderWriter.store(orderEntity);

    return orderEntity.orderToken;
  }
}
