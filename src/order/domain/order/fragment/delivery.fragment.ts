import { Embeddable, Property } from '@mikro-orm/core';
import { Mutable } from '../../../../common/entity/base.entity';
import { isEmpty } from 'lodash';
import { InvalidParameterRequestException } from '../../../../common/exception/invalid-parameter-request.exception';

@Embeddable()
export class DeliveryFragment {
  @Property()
  readonly receiverName: string;

  @Property()
  readonly receiverPhone: string;

  @Property()
  readonly receiverZipcode: string;

  @Property()
  readonly receiverAddress1: string;

  @Property()
  readonly receiverAddress2: string;

  @Property()
  readonly etcMessage: string;

  private constructor(
    receiverName: string,
    receiverPhone: string,
    receiverZipcode: string,
    receiverAddress1: string,
    receiverAddress2: string,
    etcMessage: string,
  ) {
    this.receiverName = receiverName;
    this.receiverPhone = receiverPhone;
    this.receiverZipcode = receiverZipcode;
    this.receiverAddress1 = receiverAddress1;
    this.receiverAddress2 = receiverAddress2;
    this.etcMessage = etcMessage;
  }

  static of(props: Mutable<DeliveryFragment>): DeliveryFragment {
    if (isEmpty(props.receiverName)) {
      throw new InvalidParameterRequestException(
        'DeliveryFragment.receiverName',
        '40001',
      );
    }

    if (isEmpty(props.receiverPhone)) {
      throw new InvalidParameterRequestException(
        'DeliveryFragment.receiverPhone',
        '40001',
      );
    }

    if (isEmpty(props.receiverZipcode)) {
      throw new InvalidParameterRequestException(
        'DeliveryFragment.receiverZipcode',
        '40001',
      );
    }

    if (isEmpty(props.receiverAddress1)) {
      throw new InvalidParameterRequestException(
        'DeliveryFragment.receiverAddress1',
        '40001',
      );
    }

    if (isEmpty(props.receiverAddress2)) {
      throw new InvalidParameterRequestException(
        'DeliveryFragment.receiverAddress2',
        '40001',
      );
    }

    if (isEmpty(props.etcMessage)) {
      throw new InvalidParameterRequestException(
        'DeliveryFragment.etcMessage',
        '40001',
      );
    }

    return new DeliveryFragment(
      props.receiverName,
      props.receiverPhone,
      props.receiverZipcode,
      props.receiverAddress1,
      props.receiverAddress2,
      props.etcMessage,
    );
  }
}
