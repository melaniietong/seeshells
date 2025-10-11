export const API_CODES = {
    UPLOAD_SUCCESS: 'S200',
    BAD_REQUEST_NO_FILE: 'E400',
    INTERNAL_SERVER_ERROR: 'E500'
} as const;

export type ApiCode = (typeof API_CODES)[keyof typeof API_CODES];

export const API_RESPONSES = new Map<ApiCode, string>([
    [API_CODES.UPLOAD_SUCCESS, 'File uploaded successfully.'],
    [API_CODES.BAD_REQUEST_NO_FILE, 'No file uploaded. Please upload a file.'],
    [API_CODES.INTERNAL_SERVER_ERROR, 'Internal server error. Please contact the server owner.']
]);
