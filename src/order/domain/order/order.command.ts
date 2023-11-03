import { Expose } from 'class-transformer';
import { OrderEntity } from './order.entity';
import { DeliveryFragment } from './fragment/delivery.fragment';

export namespace OrderCommand {
  export class RegisterOrder {
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

    toEntity(): OrderEntity {
      const deliveryFragment = DeliveryFragment.of({
        receiverName: this.receiverName,
        receiverPhone: this.receiverPhone,
        receiverZipcode: this.receiverZipcode,
        receiverAddress1: this.receiverAddress1,
        receiverAddress2: this.receiverAddress2,
        etcMessage: this.etcMessage,
      });

      return OrderEntity.of({
        deliveryFragment,
      });
    }
  }
}
