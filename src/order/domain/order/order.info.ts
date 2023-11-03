import { Expose, Transform, Type } from 'class-transformer';
import { LocalDateTime } from '@js-joda/core';
import { EnumTools } from 'ts-jenum';
import { OrderStatusDesc } from './order.entity';
import { get } from 'lodash';

export namespace OrderInfo {
  export class Main {
    @Expose({ name: 'id' })
    readonly orderId: string;

    @Expose()
    readonly orderToken: string;

    @Expose({ name: 'deliveryFragment' })
    @Type(() => DeliveryInfo)
    readonly deliveryInfo: DeliveryInfo;

    @Expose()
    readonly orderDate: LocalDateTime;

    @Expose()
    readonly status: string;

    @Expose({ name: 'status' })
    @Transform(
      ({ obj }) =>
        EnumTools.pairs(OrderStatusDesc).find(
          (item) => item.value === get(obj, 'status'),
        ).value,
    )
    readonly statusDesc: string;
  }

  export class DeliveryInfo {
    @Expose()
    readonly receiverName: string;

    @Expose()
    readonly receiverPhone: string;

    @Expose()
    readonly receiverZipcode: string;

    @Expose()
    readonly receiverAddress1: string;

    @Expose()
    readonly receiverAddress2: string;

    @Expose()
    readonly etcMessage: string;
  }
}
