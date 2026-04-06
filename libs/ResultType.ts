import { ENUM_STATUS_CODES_FAILURE, ENUM_STATUS_CODES_SUCCESS } from "./status-codes-enums";

/** This is an experimental Result class with extra typing.
 * However, it is not used currently, because it seems to be abit too excessive,
 * when used there is a lot of checks and edge cases that needs to be done.
 * But, if remove FailureWithData, this may be better than the original Result.ts
 */

export abstract class Result<T> {
  protected constructor(
    readonly _tag: "Success" | "Failure",
    protected readonly value: T,
    protected readonly message: string
  ) { }

  static succeed<T>(statusCode: ENUM_STATUS_CODES_SUCCESS, data: T, message: string): Success<T> {
    return new Success(statusCode, data, message);
  }

  static fail(statusCode: ENUM_STATUS_CODES_FAILURE, message: string): Failure;
  static fail<T>(statusCode: ENUM_STATUS_CODES_FAILURE, message: string, data: T): FailureWithData<T>;


  static fail<T>(statusCode: ENUM_STATUS_CODES_FAILURE, message: string, data?: T): Failure | FailureWithData<T> {
    if (data === undefined) {
      return new Failure(statusCode, message);
    }
    return new FailureWithData(statusCode, data, message);
  }

  abstract isSuccess(): this is Success<T>;
  abstract isFailure(): this is Failure;
  abstract isFailureWithData(): this is FailureWithData<T>;

  getMessage(): string {
    return this.message;
  }

}

export class Success<T> extends Result<T> {

  protected readonly statusCode: ENUM_STATUS_CODES_SUCCESS;

  constructor(statusCode: ENUM_STATUS_CODES_SUCCESS, data: T, message: string) {
    super("Success", data, message);

    this.statusCode = statusCode;
  }

  isSuccess(): this is Success<T> {
    return true;
  }

  isFailure(): this is Failure {
    return false;
  }

  isFailureWithData(): this is FailureWithData<T> {
    return false;
  }

  getData(): T {
    return this.value;
  }

  getStatusCode(): ENUM_STATUS_CODES_SUCCESS {
    return this.statusCode;
  }
}

export class Failure extends Result<never> {

  protected readonly statusCode: ENUM_STATUS_CODES_FAILURE;


  constructor(statusCode: ENUM_STATUS_CODES_FAILURE, message: string) {
    super("Failure", null as never, message);
    this.statusCode = statusCode;
  }

  isSuccess(): this is Success<never> {
    return false;
  }

  isFailure(): this is Failure {
    return true;
  }

  isFailureWithData(): this is FailureWithData<never> {
    return false;
  }

  getStatusCode(): ENUM_STATUS_CODES_FAILURE {
    return this.statusCode;
  }
}

export class FailureWithData<T> extends Result<T> {

  protected readonly statusCode: ENUM_STATUS_CODES_FAILURE;

  constructor(statusCode: ENUM_STATUS_CODES_FAILURE, data: T, message: string) {
    super("Failure", data, message);
    this.statusCode = statusCode;
  }

  isSuccess(): this is Success<never> {
    return false;
  }

  isFailure(): this is Failure {
    return false;
  }

  isFailureWithData(): this is FailureWithData<T> {
    return true;
  }

  getStatusCode(): ENUM_STATUS_CODES_FAILURE {
    return this.statusCode;
  }

  getData(): T {
    return this.value;
  }
}