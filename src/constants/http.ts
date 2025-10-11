export const HTTP_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type HttpCode = (typeof HTTP_CODES)[keyof typeof HTTP_CODES];