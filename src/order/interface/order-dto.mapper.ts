import { ClassConstructor, plainToInstance } from 'class-transformer';
import { OrderCommand } from '../domain/order/order.command';
import { OrderDto } from './order.dto';

export namespace OrderDtoMapper {
  export function of(
    cls: ClassConstructor<OrderCommand.RegisterOrder>,
    target: Record<string, any>,
  ): OrderCommand.RegisterOrder;

  export function of(
    cls: ClassConstructor<OrderDto.RegisterResponse>,
    target: Record<string, any>,
  ): OrderDto.RegisterResponse;

  export function of(
    cls:
      | ClassConstructor<OrderCommand.RegisterOrder>
      | ClassConstructor<OrderDto.RegisterResponse>,
    target: Record<string, any>,
  ) {
    if (cls.name === OrderCommand.RegisterOrder.name) {
      return plainToInstance(OrderCommand.RegisterOrder, target);
    }

    if (cls.name === OrderDto.RegisterResponse.name) {
      return plainToInstance(OrderDto.RegisterResponse, target);
    }
  }
}
