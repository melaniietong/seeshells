import type { ApiCode } from '../constants/api.js';

export interface ApiResponse<T = any> {
    code: ApiCode,
    message: string
    data?: T;
};

export interface PossibleLabel {
    description: string|undefined,
    score: number|undefined
};