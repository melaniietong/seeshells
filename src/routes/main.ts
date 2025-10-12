import { Router } from 'express';
import type { Request, Response } from 'express';
import { upload } from '../middlewares/upload.js';
import { middlewareErrorHandler } from '../handlers/middlewareErrorHandler.js';
import { identifier } from '../handlers/identifier.js';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Identifying...')
})

router.post('/', upload.single('file'), identifier);

router.use(middlewareErrorHandler);

export default router;