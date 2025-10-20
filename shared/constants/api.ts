export const API_CODES = {
    PREDICTION_SUCCESS: 'S200',
    BAD_REQUEST_NO_FILE: 'E400',
    BAD_REQUEST_INVALID_FILE: 'E401',
    PREDICTION_NO_DATA: 'E402',
    INTERNAL_SERVER_ERROR: 'E500'
} as const;

export type ApiCode = (typeof API_CODES)[keyof typeof API_CODES];

export const API_RESPONSES = new Map<ApiCode, string>([
    [API_CODES.PREDICTION_SUCCESS, 'Prediction was successful.'],
    [API_CODES.BAD_REQUEST_NO_FILE, 'No file uploaded. Please upload a file.'],
    [API_CODES.BAD_REQUEST_INVALID_FILE, 'Only JPEG, JPG, and PNG files are allowed.'],
    [API_CODES.PREDICTION_NO_DATA, 'No identification could be made. Try a different image.'],
    [API_CODES.INTERNAL_SERVER_ERROR, 'Internal server error. Please contact the server owner.']
]);
