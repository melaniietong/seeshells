import type { ApiCode } from ',,/../../shared/constants/api';

export class MiddlewareError extends Error {
  code: ApiCode;

  constructor(code: ApiCode) {
    super(code); 
    this.code = code;
  }
}