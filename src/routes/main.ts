import { Router } from 'express';
import { upload } from '../middlewares/upload.js';
import { middlewareErrorHandler } from '../handlers/middlewareErrorHandler.js';
import { identify } from '../handlers/identify.js';

const router: Router = Router();

router.post('/', upload.single('file'), identify);

router.use(middlewareErrorHandler);

export default router;