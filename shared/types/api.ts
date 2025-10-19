import type { ApiCode } from '../constants/api.js';

export interface ApiResponse<T = any> {
    code: ApiCode,
    message: string
    data: PossibleLabel[]|[];
};

export interface PossibleLabel {
    description: string|undefined,
    score: number|undefined
};