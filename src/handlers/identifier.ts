import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '../types/api.js'
import { API_CODES, API_RESPONSES } from '../constants/api.js';
import { HTTP_CODES } from '../constants/http.js';
import vision from '@google-cloud/vision';
import type { PossibleLabel } from '../types/vision.js';

const visionClient = new vision.ImageAnnotatorClient();

export async function identifier(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
        const response: ApiResponse = {
            code: API_CODES.BAD_REQUEST_NO_FILE,
            message: API_RESPONSES.get(API_CODES.BAD_REQUEST_NO_FILE) ?? ''
        };
        
        return res.status(HTTP_CODES.BAD_REQUEST).json(response);
    }

    const [result] = await visionClient.labelDetection({
        image: { content: req.file.buffer }
    })

    const possibleLabels: PossibleLabel[] = (result.labelAnnotations ?? []).map(label => ({
        description: label.description ?? '',
        score: label.score ?? 0
    }))

    const response: ApiResponse<{ 
        fileName: string; 
        fileSize: number;
        possibleLabels: PossibleLabel[]
    }> = {
        code: API_CODES.UPLOAD_SUCCESS,
        message: API_RESPONSES.get(API_CODES.UPLOAD_SUCCESS) ?? '',
        data: {
            fileName:       req.file.originalname,
            fileSize:       req.file.size,
            possibleLabels: possibleLabels
        }
    };

    res.status(HTTP_CODES.OK).json(response);
}