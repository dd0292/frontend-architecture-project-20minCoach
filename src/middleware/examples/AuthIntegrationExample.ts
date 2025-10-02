/**
 * Example of middleware integration with the existing authentication system
 * Shows how to apply middleware patterns to current controllers
 */

import { AppError, ErrorContext, ERROR_CODES } from '../types/AppError';
import { ErrorAdapter } from '../adapters/ErrorAdapter';
import { logger } from '../logging/LoggingStrategy';
import { withMiddleware, withAuthentication } from '../wrappers/MiddlewareWrappers';
import { httpClient } from '../../clients/HttpClient';

// Importar el controlador existente
import { authenticateUser, validateEmail } from '../../controllers/authController';

/**
 * Enhanced authentication controller with middleware
 */
export class EnhancedAuthController {
  /**
   * Base function for authentication (without middleware)
   */
  private static async _authenticateUser(email: string, password: string): Promise<any> {
    const context: ErrorContext = {
      component: 'EnhancedAuthController',
      action: '_authenticateUser',
      metadata: { email }
    };

    // Validate email using existing function
    if (!validateEmail(email)) {
      throw new AppError(
        ERROR_CODES.EMAIL_INVALID,
        'Invalid email format',
        context
      );
    }

    // Validate password
    if (!password || password.length < 6) {
      throw new AppError(
        ERROR_CODES.PASSWORD_WEAK,
        'Password must be at least 6 characters',
        context
      );
    }

    // Use existing controller but with improved error handling
    try {
      const user = await authenticateUser(email, password);
      
      if (!user) {
        throw new AppError(
          ERROR_CODES.AUTH_FAILED,
          'Invalid credentials',
          context
        );
      }

      return user;
    } catch (error) {
      // If it's already an AppError, re-throw it
      if (error instanceof AppError) {
        throw error;
      }
      
      // Convert other errors to AppError
      throw ErrorAdapter.toAppError(error, context);
    }
  }

  /**
   * Function wrapped with middleware for authentication
   */
  static authenticateUser = withMiddleware(
    EnhancedAuthController._authenticateUser,
    {
      component: 'EnhancedAuthController',
      action: 'authenticateUser'
    }
  );

  /**
   * Function with additional authentication validation
   */
  static authenticateUserWithValidation = withAuthentication(
    EnhancedAuthController._authenticateUser,
    {
      component: 'EnhancedAuthController',
      action: 'authenticateUserWithValidation'
    }
  );
}

/**
 * Enhanced hook for authentication
 */
export function useEnhancedAuthController() {
  const context: ErrorContext = {
    component: 'useEnhancedAuthController',
    action: 'authHook'
  };

  const [uiError, setUiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setUiError(null);

      logger.info(
        'Starting authentication process',
        { email },
        'useEnhancedAuthController'
      );

      const user = await EnhancedAuthController.authenticateUser(email, password);
      
      logger.info(
        'Authentication successful',
        { userId: user.id, email },
        'useEnhancedAuthController'
      );

      return user;
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error, { ...context});
      const userMessage = ErrorAdapter.toUserMessage(appError);
      
      logger.error(
        'Authentication failed',
        { error: appError.getTechnicalInfo(), email },
        'useEnhancedAuthController'
      );

      setUiError(userMessage);
      throw appError;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setUiError(null);
  };

  return {
    login,
    uiError,
    isLoading,
    clearError
  };
}

/**
 * Example of how to integrate with the existing Auth component
 */
export class EnhancedAuthComponent {
  static async handleLogin(email: string, password: string): Promise<void> {
    const context: ErrorContext = {
      component: 'EnhancedAuthComponent',
      action: 'handleLogin',
      metadata: { email }
    };

    try {
      // Usar el controlador mejorado
      const user = await EnhancedAuthController.authenticateUser(email, password);
      
      // Navigate to next screen
      logger.info(
        'Login successful, navigating to home',
        { userId: user.id },
        'EnhancedAuthComponent'
      );
      
      // In React Native Navigation:
      // navigation.navigate('Home');
      
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error, context);
      const userMessage = ErrorAdapter.toUserMessage(appError);
      
      // Show error to user
      // In React Native:
      // Alert.alert('Authentication Error', userMessage);
      
      logger.error(
        'Login failed in component',
        { error: appError.getTechnicalInfo(), email },
        'EnhancedAuthComponent'
      );
    }
  }

  static async handleSignUp(email: string, password: string): Promise<void> {
    const context: ErrorContext = {
      component: 'EnhancedAuthComponent',
      action: 'handleSignUp',
      metadata: { email }
    };

    try {
      // Enhanced validations
      if (!validateEmail(email)) {
        throw new AppError(
          ERROR_CODES.EMAIL_INVALID,
          'Invalid email format',
          context
        );
      }

      if (!password || password.length < 8) {
        throw new AppError(
          ERROR_CODES.PASSWORD_WEAK,
          'Password must be at least 8 characters',
          context
        );
      }

      // Simulate registration API call
      const response = await httpClient.post<>('/api/auth/register', {
        email,
        password
      });

      logger.info(
        'User registration successful',
        { userId: response.user.id, email },
        'EnhancedAuthComponent'
      );

      // Show success message
      // Alert.alert('Success', 'User registered successfully');
      
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error, context);
      const userMessage = ErrorAdapter.toUserMessage(appError);
      
      // Alert.alert('Registration Error', userMessage);
      
      logger.error(
        'Registration failed',
        { error: appError.getTechnicalInfo(), email },
        'EnhancedAuthComponent'
      );
    }
  }
}

/**
 * Example of integration with Supabase
 */
export class SupabaseAuthIntegration {
  private static supabase: any;

  static initialize(supabaseClient: any) {
    this.supabase = supabaseClient;
  }

  /**
   * Login with Supabase and improved error handling
   */
  static async loginWithSupabase(email: string, password: string): Promise<any> {
    const context: ErrorContext = {
      component: 'SupabaseAuthIntegration',
      action: 'loginWithSupabase',
      metadata: { email }
    };

    try {
      if (!this.supabase) {
        throw new AppError(
          ERROR_CODES.UNKNOWN_ERROR,
          'Supabase client not initialized',
          context
        );
      }

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw ErrorAdapter.fromSupabaseError(error, context);
      }

      if (!data.user) {
        throw new AppError(
          ERROR_CODES.AUTH_FAILED,
          'No user data returned',
          context
        );
      }

      logger.info(
        'Supabase authentication successful',
        { userId: data.user.id, email },
        'SupabaseAuthIntegration'
      );

      return data.user;
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error, context);
      
      logger.error(
        'Supabase authentication failed',
        { error: appError.getTechnicalInfo(), email },
        'SupabaseAuthIntegration'
      );

      throw appError;
    }
  }

  /**
   * Registration with Supabase and improved error handling
   */
  static async signUpWithSupabase(email: string, password: string): Promise<any> {
    const context: ErrorContext = {
      component: 'SupabaseAuthIntegration',
      action: 'signUpWithSupabase',
      metadata: { email }
    };

    try {
      if (!this.supabase) {
        throw new AppError(
          ERROR_CODES.UNKNOWN_ERROR,
          'Supabase client not initialized',
          context
        );
      }

      const { data, error } = await this.supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        throw ErrorAdapter.fromSupabaseError(error, context);
      }

      logger.info(
        'Supabase registration successful',
        { userId: data.user?.id, email },
        'SupabaseAuthIntegration'
      );

      return data;
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error, context);
      
      logger.error(
        'Supabase registration failed',
        { error: appError.getTechnicalInfo(), email },
        'SupabaseAuthIntegration'
      );

      throw appError;
    }
  }
}

/**
 * Example usage in a React Native component
 */
export function EnhancedLoginScreen() {
  const { login, uiError, isLoading, clearError } = useEnhancedAuthController();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigate to next screen
    } catch (error) {
      // Error is already handled in the hook
      // uiError contains the user-friendly message
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      
      {uiError && (
        <Text style={styles.errorText}>{uiError}</Text>
      )}
      
      <TouchableOpacity 
        onPress={handleLogin}
        disabled={isLoading}
        style={[styles.button, isLoading && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Required imports for React Native
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
