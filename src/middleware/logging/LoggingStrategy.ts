/**
 * Logging system with Strategy pattern
 * Allows multiple logging providers without altering core logic
 * Facilitates switching from basic console.log to external services like Sentry or Datadog
 */

export interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: Record<string, any>;
  timestamp: Date;
  component?: string;
  userId?: string;
  action?: string;
  duration?: number;
}

export interface LoggingProvider {
  log(entry: LogEntry): void;
}

/**
 * Basic provider using console.log
 */
export class ConsoleLoggingProvider implements LoggingProvider {
  log(entry: LogEntry): void {
    const timestamp = entry.timestamp.toISOString();
    const contextStr = entry.context ? JSON.stringify(entry.context) : '';
    const componentStr = entry.component ? `[${entry.component}]` : '';
    const userIdStr = entry.userId ? `[User: ${entry.userId}]` : '';
    const actionStr = entry.action ? `[Action: ${entry.action}]` : '';
    const durationStr = entry.duration ? `[Duration: ${entry.duration}ms]` : '';
    
    const message = `${timestamp} ${componentStr} ${userIdStr} ${actionStr} ${durationStr} ${entry.message} ${contextStr}`;
    
    switch (entry.level) {
      case 'info':
        console.info(message);
        break;
      case 'warn':
        console.warn(message);
        break;
      case 'error':
        console.error(message);
        break;
      case 'debug':
        console.debug(message);
        break;
    }
  }
}

/**
 * Provider for Supabase (for structured logging)
 */
export class SupabaseLoggingProvider implements LoggingProvider {
  private supabaseClient: any;

  constructor(supabaseClient: any) {
    this.supabaseClient = supabaseClient;
  }

  log(entry: LogEntry): void {
    // In a real implementation, this would send logs to Supabase
    // For now, we only simulate the behavior
    console.log(`[SUPABASE LOG] ${entry.level.toUpperCase()}: ${entry.message}`, entry);
    
    // Example of how the real implementation would be:
    /*
    this.supabaseClient
      .from('app_logs')
      .insert({
        level: entry.level,
        message: entry.message,
        context: entry.context,
        timestamp: entry.timestamp,
        component: entry.component,
        user_id: entry.userId,
        action: entry.action,
        duration: entry.duration
      })
      .catch(error => {
        console.error('Failed to log to Supabase:', error);
      });
    */
  }
}

/**
 * Provider for Sentry (for error tracking)
 */
export class SentryLoggingProvider implements LoggingProvider {
  private sentryClient: any;

  constructor(sentryClient?: any) {
    this.sentryClient = sentryClient;
  }

  log(entry: LogEntry): void {
    // In a real implementation, this would send logs to Sentry
    console.log(`[SENTRY LOG] ${entry.level.toUpperCase()}: ${entry.message}`, entry);
    
    // Example of how the real implementation would be:
    /*
    if (this.sentryClient) {
      if (entry.level === 'error') {
        this.sentryClient.captureException(new Error(entry.message), {
          tags: {
            component: entry.component,
            action: entry.action
          },
          extra: entry.context
        });
      } else {
        this.sentryClient.addBreadcrumb({
          message: entry.message,
          level: entry.level,
          category: entry.component,
          data: entry.context
        });
      }
    }
    */
  }
}

/**
 * Main logger that uses the Strategy pattern
 */
export class Logger {
  private providers: LoggingProvider[] = [];

  constructor(providers: LoggingProvider[] = []) {
    this.providers = providers;
  }

  /**
   * Adds a logging provider
   */
  addProvider(provider: LoggingProvider): void {
    this.providers.push(provider);
  }

  /**
   * Removes a logging provider
   */
  removeProvider(provider: LoggingProvider): void {
    const index = this.providers.indexOf(provider);
    if (index > -1) {
      this.providers.splice(index, 1);
    }
  }

  /**
   * Logs an event using all configured providers
   */
  log(entry: Omit<LogEntry, 'timestamp'>): void {
    const logEntry: LogEntry = {
      ...entry,
      timestamp: new Date()
    };

    this.providers.forEach(provider => {
      try {
        provider.log(logEntry);
      } catch (error) {
        console.error('Error in logging provider:', error);
      }
    });
  }

  /**
   * Convenience methods for different levels
   */
  info(message: string, context?: Record<string, any>, component?: string): void {
    this.log({
      level: 'info',
      message,
      context,
      component
    });
  }

  warn(message: string, context?: Record<string, any>, component?: string): void {
    this.log({
      level: 'warn',
      message,
      context,
      component
    });
  }

  error(message: string, context?: Record<string, any>, component?: string): void {
    this.log({
      level: 'error',
      message,
      context,
      component
    });
  }

  debug(message: string, context?: Record<string, any>, component?: string): void {
    this.log({
      level: 'debug',
      message,
      context,
      component
    });
  }
}

// Singleton logger instance
export const logger = new Logger([
  new ConsoleLoggingProvider()
]);

// Convenience function to log events
export const logEvent = (message: string, level: 'info' | 'warn' | 'error' | 'debug' = 'info', context?: Record<string, any>): void => {
  logger.log({
    level,
    message,
    context
  });
};
