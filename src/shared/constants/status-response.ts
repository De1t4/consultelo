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
  
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Most used response messages broadly applicable to the project.
 * These are in Spanish as per project context.
 */
export const STATUS_MESSAGE = {
  // Success
  SUCCESS: "Operación realizada con éxito.",
  CREATED: "Recurso creado exitosamente.",
  UPDATED: "Cambios guardados correctamente.",
  DELETED: "El recurso ha sido eliminado.",
  
  // Authentication & Authorization
  UNAUTHORIZED: "No tienes permiso para realizar esta acción. Por favor, inicia sesión.",
  FORBIDDEN: "No tienes los privilegios necesarios para acceder a este recurso.",
  
  // Client Errors
  BAD_REQUEST: "La solicitud es inválida. Revisa los datos enviados.",
  NOT_FOUND: "No se encontró el recurso solicitado.",
  CONFLICT: "No se pudo completar la operación debido a un conflicto (ej. duplicado).",
  ALREADY_EXISTS: "Ya has realizado esta acción o el recurso ya existe.",
  VALIDATION_ERROR: "Los datos proporcionados no son válidos.",
  
  // Server Errors
  INTERNAL_ERROR: "Ocurrió un error interno en el servidor. Por favor, intenta de nuevo más tarde.",
} as const;

export type StatusCode = typeof STATUS_CODE[keyof typeof STATUS_CODE];
export type StatusMessage = typeof STATUS_MESSAGE[keyof typeof STATUS_MESSAGE];
