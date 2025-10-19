import type { Request, Response, NextFunction } from 'express';
import { API_RESPONSES } from '../../shared/constants/api.js';
import type { ApiResponse } from '../../shared/types/api.js';
import { MiddlewareError } from '../constants/error.js';
import { HTTP_CODES } from '../constants/http.js';

export function middlewareErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof MiddlewareError) {
    const response: ApiResponse = {
      code: err.code,
      message: API_RESPONSES.get(err.code) ?? '',
      data: []
    };

    return res.status(HTTP_CODES.BAD_REQUEST).json(response);
  }

  next(err);
}