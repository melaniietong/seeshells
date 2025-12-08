import type { ApiCode } from '../constants/api.js';

export interface ApiResponse {
    code: ApiCode,
    message: string
    data: PossibleLabel[]|[];
};

export interface PossibleLabel {
    description: string|undefined,
    score: number|undefined
};