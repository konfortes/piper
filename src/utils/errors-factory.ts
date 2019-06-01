import HttpStatus from 'http-status-codes';

// All possible errors codes
export enum ErrorCode {
  Internal,
  Authorization,
  Validation
}

interface ErrorOptions {
  msg: string;
  errorCode: ErrorCode;
  httpCode: number;
}

export class CustomError extends Error {
  public errorCode: ErrorCode;
  public httpCode: number;

  constructor(opts: ErrorOptions) {
    super(opts.msg);

    this.httpCode = opts.httpCode;
    this.errorCode = opts.errorCode;
  }
}

export const authorizationError = (msg = 'Authorization error') => {
  return new CustomError({
    errorCode: ErrorCode.Authorization,
    msg: msg,
    httpCode: HttpStatus.UNAUTHORIZED
  });
};
