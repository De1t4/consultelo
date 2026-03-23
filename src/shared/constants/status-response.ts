/**
 * Common HTTP status codes.
 */
export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  LIMIT_CONSULTATIONS: 429,

  INTERNAL_SERVER_ERROR: 500,
} as const;

export const STATUS_MESSAGE = {
  // Success
  SUCCESS: "Operation completed successfully.",
  CREATED: "Resource created successfully.",
  UPDATED: "Changes saved successfully.",
  DELETED: "The resource has been deleted.",

  // Authentication & Authorization
  UNAUTHORIZED:
    "You do not have permission to perform this action. Please log in.",
  FORBIDDEN:
    "You do not have the necessary privileges to access this resource.",

  // Client Errors
  USER_DELETED: "This account was deleted",
  BAD_REQUEST: "The request is invalid. Please check the sent data.",
  NOT_FOUND: "The requested resource was not found.",
  CONFLICT:
    "The operation could not be completed due to a conflict (e.g., duplicate).",
  ALREADY_EXISTS:
    "You have already performed this action or the resource already exists.",
  VALIDATION_ERROR: "The provided data is invalid.",

  // Server Errors
  INTERNAL_ERROR: "An internal server error occurred. Please try again later.",
} as const;

export type StatusCode = (typeof STATUS_CODE)[keyof typeof STATUS_CODE];
export type StatusMessage =
  (typeof STATUS_MESSAGE)[keyof typeof STATUS_MESSAGE];
