/**
 * Reusable middleware wrappers
 * Implement the decorator pattern for cross-cutting functionality
 */

import { AppError, ErrorContext } from "../types/AppError";
import { ErrorAdapter } from "../adapters/ErrorAdapter";
import { logger } from "../logging/LoggingStrategy";

/**
 * Wrapper that captures errors, converts them to AppError and logs them
 * RULE: This middleware MUST be called within each catch block
 */
export function withAppError<T extends any[], R>(
  fn: (...args: T) => Promise<R> | R,
  context: ErrorContext = {},
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error, context);

      // Logging del error
      logger.error(
        `Error in ${fn.name || "anonymous function"}`,
        {
          error: appError.getTechnicalInfo(),
          args: args.length > 0 ? "Arguments provided" : "No arguments",
          context,
        },
        context.component || "Middleware",
      );

      throw appError;
    }
  };
}

/**
 * Wrapper that measures operation duration and logs its status (OK/FAILED)
 */
export function withLogging<T extends any[], R>(
  fn: (...args: T) => Promise<R> | R,
  context: ErrorContext = {},
) {
  return async (...args: T): Promise<R> => {
    const startTime = Date.now();
    const functionName = fn.name || "anonymous function";

    try {
      logger.info(
        `Starting ${functionName}`,
        { args: args.length > 0 ? "Arguments provided" : "No arguments" },
        context.component || "Middleware",
      );

      const result = await fn(...args);
      const duration = Date.now() - startTime;

      logger.info(
        `Completed ${functionName} successfully`,
        { duration, status: "OK" },
        context.component || "Middleware",
      );

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const appError = ErrorAdapter.toAppError(error, context);

      logger.error(
        `Failed ${functionName}`,
        {
          duration,
          status: "FAILED",
          error: appError.getTechnicalInfo(),
        },
        context.component || "Middleware",
      );

      throw appError;
    }
  };
}

/**
 * Combined wrapper that applies both logging and error handling
 * Usage example: withLogging(withAppError(myFunc)) for services
 */
export function withMiddleware<T extends any[], R>(
  fn: (...args: T) => Promise<R> | R,
  context: ErrorContext = {},
) {
  return withLogging(withAppError(fn, context), context);
}

/**
 * Specific wrapper for permission validation
 * RULE: Use this function to protect specific components or actions
 */
export function withPermissionCheck<T extends any[], R>(
  fn: (...args: T) => Promise<R> | R,
  requiredPermission: string,
  context: ErrorContext = {},
) {
  return async (...args: T): Promise<R> => {
    // In a real implementation, this would verify user permissions
    // For now, we simulate the validation

    logger.info(
      `Checking permission: ${requiredPermission}`,
      { requiredPermission },
      context.component || "PermissionMiddleware",
    );

    // Permission verification simulation
    // In real implementation, this would come from authentication context
    const hasPermission = true; // This would come from the auth system

    if (!hasPermission) {
      const error = new AppError(
        "AUTH_PERMISSION_DENIED",
        `Permission denied: ${requiredPermission}`,
        {
          ...context,
          metadata: {
            ...context.metadata,
            requiredPermission,
          },
        },
      );

      logger.warn(
        `Permission denied for ${requiredPermission}`,
        { requiredPermission, userId: context.userId },
        context.component || "PermissionMiddleware",
      );

      throw error;
    }

    return await fn(...args);
  };
}

/**
 * Wrapper for operations that require authentication
 */
export function withAuthentication<T extends any[], R>(
  fn: (...args: T) => Promise<R> | R,
  context: ErrorContext = {},
) {
  return async (...args: T): Promise<R> => {
    // In a real implementation, this would verify the authentication token
    // For now, we simulate the validation

    logger.info(
      "Checking authentication",
      { userId: context.userId },
      context.component || "AuthMiddleware",
    );

    // Authentication verification simulation
    const isAuthenticated = true; // This would come from the auth system

    if (!isAuthenticated) {
      const error = new AppError(
        "AUTH_TOKEN_EXPIRED",
        "Authentication required",
        context,
      );

      logger.warn(
        "Authentication failed",
        { userId: context.userId },
        context.component || "AuthMiddleware",
      );

      throw error;
    }

    return await fn(...args);
  };
}

/**
 * Wrapper for operations with automatic retry
 */
export function withRetry<T extends any[], R>(
  fn: (...args: T) => Promise<R> | R,
  maxRetries: number = 3,
  backoffMs: number = 1000,
  context: ErrorContext = {},
) {
  return async (...args: T): Promise<R> => {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        logger.info(
          `Attempt ${attempt}/${maxRetries}`,
          { attempt, maxRetries },
          context.component || "RetryMiddleware",
        );

        return await fn(...args);
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxRetries) {
          logger.error(
            `All ${maxRetries} attempts failed`,
            { maxRetries, finalError: lastError.message },
            context.component || "RetryMiddleware",
          );
          throw ErrorAdapter.toAppError(lastError, context);
        }

        logger.warn(
          `Attempt ${attempt} failed, retrying in ${backoffMs}ms`,
          { attempt, error: lastError.message, backoffMs },
          context.component || "RetryMiddleware",
        );

        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        backoffMs *= 2; // Exponential backoff
      }
    }

    throw ErrorAdapter.toAppError(lastError!, context);
  };
}
