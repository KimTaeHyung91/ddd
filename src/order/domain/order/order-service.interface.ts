import { OrderCommand } from './order.command';

export const IOrderService = Symbol('IOrderService');

export interface IOrderService {
  registerOrder(request: OrderCommand.RegisterOrder): Promise<string>;
}
