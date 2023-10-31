import { Expose } from 'class-transformer';

export class BaseResponse<T> {
  @Expose()
  readonly result: Result;

  @Expose()
  readonly data: T;

  @Expose()
  readonly message: string;

  @Expose()
  readonly errorCode: string;

  private constructor(
    props: Partial<{
      data: T;
      message: string;
      errorCode: string;
      result: Result;
    }>,
  ) {
    this.data = props.data;
    this.message = props.message;
    this.errorCode = props.errorCode;
    this.result = props.result;
  }

  static success<T>(data: T, message: string = null) {
    return new this({ data, message, result: Result.SUCCESS, errorCode: null });
  }

  static fail(message: string, errorCode: string) {
    return new this({ data: null, result: Result.FAIL, message, errorCode });
  }
}

enum Result {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
