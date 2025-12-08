import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse, PossibleLabel } from '../../shared/types/api.js'
import { API_CODES, API_RESPONSES } from '../../shared/constants/api.js';
import { HTTP_CODES } from '../../shared/constants/http.js';
import { PredictionServiceClient } from '@google-cloud/aiplatform';
import type { protos } from '@google-cloud/aiplatform';
import { formatName } from '../utils/format.js';

const PROJECT_ID = process.env.GC_PROJECT_ID;
const REGION: string = 'us-central1';
const ENDPOINT_ID = process.env.VERTEX_ENDPOINT_ID;

const vertexClient: PredictionServiceClient = new PredictionServiceClient({
    apiEndpoint: `${REGION}-aiplatform.googleapis.com`
});

export async function identify(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.file) {
            const response: ApiResponse = {
                code: API_CODES.BAD_REQUEST_NO_FILE,
                message: API_RESPONSES.get(API_CODES.BAD_REQUEST_NO_FILE) ?? '',
                data: []
            };

            return res.status(HTTP_CODES.BAD_REQUEST).json(response);
        }

        const endpoint = `projects/${PROJECT_ID}/locations/${REGION}/endpoints/${ENDPOINT_ID}`;

        const fileBuffer = req.file.buffer;

    // Vertex AI expects instance to be a protobuf `Value` object
    const instance: protos.google.protobuf.IValue = {
        structValue: {
            fields: {
                content: { stringValue: fileBuffer.toString('base64') }
            }
        }
    };

    const [predictionResponse] = await vertexClient.predict({
        endpoint,
        instances: [instance],
    });

    const predictions = predictionResponse.predictions;

    if (!predictions || predictions.length === 0) {
        const response: ApiResponse = {
            code: API_CODES.PREDICTION_NO_DATA,
            message: API_RESPONSES.get(API_CODES.PREDICTION_NO_DATA) ?? '',
            data: []
        };

        return res.status(HTTP_CODES.BAD_REQUEST).json(response);
    }

    const possibleLabels: PossibleLabel[] = [];

    for (const prediction of predictions) {
        if (prediction.structValue && prediction.structValue.fields) {
            const fields = prediction.structValue.fields;

            let displayNames: string[] = [];
            if (fields.displayNames && fields.displayNames.listValue && fields.displayNames.listValue.values) {
                displayNames = fields.displayNames.listValue.values
                    .filter((item: any) => item.stringValue)
                    .map((item: any) => item.stringValue);
            }

            let confidences: number[] = [];
            if (fields.confidences && fields.confidences.listValue && fields.confidences.listValue.values) {
                confidences = fields.confidences.listValue.values
                    .filter((item: any) => item.numberValue !== undefined)
                    .map((item: any) => item.numberValue);
            }

            const minLength = Math.min(displayNames.length, confidences.length);
            for (let i = 0; i < minLength; i++) {
                if (displayNames[i] && confidences[i] !== undefined) {
                    possibleLabels.push({
                        description: formatName(displayNames[i] ?? ''),
                        score: confidences[i],
                    });
                }
            }
        } else {
            console.error('[🔴] Unexpected Vertex response format: ', prediction);

            const response: ApiResponse = {
                code: API_CODES.INTERNAL_SERVER_ERROR,
                message: API_RESPONSES.get(API_CODES.INTERNAL_SERVER_ERROR) ?? '',
                data: []
            };

            return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(response);
        }
    }

    possibleLabels.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    const top3PossibleLabels = possibleLabels.slice(0, 3);

    const response: ApiResponse = {
        code: API_CODES.PREDICTION_SUCCESS,
        message: API_RESPONSES.get(API_CODES.PREDICTION_SUCCESS) ?? '',
        data: top3PossibleLabels
    };

        res.status(HTTP_CODES.OK).json(response);
    } catch (error) {
        console.error('[🔴] Unexpected error: ', error);

        const response: ApiResponse = {
            code: API_CODES.INTERNAL_SERVER_ERROR,
            message: API_RESPONSES.get(API_CODES.INTERNAL_SERVER_ERROR) ?? '',
            data: []
        };

        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(response);
    }
}
