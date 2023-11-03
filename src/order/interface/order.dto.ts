import { Expose } from 'class-transformer';
import { LocalDateTime } from '@js-joda/core';
import { IsNotEmpty } from 'class-validator';

export namespace OrderDto {
  export class RegisterOrderRequest {
    @Expose()
    @IsNotEmpty({ message: 'receiverName 은 필수값입니다.' })
    readonly receiverName: string;

    @Expose()
    @IsNotEmpty({ message: 'receiverPhone 은 필수값입니다.' })
    readonly receiverPhone: string;

    @Expose()
    @IsNotEmpty({ message: 'receiverZipcode 은 필수값입니다.' })
    readonly receiverZipcode: string;

    @Expose()
    @IsNotEmpty({ message: 'receiverAddress1 은 필수값입니다.' })
    readonly receiverAddress1: string;

    @Expose()
    @IsNotEmpty({ message: 'receiverAddress2 은 필수값입니다.' })
    readonly receiverAddress2: string;

    @Expose()
    @IsNotEmpty({ message: 'etcMessage 은 필수값입니다.' })
    readonly etcMessage: string;
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

  export class Main {
    @Expose()
    readonly orderId: string;

    @Expose()
    readonly orderToken: string;

    @Expose()
    readonly deliveryInfo: DeliveryInfo;

    @Expose()
    readonly orderDate: LocalDateTime;

    @Expose()
    readonly status: string;

    @Expose()
    readonly statusDesc: string;
  }

  export class RegisterResponse {
    @Expose()
    readonly orderToken: string;
  }
}
