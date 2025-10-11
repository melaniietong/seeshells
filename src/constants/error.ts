import type { ApiCode } from './api.js';

export class MiddlewareError extends Error {
  code: ApiCode;

  constructor(code: ApiCode) {
    super(code); 
    this.code = code;
  }
}