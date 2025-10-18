import multer from 'multer';
import { MiddlewareError } from '../constants/error.js';
import { API_CODES } from '../../shared/constants/api.js';

const storage = multer.memoryStorage();
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const fileFilter = (
    req: Express.Request, 
    file: Express.Multer.File, 
    cb: multer.FileFilterCallback
) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return cb(null, true);
    }

    cb(new MiddlewareError(API_CODES.BAD_REQUEST_INVALID_FILE))
}

export const upload = multer({
    storage,
    fileFilter
});