/**
 * ErrorBoundary example for rendering error handling
 * Implements React's Error Boundary pattern to capture UI errors
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppError } from '../types/AppError';
import { ErrorAdapter } from '../adapters/ErrorAdapter';
import { logger } from '../logging/LoggingStrategy';

interface Props {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onError?: (error: AppError, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: AppError | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state to show error UI
    const appError = ErrorAdapter.toAppError(error, {
      component: 'ErrorBoundary',
      action: 'getDerivedStateFromError'
    });

    return {
      hasError: true,
      error: appError
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    const appError = ErrorAdapter.toAppError(error, {
      component: 'ErrorBoundary',
      action: 'componentDidCatch',
      metadata: {
        componentStack: errorInfo.componentStack,
        errorBoundary: errorInfo.errorBoundary
      }
    });

    logger.error(
      'Error boundary caught error',
      {
        error: appError.getTechnicalInfo(),
        componentStack: errorInfo.componentStack
      },
      'ErrorBoundary'
    );

    // Notify callback if it exists
    if (this.props.onError) {
      this.props.onError(appError, errorInfo);
    }

    this.setState({ error: appError });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Render custom error UI
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent;
      }

      return (
        <View style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
            <Text style={styles.errorMessage}>
              {ErrorAdapter.toUserMessage(this.state.error)}
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={this.handleRetry}>
              <Text style={styles.retryButtonText}>Try again</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

/**
 * Custom hook for error handling in functional components
 */
export function useErrorHandler() {
  const handleError = (error: unknown, context?: any) => {
    const appError = ErrorAdapter.toAppError(error, {
      component: 'useErrorHandler',
      action: 'handleError',
      metadata: context
    });

    logger.error(
      'Error handled by useErrorHandler',
      {
        error: appError.getTechnicalInfo(),
        context
      },
      'useErrorHandler'
    );

    // In a real implementation, this could:
    // - Show a toast
    // - Update error state
    // - Navigate to error screen
    console.log('Error message for user:', ErrorAdapter.toUserMessage(appError));
  };

  return { handleError };
}

/**
 * Example component showing how to use ErrorBoundary
 */
export function AppWithErrorBoundary() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Here you could send the error to a monitoring service
        console.log('Error captured by boundary:', error.getTechnicalInfo());
      }}
      fallbackComponent={
        <View style={styles.container}>
          <Text style={styles.errorTitle}>Custom Error</Text>
          <Text style={styles.errorMessage}>
            This is a custom error UI
          </Text>
        </View>
      }
    >
      {/* Your app here */}
      <View>
        <Text>App content</Text>
      </View>
    </ErrorBoundary>
  );
}
