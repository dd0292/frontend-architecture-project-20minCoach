/**
 * Punto de entrada principal para el sistema de middleware
 * Exporta todas las clases y funciones necesarias para el manejo de errores
 */

// Tipos y clases principales
export { AppError, ErrorContext, ErrorCode, ERROR_CODES } from './types/AppError';

// Adapters
export { ErrorAdapter } from './adapters/ErrorAdapter';

// Logging
export { 
  Logger, 
  LoggingProvider, 
  ConsoleLoggingProvider, 
  SupabaseLoggingProvider, 
  SentryLoggingProvider,
  logger,
  logEvent
} from './logging/LoggingStrategy';

// Wrappers de middleware
export { 
  withAppError, 
  withLogging, 
  withMiddleware, 
  withPermissionCheck, 
  withAuthentication, 
  withRetry 
} from './wrappers/MiddlewareWrappers';

// Clientes
export { HttpClient, httpClient } from './clients/HttpClient';
export { WebSocketClient } from './clients/WebSocketClient';
export { WebRTCClient } from './clients/WebRTCClient';

// Ejemplos y documentación
export { ErrorBoundary, useErrorHandler } from './examples/ErrorBoundaryExample';

// Re-exportar ejemplos para referencia
export * from './examples/ExceptionHandlingExamples';
