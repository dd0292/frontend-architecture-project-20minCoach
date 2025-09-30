/**
 * Resilient WebSocket client with automatic reconnection and backoff
 * Implements robust error handling for real-time connections
 */

import { AppError, ErrorContext, ERROR_CODES } from '../types/AppError';
import { ErrorAdapter } from '../adapters/ErrorAdapter';
import { logger } from '../logging/LoggingStrategy';

export interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnectAttempts?: number;
  reconnectDelay?: number;
  maxReconnectDelay?: number;
  heartbeatInterval?: number;
  heartbeatTimeout?: number;
}

export interface WebSocketMessage {
  type: string;
  data?: any;
  timestamp?: Date;
}

export type WebSocketEventHandler = (message: WebSocketMessage) => void;
export type WebSocketErrorHandler = (error: AppError) => void;
export type WebSocketStatusHandler = (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void;

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private heartbeatTimeout: NodeJS.Timeout | null = null;
  private isManualClose = false;
  private messageHandlers: Map<string, WebSocketEventHandler[]> = new Map();
  private errorHandler: WebSocketErrorHandler | null = null;
  private statusHandler: WebSocketStatusHandler | null = null;

  constructor(private config: WebSocketConfig) {
    this.config = {
      reconnectAttempts: 5,
      reconnectDelay: 1000,
      maxReconnectDelay: 30000,
      heartbeatInterval: 30000,
      heartbeatTimeout: 5000,
      ...config,
    };
  }

/**
 * Connects to WebSocket
 */
  async connect(context: ErrorContext = {}): Promise<void> {
    try {
      this.isManualClose = false;
      this.notifyStatus('connecting');
      
      logger.info(
        `Connecting to WebSocket: ${this.config.url}`,
        { url: this.config.url, attempt: this.reconnectAttempts + 1 },
        'WebSocketClient'
      );

      this.ws = new WebSocket(this.config.url, this.config.protocols);
      
      this.setupEventHandlers(context);
      
      return new Promise((resolve, reject) => {
        if (!this.ws) {
          reject(new AppError(ERROR_CODES.WS_DISCONNECTED, 'WebSocket not initialized', context));
          return;
        }

        this.ws.onopen = () => {
          logger.info(
            'WebSocket connected successfully',
            { url: this.config.url },
            'WebSocketClient'
          );
          
          this.reconnectAttempts = 0;
          this.notifyStatus('connected');
          this.startHeartbeat();
          resolve();
        };

        this.ws.onerror = (error) => {
          logger.error(
            'WebSocket connection error',
            { url: this.config.url, error: error },
            'WebSocketClient'
          );
          
          const appError = new AppError(
            ERROR_CODES.WS_DISCONNECTED,
            'WebSocket connection failed',
            context
          );
          
          this.notifyError(appError);
          reject(appError);
        };
      });
    } catch (error) {
      throw ErrorAdapter.toAppError(error, { ...context, url: this.config.url });
    }
  }

/**
 * Disconnects the WebSocket
 */
  disconnect(): void {
    this.isManualClose = true;
    this.stopHeartbeat();
    this.clearReconnectTimeout();
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    this.notifyStatus('disconnected');
    
    logger.info(
      'WebSocket disconnected',
      { url: this.config.url },
      'WebSocketClient'
    );
  }

/**
 * Sends a message through the WebSocket
 */
  send(message: WebSocketMessage, context: ErrorContext = {}): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new AppError(
        ERROR_CODES.WS_DISCONNECTED,
        'WebSocket is not connected',
        context
      );
    }

    try {
      const messageWithTimestamp = {
        ...message,
        timestamp: new Date(),
      };
      
      this.ws.send(JSON.stringify(messageWithTimestamp));
      
      logger.debug(
        `WebSocket message sent: ${message.type}`,
        { type: message.type, data: message.data },
        'WebSocketClient'
      );
    } catch (error) {
      throw ErrorAdapter.toAppError(error, { ...context, messageType: message.type });
    }
  }

/**
 * Registers a handler for a specific message type
 */
  onMessage(type: string, handler: WebSocketEventHandler): void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }
    this.messageHandlers.get(type)!.push(handler);
  }

/**
 * Registers an error handler
 */
  onError(handler: WebSocketErrorHandler): void {
    this.errorHandler = handler;
  }

/**
 * Registers a handler for status changes
 */
  onStatusChange(handler: WebSocketStatusHandler): void {
    this.statusHandler = handler;
  }

/**
 * Gets the current connection status
 */
  getStatus(): 'connecting' | 'connected' | 'disconnected' | 'error' {
    if (!this.ws) return 'disconnected';
    
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'connected';
      case WebSocket.CLOSING:
      case WebSocket.CLOSED:
        return 'disconnected';
      default:
        return 'error';
    }
  }

/**
 * Sets up WebSocket event handlers
 */
  private setupEventHandlers(context: ErrorContext): void {
    if (!this.ws) return;

    this.ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        logger.error(
          'Failed to parse WebSocket message',
          { error: error, data: event.data },
          'WebSocketClient'
        );
      }
    };

    this.ws.onclose = (event) => {
      logger.info(
        'WebSocket connection closed',
        { code: event.code, reason: event.reason, wasClean: event.wasClean },
        'WebSocketClient'
      );
      
      this.stopHeartbeat();
      this.notifyStatus('disconnected');
      
      if (!this.isManualClose && this.reconnectAttempts < this.config.reconnectAttempts!) {
        this.scheduleReconnect(context);
      } else if (this.reconnectAttempts >= this.config.reconnectAttempts!) {
        const error = new AppError(
          ERROR_CODES.WS_RECONNECT_FAILED,
          'Failed to reconnect after maximum attempts',
          context
        );
        this.notifyError(error);
      }
    };

    this.ws.onerror = (error) => {
      logger.error(
        'WebSocket error occurred',
        { error: error },
        'WebSocketClient'
      );
      
      const appError = new AppError(
        ERROR_CODES.WS_DISCONNECTED,
        'WebSocket error occurred',
        context
      );
      
      this.notifyError(appError);
    };
  }

/**
 * Handles received messages
 */
  private handleMessage(message: WebSocketMessage): void {
    const handlers = this.messageHandlers.get(message.type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          logger.error(
            `Error in message handler for type: ${message.type}`,
            { error: error, messageType: message.type },
            'WebSocketClient'
          );
        }
      });
    }
  }

/**
 * Schedules reconnection with exponential backoff
 */
  private scheduleReconnect(context: ErrorContext): void {
    this.reconnectAttempts++;
    
    const delay = Math.min(
      this.config.reconnectDelay! * Math.pow(2, this.reconnectAttempts - 1),
      this.config.maxReconnectDelay!
    );
    
    logger.info(
      `Scheduling WebSocket reconnect in ${delay}ms`,
      { attempt: this.reconnectAttempts, delay, maxAttempts: this.config.reconnectAttempts },
      'WebSocketClient'
    );
    
    this.reconnectTimeout = setTimeout(() => {
      this.connect(context).catch(error => {
        logger.error(
          'Failed to reconnect WebSocket',
          { error: error.message, attempt: this.reconnectAttempts },
          'WebSocketClient'
        );
      });
    }, delay);
  }

/**
 * Clears the reconnection timeout
 */
  private clearReconnectTimeout(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

/**
 * Starts heartbeat to keep connection alive
 */
  private startHeartbeat(): void {
    if (!this.config.heartbeatInterval) return;
    
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.send({ type: 'ping' });
        
        // Configurar timeout para la respuesta
        this.heartbeatTimeout = setTimeout(() => {
          logger.warn(
            'WebSocket heartbeat timeout',
            { url: this.config.url },
            'WebSocketClient'
          );
          
          // Forzar reconexión
          this.ws?.close();
        }, this.config.heartbeatTimeout);
      }
    }, this.config.heartbeatInterval);
  }

/**
 * Stops the heartbeat
 */
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    if (this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout);
      this.heartbeatTimeout = null;
    }
  }

/**
 * Notifies errors to registered handlers
 */
  private notifyError(error: AppError): void {
    if (this.errorHandler) {
      this.errorHandler(error);
    }
  }

/**
 * Notifies status changes to registered handlers
 */
  private notifyStatus(status: 'connecting' | 'connected' | 'disconnected' | 'error'): void {
    if (this.statusHandler) {
      this.statusHandler(status);
    }
  }
}
