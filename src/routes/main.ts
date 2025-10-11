import { Router } from 'express';
import multer from 'multer';
import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/api.js'
import { API_CODES, API_RESPONSES } from '../constants/api.js';

const router: Router = Router();

const upload = multer({
    storage: multer.memoryStorage()
})

router.get('/', (req: Request, res: Response) => {
    res.send('Identifying...')
})

router.post('/', upload.single('file'), (req: Request, res: Response) => {
    if (!req.file) {
        const response: ApiResponse = {
            code: API_CODES.BAD_REQUEST_NO_FILE,
            message: API_RESPONSES.get(API_CODES.BAD_REQUEST_NO_FILE) ?? ''
        };

        return res.status(400).json(response);
    }

    const response: ApiResponse<{ fileName: string; fileSize: number }> = {
        code: API_CODES.UPLOAD_SUCCESS,
        message: API_RESPONSES.get(API_CODES.UPLOAD_SUCCESS) ?? '',
        data: {
            fileName: req.file.originalname,
            fileSize: req.file.size
        }
    };

    res.json(response);
})

export default router;