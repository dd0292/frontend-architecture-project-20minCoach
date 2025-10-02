/**
 * Resilient HTTP client with retries, backoff and circuit breaker
 * Implements robust error handling for HTTP operations
 */

import {
  AppError,
  ErrorContext,
  ERROR_CODES,
} from "../middleware/types/AppError";
import { ErrorAdapter } from "../middleware/adapters/ErrorAdapter";
import { logger } from "../middleware/logging/LoggingStrategy";

export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  circuitBreakerThreshold?: number;
  circuitBreakerTimeout?: number;
}

export interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

export class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED";

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000, // 1 minute
  ) {}

  canExecute(): boolean {
    const now = Date.now();

    if (this.state === "OPEN") {
      if (now - this.lastFailureTime > this.timeout) {
        this.state = "HALF_OPEN";
        return true;
      }
      return false;
    }

    return true;
  }

  onSuccess(): void {
    this.failureCount = 0;
    this.state = "CLOSED";
  }

  onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.threshold) {
      this.state = "OPEN";
      logger.warn(
        `Circuit breaker opened after ${this.failureCount} failures`,
        { failureCount: this.failureCount, threshold: this.threshold },
      );
    }
  }
}

export class HttpClient {
  private circuitBreaker: CircuitBreaker;
  private defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  constructor(private config: HttpClientConfig = {}) {
    this.circuitBreaker = new CircuitBreaker(
      config.circuitBreakerThreshold,
      config.circuitBreakerTimeout,
    );
  }

  /**
   * Sets default headers
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Sets the authentication token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Performs an HTTP request with robust error handling
   */
  async request<T = unknown>(
    url: string,
    config: RequestConfig = {},
    context: ErrorContext = {},
  ): Promise<T> {
    // Check circuit breaker
    if (!this.circuitBreaker.canExecute()) {
      const error = new AppError(
        ERROR_CODES.HTTP_503,
        "Service temporarily unavailable (circuit breaker open)",
        { ...context },
      );

      logger.error(
        "Request blocked by circuit breaker",
        { url, state: "OPEN" },
        "HttpClient",
      );

      throw error;
    }

    const fullUrl = this.config.baseURL ? `${this.config.baseURL}${url}` : url;
    const timeout = config.timeout || this.config.timeout || 30000;

    const requestConfig: RequestConfig = {
      method: config.method || "GET",
      headers: { ...this.defaultHeaders, ...config.headers },
      body: config.body ? JSON.stringify(config.body) : undefined,
    };

    try {
      logger.info(
        `Making HTTP ${requestConfig.method} request to ${fullUrl}`,
        { url: fullUrl, method: requestConfig.method },
        "HttpClient",
      );

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(fullUrl, {
        ...requestConfig,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        this.circuitBreaker.onFailure();
        throw ErrorAdapter.fromHttpError(response, {
          ...context,
        });
      }

      this.circuitBreaker.onSuccess();

      const data = await response.json();

      logger.info(
        `HTTP request successful`,
        { url: fullUrl, status: response.status },
        "HttpClient",
      );

      return data;
    } catch (error) {
      this.circuitBreaker.onFailure();

      // Handle different types of errors
      if (error instanceof AppError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new AppError(
            ERROR_CODES.NETWORK_TIMEOUT,
            "Request timeout",
            { ...context },
            error,
          );
        }

        if (error.message.includes("Failed to fetch")) {
          throw new AppError(
            ERROR_CODES.NETWORK_ERROR,
            "Network connection failed",
            { ...context },
            error,
          );
        }
      }

      throw ErrorAdapter.toAppError(error, { ...context });
    }
  }

  /**
   * Convenience methods
   */
  async get<T = unknown>(
    url: string,
    config?: Omit<RequestConfig, "method">,
    context?: ErrorContext,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: "GET" }, context);
  }

  async post<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">,
    context?: ErrorContext,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: "POST", body }, context);
  }

  async put<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">,
    context?: ErrorContext,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: "PUT", body }, context);
  }

  async delete<T = unknown>(
    url: string,
    config?: Omit<RequestConfig, "method">,
    context?: ErrorContext,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: "DELETE" }, context);
  }

  async patch<T = unknown>(
    url: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">,
    context?: ErrorContext,
  ): Promise<T> {
    return this.request<T>(url, { ...config, method: "PATCH", body }, context);
  }
}

// Singleton HTTP client instance
export const httpClient = new HttpClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "https://api.20mincoach.com",
  timeout: 30000,
  maxRetries: 3,
  retryDelay: 1000,
  circuitBreakerThreshold: 5,
  circuitBreakerTimeout: 60000,
});
