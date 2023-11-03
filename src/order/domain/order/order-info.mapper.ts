import { ClassConstructor, plainToInstance } from 'class-transformer';
import { OrderEntity } from './order.entity';
import { OrderInfo } from './order.info';

export namespace OrderInfoMapper {
  export function of(
    cls: ClassConstructor<OrderInfo.Main>,
    orderEntity: OrderEntity,
  ) {
    return plainToInstance(cls, orderEntity);
  }
}
