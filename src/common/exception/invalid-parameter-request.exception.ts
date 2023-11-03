export class InvalidParameterRequestException extends Error {
  readonly errorCode: string;

  constructor(message: string, errorCode: string) {
    super(`${InvalidParameterRequestException.name} ${message}`);
    this.errorCode = errorCode;
  }
}
