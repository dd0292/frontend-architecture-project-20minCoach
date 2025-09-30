/**
 * Master class for error handling throughout the application
 * Implements centralized error handling pattern
 * 
 * GOLDEN RULE: Never allow "raw" errors from libraries to propagate
 * Always convert to AppError using the adapter
 */

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly context: ErrorContext;
  public readonly originalError?: Error;
  public readonly timestamp: Date;

  constructor(
    code: string,
    message: string,
    context: ErrorContext = {},
    originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = {
      timestamp: new Date(),
      ...context
    };
    this.originalError = originalError;
    this.timestamp = new Date();
  }

  /**
   * Centralized mapping of error codes to user-friendly messages
   * RULE: UI should never decide error texts, only request the message from this mapper
   */
  public getMessage(): string {
    const messageMap: Record<string, string> = {
      // Network errors
      'NETWORK_TIMEOUT': 'The connection has taken too long. Please check your internet and try again.',
      'NETWORK_ERROR': 'Connection error. Please check your internet and try again.',
      'HTTP_400': 'Invalid request. Please verify the entered data.',
      'HTTP_401': 'Session expired. Please log in again.',
      'HTTP_403': 'You do not have permission to perform this action.',
      'HTTP_404': 'The requested resource was not found.',
      'HTTP_500': 'Internal server error. Please try again later.',
      'HTTP_502': 'Server temporarily unavailable.',
      'HTTP_503': 'Service temporarily unavailable.',
      
      // Validation errors
      'VALIDATION_ERROR': 'The entered data is not valid.',
      'EMAIL_INVALID': 'Please enter a valid email.',
      'PASSWORD_WEAK': 'Password must be at least 8 characters.',
      'REQUIRED_FIELD': 'This field is required.',
      
      // Authentication errors
      'AUTH_FAILED': 'Incorrect email or password.',
      'AUTH_TOKEN_EXPIRED': 'Your session has expired. Please log in again.',
      'AUTH_PERMISSION_DENIED': 'You do not have permission to access this feature.',
      
      // WebSocket errors
      'WS_DISCONNECTED': 'Connection lost. Attempting to reconnect...',
      'WS_RECONNECT_FAILED': 'Could not reconnect. Please check your connection.',
      
      // WebRTC errors
      'RTC_DEVICE': 'Error with video/audio device. Please check permissions.',
      'RTC_PERMISSION_DENIED': 'Camera/microphone permissions denied.',
      'RTC_DEVICE_UNAVAILABLE': 'Video/audio device not available.',
      
      // Search errors
      'SEARCH_FAILED': 'Error searching for coaches. Please try again.',
      'SEARCH_TIMEOUT': 'Search took too long. Please try again.',
      
      // Session errors
      'SESSION_BOOKING_FAILED': 'Error booking session. Please try again.',
      'SESSION_CANCELLATION_FAILED': 'Error canceling session.',
      
      // Generic errors
      'UNKNOWN_ERROR': 'An unexpected error occurred. Please try again.',
      'OPERATION_FAILED': 'The operation could not be completed. Please try again.'
    };

    return messageMap[this.code] || messageMap['UNKNOWN_ERROR'];
  }

  /**
   * Gets technical information for logging (not for user display)
   */
  public getTechnicalInfo(): string {
    return `[${this.code}] ${this.message} | Context: ${JSON.stringify(this.context)}`;
  }
}

// Predefined error codes to avoid typos
export const ERROR_CODES = {
  // Network errors
  NETWORK_TIMEOUT: 'NETWORK_TIMEOUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
  HTTP_400: 'HTTP_400',
  HTTP_401: 'HTTP_401',
  HTTP_403: 'HTTP_403',
  HTTP_404: 'HTTP_404',
  HTTP_500: 'HTTP_500',
  HTTP_502: 'HTTP_502',
  HTTP_503: 'HTTP_503',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  EMAIL_INVALID: 'EMAIL_INVALID',
  PASSWORD_WEAK: 'PASSWORD_WEAK',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  
  // Authentication errors
  AUTH_FAILED: 'AUTH_FAILED',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_PERMISSION_DENIED: 'AUTH_PERMISSION_DENIED',
  
  // WebSocket errors
  WS_DISCONNECTED: 'WS_DISCONNECTED',
  WS_RECONNECT_FAILED: 'WS_RECONNECT_FAILED',
  
  // WebRTC errors
  RTC_DEVICE: 'RTC_DEVICE',
  RTC_PERMISSION_DENIED: 'RTC_PERMISSION_DENIED',
  RTC_DEVICE_UNAVAILABLE: 'RTC_DEVICE_UNAVAILABLE',
  
  // Search errors
  SEARCH_FAILED: 'SEARCH_FAILED',
  SEARCH_TIMEOUT: 'SEARCH_TIMEOUT',
  
  // Session errors
  SESSION_BOOKING_FAILED: 'SESSION_BOOKING_FAILED',
  SESSION_CANCELLATION_FAILED: 'SESSION_CANCELLATION_FAILED',
  
  // Generic errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  OPERATION_FAILED: 'OPERATION_FAILED'
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
