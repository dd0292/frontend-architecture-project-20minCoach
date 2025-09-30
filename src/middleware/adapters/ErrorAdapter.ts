/**
 * Adapter for converting errors to AppError
 * Implements the Adapter pattern to standardize errors from different sources
 */

import { AppError, ErrorContext, ErrorCode, ERROR_CODES } from '../types/AppError';

export class ErrorAdapter {
  /**
   * Converts any error to standardized AppError
   * RULE: Always use this function to convert raw errors
   */
  static toAppError(
    error: unknown,
    context: ErrorContext = {},
    defaultCode: ErrorCode = ERROR_CODES.UNKNOWN_ERROR
  ): AppError {
    // If it's already an AppError, return it as is
    if (error instanceof AppError) {
      return error;
    }

    // If it's a standard Error
    if (error instanceof Error) {
      const code = this.detectErrorCode(error);
      return new AppError(
        code,
        error.message,
        context,
        error
      );
    }

    // If it's a string
    if (typeof error === 'string') {
      return new AppError(
        defaultCode,
        error,
        context
      );
    }

    // For any other type
    return new AppError(
      defaultCode,
      'Error desconocido',
      context
    );
  }

  /**
   * Converts AppError to user-friendly message
   * RULE: UI should only use this function to display errors
   */
  static toUserMessage(error: AppError): string {
    return error.getMessage();
  }

  /**
   * Detects error code based on the original error type
   */
  private static detectErrorCode(error: Error): ErrorCode {
    const message = error.message.toLowerCase();
    const name = error.name.toLowerCase();

    // Network errors
    if (name.includes('network') || message.includes('network')) {
      return ERROR_CODES.NETWORK_ERROR;
    }

    if (message.includes('timeout') || name.includes('timeout')) {
      return ERROR_CODES.NETWORK_TIMEOUT;
    }

    // HTTP errors
    if (message.includes('400')) return ERROR_CODES.HTTP_400;
    if (message.includes('401')) return ERROR_CODES.HTTP_401;
    if (message.includes('403')) return ERROR_CODES.HTTP_403;
    if (message.includes('404')) return ERROR_CODES.HTTP_404;
    if (message.includes('500')) return ERROR_CODES.HTTP_500;
    if (message.includes('502')) return ERROR_CODES.HTTP_502;
    if (message.includes('503')) return ERROR_CODES.HTTP_503;

    // Validation errors
    if (name.includes('validation') || message.includes('validation')) {
      return ERROR_CODES.VALIDATION_ERROR;
    }

    // Authentication errors
    if (message.includes('auth') || message.includes('login') || message.includes('password')) {
      return ERROR_CODES.AUTH_FAILED;
    }

    // WebSocket errors
    if (message.includes('websocket') || message.includes('ws')) {
      return ERROR_CODES.WS_DISCONNECTED;
    }

    // WebRTC errors
    if (message.includes('webrtc') || message.includes('rtc') || message.includes('camera') || message.includes('microphone')) {
      return ERROR_CODES.RTC_DEVICE;
    }

    // Default
    return ERROR_CODES.UNKNOWN_ERROR;
  }

  /**
   * Converts specific Supabase errors to AppError
   */
  static fromSupabaseError(supabaseError: any, context: ErrorContext = {}): AppError {
    const code = this.mapSupabaseErrorCode(supabaseError);
    return new AppError(
      code,
      supabaseError.message || 'Error de autenticación',
      context,
      supabaseError
    );
  }

  /**
   * Maps Supabase error codes to our codes
   */
  private static mapSupabaseErrorCode(supabaseError: any): ErrorCode {
    const message = supabaseError.message?.toLowerCase() || '';
    
    if (message.includes('invalid login credentials')) {
      return ERROR_CODES.AUTH_FAILED;
    }
    
    if (message.includes('email not confirmed')) {
      return ERROR_CODES.AUTH_FAILED;
    }
    
    if (message.includes('token')) {
      return ERROR_CODES.AUTH_TOKEN_EXPIRED;
    }
    
    return ERROR_CODES.AUTH_FAILED;
  }

  /**
   * Converts fetch/HTTP errors to AppError
   */
  static fromHttpError(response: Response, context: ErrorContext = {}): AppError {
    let code: ErrorCode;
    
    switch (response.status) {
      case 400:
        code = ERROR_CODES.HTTP_400;
        break;
      case 401:
        code = ERROR_CODES.HTTP_401;
        break;
      case 403:
        code = ERROR_CODES.HTTP_403;
        break;
      case 404:
        code = ERROR_CODES.HTTP_404;
        break;
      case 500:
        code = ERROR_CODES.HTTP_500;
        break;
      case 502:
        code = ERROR_CODES.HTTP_502;
        break;
      case 503:
        code = ERROR_CODES.HTTP_503;
        break;
      default:
        code = ERROR_CODES.UNKNOWN_ERROR;
    }
    
    return new AppError(
      code,
      `HTTP ${response.status}: ${response.statusText}`,
      context
    );
  }
}
