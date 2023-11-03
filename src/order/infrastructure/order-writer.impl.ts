import { IOrderWriter } from '../domain/order/order-writer.interface';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../domain/order/order.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class OrderWriterImpl implements IOrderWriter {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: EntityRepository<OrderEntity>,
  ) {}

  store(order: OrderEntity): void {
    this.repository.getEntityManager().persist(order);
  }
}
