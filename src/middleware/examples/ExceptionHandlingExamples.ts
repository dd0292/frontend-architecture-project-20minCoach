/**
 * EXCEPTION HANDLING EXAMPLES
 * Documentation of the two main ways to implement exception handling
 *
 * FORM A: Direct handling in components/controllers
 * FORM B: Handling with middleware wrappers
 */

import { AppError, ErrorContext } from "../types/AppError";
import { ErrorAdapter } from "../adapters/ErrorAdapter";
import { logger } from "../logging/LoggingStrategy";
import {
  withAppError,
  withLogging,
  withMiddleware,
} from "../wrappers/MiddlewareWrappers";
import { httpClient } from "../../clients/HttpClient";

// ========================================
// FORM A: DIRECT HANDLING
// ========================================

/**
 * Example of direct error handling in a controller
 * RULE: Always use try/catch, convert to AppError, and show user-friendly message
 */
export class AuthControllerExample {
  /**
   * Example of login with direct error handling
   */
  static async loginUser(email: string, password: string): Promise<any> {
    const context: ErrorContext = {
      component: "AuthController",
      action: "loginUser",
      metadata: { email },
    };

    try {
      // Simulate API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Convertir error HTTP a AppError
        throw ErrorAdapter.fromHttpError(response, context);
      }

      const user = await response.json();

      // Logging de éxito
      logger.info(
        "User login successful",
        { userId: user.id, email },
        "AuthController",
      );

      return user;
    } catch (error) {
      // REGLA: Siempre convertir errores a AppError
      const appError = ErrorAdapter.toAppError(error, context);

      // REGLA: Siempre registrar errores
      logger.error(
        "Login failed",
        { error: appError.getTechnicalInfo(), email },
        "AuthController",
      );

      // REGLA: Lanzar AppError para que la UI pueda manejarlo
      throw appError;
    }
  }

  /**
   * Ejemplo de validación con manejo directo
   */
  static validateEmail(email: string): void {
    const context: ErrorContext = {
      component: "AuthController",
      action: "validateEmail",
      metadata: { email },
    };

    try {
      if (!email) {
        throw new AppError("REQUIRED_FIELD", "Email is required", context);
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AppError("EMAIL_INVALID", "Invalid email format", context);
      }

      logger.info("Email validation successful", { email }, "AuthController");
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error, context);

      logger.error(
        "Email validation failed",
        { error: appError.getTechnicalInfo(), email },
        "AuthController",
      );

      throw appError;
    }
  }
}

/**
 * Ejemplo de manejo directo en un componente React
 */
export class LoginScreenExample {
  static async handleLogin(email: string, password: string): Promise<void> {
    const context: ErrorContext = {
      component: "LoginScreen",
      action: "handleLogin",
      metadata: { email },
    };

    try {
      // Validar datos
      AuthControllerExample.validateEmail(email);

      // Intentar login
      const user = await AuthControllerExample.loginUser(email, password);

      // Éxito - navegar a la siguiente pantalla
      logger.info(
        "Login screen - user authenticated",
        { userId: user.id },
        "LoginScreen",
      );
    } catch (error) {
      // REGLA: Convertir a AppError y mostrar mensaje amigable
      const appError = ErrorAdapter.toAppError(error, context);
      const userMessage = ErrorAdapter.toUserMessage(appError);

      // REGLA: La UI solo muestra el mensaje amigable
      console.log("Error message for user:", userMessage);

      // En React Native, esto sería:
      // Alert.alert('Error', userMessage);

      logger.error(
        "Login screen error",
        { error: appError.getTechnicalInfo(), email },
        "LoginScreen",
      );
    }
  }
}

// ========================================
// FORM B: HANDLING WITH MIDDLEWARE WRAPPERS
// ========================================

/**
 * Ejemplo de manejo con middleware wrappers
 * REGLA: Los wrappers capturan, convierten y registran errores automáticamente
 */
export class AuthControllerWithMiddleware {
  /**
   * Función base sin manejo de errores (más limpia)
   */
  private static async _loginUser(
    email: string,
    password: string,
  ): Promise<any> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw ErrorAdapter.fromHttpError(response, { email });
    }

    return await response.json();
  }

  /**
   * Función envuelta con middleware (manejo automático de errores)
   */
  static loginUser = withMiddleware(AuthControllerWithMiddleware._loginUser, {
    component: "AuthControllerWithMiddleware",
    action: "loginUser",
  });

  /**
   * Ejemplo con múltiples wrappers encadenados
   */
  static loginUserWithRetry = withLogging(
    withAppError(AuthControllerWithMiddleware._loginUser, {
      component: "AuthControllerWithMiddleware",
      action: "loginUserWithRetry",
    }),
    {
      component: "AuthControllerWithMiddleware",
      action: "loginUserWithRetry",
    },
  );
}

/**
 * Ejemplo de servicio con middleware
 */
export class CoachServiceExample {
  /**
   * Función base para buscar coaches
   */
  private static async _searchCoaches(
    query: string,
    filters: any,
  ): Promise<any[]> {
    // Simular llamada a API
    const response = await httpClient.get("/api/coaches/search", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, filters }),
    });

    return response.coaches;
  }

  /**
   * Función envuelta con middleware
   */
  static searchCoaches = withMiddleware(CoachServiceExample._searchCoaches, {
    component: "CoachService",
    action: "searchCoaches",
  });
}

// ========================================
// EJEMPLOS DE USO EN DIFERENTES CAPAS
// ========================================

/**
 * Ejemplo de uso en capa de servicios
 */
export class BusinessServiceExample {
  /**
   * Servicio de reserva de sesiones con middleware
   */
  private static async _bookSession(
    coachId: string,
    userId: string,
    timeSlot: string,
  ): Promise<any> {
    // Validaciones de negocio
    if (!coachId || !userId || !timeSlot) {
      throw new AppError(
        "VALIDATION_ERROR",
        "Missing required booking parameters",
        { coachId, userId, timeSlot },
      );
    }

    // Llamada a API
    const response = await httpClient.post("/api/sessions/book", {
      coachId,
      userId,
      timeSlot,
    });

    return response.session;
  }

  /**
   * Función envuelta con middleware
   */
  static bookSession = withMiddleware(BusinessServiceExample._bookSession, {
    component: "BusinessService",
    action: "bookSession",
  });
}

/**
 * Ejemplo de uso en capa de controladores (hooks)
 */
export class ControllerHookExample {
  /**
   * Hook de búsqueda con manejo de errores
   */
  static useSearchCoaches() {
    const context: ErrorContext = {
      component: "useSearchCoaches",
      action: "search",
    };

    const searchCoaches = async (query: string) => {
      try {
        return await CoachServiceExample.searchCoaches(query, {});
      } catch (error) {
        const appError = ErrorAdapter.toAppError(error, context);
        const userMessage = ErrorAdapter.toUserMessage(appError);

        // En un hook real, esto actualizaría el estado de error
        console.log("Search error:", userMessage);

        throw appError;
      }
    };

    return { searchCoaches };
  }
}

// ========================================
// COMPARACIÓN DE AMBAS FORMAS
// ========================================

/**
 * COMPARACIÓN:
 *
 * FORMA A (Manejo Directo):
 * - Más control granular sobre el manejo de errores
 * - Código más explícito y fácil de seguir
 * - Requiere más código boilerplate
 * - Ideal para casos específicos que requieren lógica personalizada
 *
 * FORMA B (Middleware Wrappers):
 * - Código más limpio y menos repetitivo
 * - Manejo automático y consistente de errores
 * - Más difícil de debuggear cuando algo falla
 * - Ideal para funciones estándar que siguen el mismo patrón
 *
 * RECOMENDACIÓN:
 * - Usar FORMA A para lógica de negocio compleja
 * - Usar FORMA B para operaciones CRUD y llamadas a API estándar
 * - Siempre combinar con logging y mensajes amigables al usuario
 */
