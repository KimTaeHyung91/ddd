import { OrderEntity } from './order.entity';

export const IOrderWriter = Symbol('IOrderWriter');

export interface IOrderWriter {
  store(order: OrderEntity): void;
}
