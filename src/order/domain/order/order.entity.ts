import {
  Embedded,
  Entity,
  Enum,
  Index,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { BaseEntity, Mutable } from '../../../common/entity/base.entity';
import { DeliveryFragment } from './fragment/delivery.fragment';
import { LocalDateTime } from '@js-joda/core';
import { RandomStringUtil } from '../../../common/util/random-string.util';
import { DateUtil } from '../../../common/util/date.util';

@Entity({ tableName: 'order' })
@Index({ name: 'order_index1', properties: 'orderToken' })
@Index({ name: 'order_index2', properties: 'createdAt' })
@Index({ name: 'order_index3', properties: 'updatedAt' })
export class OrderEntity extends BaseEntity<OrderEntity> {
  @PrimaryKey({ autoincrement: true })
  readonly id: number;

  @Property({ length: 32 })
  readonly orderToken: string;

  @Property({ type: 'timestamptz' })
  readonly orderDate: Date;

  @Embedded(() => DeliveryFragment, { prefix: 'delivery_' })
  readonly deliveryFragment: DeliveryFragment;

  @Enum(() => OrderStatus)
  readonly status: OrderStatus;

  private constructor(props: Mutable<OrderEntity>) {
    super();
    this.orderToken = props.orderToken;
    this.orderDate = props.orderDate;
    this.deliveryFragment = props.deliveryFragment;
    this.status = props.status;
  }

  static of(props: Omit<Partial<Mutable<OrderEntity>>, 'id'>) {
    props.orderToken = RandomStringUtil.generate();
    props.status = OrderStatus.INIT;
    props.orderDate = DateUtil.toJsDate(LocalDateTime.now());

    return new OrderEntity({
      orderToken: props.orderToken,
      deliveryFragment: props.deliveryFragment,
      orderDate: props.orderDate,
      status: props.status,
    });
  }
}

export enum OrderStatus {
  INIT = 'INIT',
  ORDER_COMPLETE = 'ORDER_COMPLETE',
  DELIVERY_PREPARE = 'DELIVERY_PREPARE',
  IN_DELIVERY = 'IN_DELIVERY',
  DELIVERY_COMPLETE = 'DELIVERY_COMPLETE',
}

export enum OrderStatusDesc {
  INIT = '주문시작',
  ORDER_COMPLETE = '주문완료',
  DELIVERY_PREPARE = '배송준비',
  IN_DELIVERY = '배송중',
  DELIVERY_COMPLETE = '배송완료',
}
