# 20minCoach — Frontend Architecture & Prototype

> **Case #1, 25%**  
> Group Project — 3 members 
> Jose David Chaves Mena, Sebastián Chacón Muñoz, <no olvidar nombre> 

---
### Project Overview

**20minCoach** is a real-time coaching platform that connects users with experts across multiple fields (health, psychology, law, mechanics, programming, arts, agriculture, and more) through on-demand **20-minute video sessions**.  

Users can:  
- Describe their needs (via text or voice).  
- Search and filter available coaches by specialty, tags, or ratings.  
- Instantly connect with a coach once availability is confirmed.  

Coaches can:  
- Manage their profiles and availability.  
- Accept or reject coaching requests.  
- Build reputation through ratings, directly influencing their earnings.  

**Business model:** Prepaid session packages (Starter, Pro, etc.), launched initially in **Colombia** and **Brazil**.

---
### Technologies Used
- React Native with Expo
- TypeScript
- Redux Toolkit for state management
- React Navigation for routing
- Jest for testing
- Supabase for authentification

---
## Repository Structure

```bash
repo-root/
│
├── app.json                          # Expo app configuration
├── App.tsx                           # Root application component 
├── assets/                           # Static assets management
│   └── public/                       # Background images and professional profile pictures
├── docs/                             # Comprehensive documentation
│   ├── ScriptForAi.txt               # AI prompt templates and guidelines
│   ├── Testing Guide.md              # Testing strategies and procedures
│   └── ux-tests/                     # User experience test reports
├── github/                           # CI/CD and deployment configuration
│   └── workflows/                    # GitHub Actions build/test/deploy pipeline
├── src/                              # CORE SOURCE CODE
│   │
│   ├── clients/                      # External service clients
│   │   ├── HttpClient.ts             # Example of REST API client
│   │   ├── WebRTCClient.ts           # Mock Video call WebRTC implementation
│   │   └── WebSocketClient.ts        # Mock Real-time communication client
│   │
│   ├── components/                   # REUSABLE UI COMPONENTS (Atomic Design)
│   │   ├── auth/                     # Authentication-specific components
│   │   │   ├── Account.tsx           # User account management component
│   │   │   └── Auth.tsx              # Main authentication flow component
│   │   │
│   │   ├── common/                   # Atomic design system implementation
│   │   │   ├── atoms/                # Fundamental building blocks
│   │   │   ├── molecules/            # Combinations of atoms
│   │   │   └── organisms/            # Complex composite components
│   │   └── styles/                   # STYLING SYSTEM & THEMING
│   │       ├── GlobalStyles.tsx      # Global style constants and mixins
│   │       ├── ThemeContext.tsx      # Light/dark theme context provider
│   │       ├── atoms/                # Component-specific style files
│   │       ├── molecules/            # Molecular component styles
│   │       └── organisms/            # Organism component styles
│   │
│   ├── controllers/                  # LOGIC CONTROLLERS
│   │   ├── authController.ts         # Authentication business logic
│   │   └── searchController.ts       # Search and filtering logic
│   │
│   ├── middleware/                   # MIDDLEWARE 
│   │   ├── adapters/                 # External service adapters
│   │   ├── logging/                  # Application logging
│   │   ├── types/                    # Type definitions
│   │   ├── wrappers/                 # Function wrappers
│   │   └── examples/                 # Implementation examples
│   │
│   ├── models/                       # DATA MODELS & TYPES
│   │
│   ├── pocs/                         # PROOF OF CONCEPT PROTOTYPES
│   │   ├── real-time-search/         # Real-time search implementation
│   │   ├── video-call/               # Video call feature exploration
│   │   └── notifications/            # Push notification system POC
│   │
│   ├── screens/                      # APPLICATION SCREENS
│   ├── slices/                       # REDUX SLICES
│   │   ├── authSlice.ts              # Authentication state management
│   │   └── coachesSlice.ts           # Coaches data and search state
│   │
│   ├── state/                        # STATE MANAGEMENT 
│   ├── tests/                        # TESTING
│   └── utils/                        # UTILITIES
├── package.json                      # NPM dependencies and scripts
├── tsconfig.json                     # TypeScript compiler configuration
├── babel.config.js                   # Babel transpiler configuration
├── metro.config.js                   # Metro bundler configuration
├── jest.config.js                    # Jest testing framework setup
├── eslint.config.js                  # ESLint code quality rules
└── README.md                         # Project documentation and setup
```

---
## Getting Started

### Prerequisites
- Node.js >= 16.x  
- Expo CLI  
- iOS Simulator / Android Emulator or Expo App on cellphone

### Installation & Running the app
```bash
git clone <REPO_URL>
cd frontend-architecture-project-20minCoach
npm install
npm start # Run the app
```

---
# Proof of concepts to develop

## Testing Strategy
- **Framework**: Jest 29.7.0 + React Native Testing Library
- **Cobertura**: 80% líneas, 90% funciones, 75% ramas
- **Tests implementados**: 52 tests unitarios pasando
- **Documentación completa**: Ver [Testing Guide](docs/Testing%20Guide.md)

### Running tests
```bash
cd src
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:models      # Only model tests
npm run test:controllers # Only controllers
```

### 📊 Test Coverage
- **UserModel**: 6 tests (roles, validaciones, acceso premium)
- **CoachModel**: 15 tests (constructor, búsqueda, especialización)
- **AuthController**: 8 tests (login, validaciones, roles)
- **SearchController**: 23 tests (búsqueda, filtros, validaciones)

### 📂 Test Structure
```bash
src/tests/
├── fixtures/        # Test data
├── mocks/           # Reusable mocks
├── utils/           # Helpers
├── user.test.ts     # UserModel tests
├── coach.test.ts    # CoachModel tests
├── authController.test.ts    # AuthController tests
├── searchController.test.ts  # SearchController tests
└── setup.ts         # Jest config
```

**For more details: [Guide for Testing](docs/Testing%20Guide.md)**

---

## UX & Security proof of Concepts

### 1. Prototype screen & UX testing
- AI tool used: Vercel's [v0](https://v0.app/)
- Prototype created for: **Search Screen + Coach Results**.  
- Stored under: `src/screens`  

### 2. UX Testing
- Tool: [Maze](https://maze.co/)  
- Tasks:  
  1. Search for a specific coach
  2. Booking a Session
- Participants: 4 testers 
- Test link: [UX Testing 20min Coach](https://t.maze.co/447054949)
- Results stored in: `/docs/ux-tests/`  

### 3. Authorization  
- Provider: `Supabase`  
- Two-Factor Authentication enabled.  
- Login screen integrated (`LoginScreen.tsx`).  

---

Diagrams stored in `/docs/diagrams/`.

---

### 3. Detailed Layer Design Requirements

Each of these subsections must describe **responsibilities, examples, templates, and outputs** for developers:

- **Visual Components** — hierarchy (atoms/molecules/organisms), accessibility rules, responsive design examples.  
- **Controllers** — mediation logic, hooks integration, validation handling.  
- **Models** — domain objects (`User`, `Coach`), validators, usage examples.  
- **Middleware** — interceptors, error handling, logging.  
- **Business Logic** — reusable services, domain rules.  
- **Proxy/Client** — API abstraction (`api/client.ts`).  
- **Background/Listeners** — WebSocket listeners, periodic refreshers.  
- **Validators** — `validators/validator.ts`, templates.  
- **DTOs** — mapping between API and frontend models.  
- **State Management** — Redux slices + store.  
- **Styles** — responsive rules, dark/light mode strategy.  
- **Utilities** — helpers, singletons.  
- **Exception Handling** — friendly error handling + logging.  
- **Logging** — strategy-pattern logger with pluggable providers.  
- **Security** — auth integration with roles.

---

## 4. Middleware Layer - Error Handling & Logging

### 4.1 Flow and General Purpose

The middleware acts as an interception layer that allows keeping business logic clean and focused. Its main purpose is:

- **Intercept** errors and convert them to a standardized format
- **Log** events and errors consistently
- **Provide** user-friendly messages
- **Keep** business logic free from cross-cutting concerns

```mermaid
graph TD
    A[UI Component] --> B[Controller/Service]
    B --> C[Middleware Wrapper]
    C --> D[Business Logic]
    D --> E[Error/Log Event]
    E --> F[Error Adapter]
    F --> G[AppError]
    G --> H[User Message]
    H --> I[UI Display]
```

### 4.2 Middleware System Architecture

#### Directory Structure
```
src/middleware/
├── types/
│   └── AppError.ts              # Master error class
├── adapters/
│   └── ErrorAdapter.ts          # Adapter for error conversion
├── logging/
│   └── LoggingStrategy.ts       # Logging system with Strategy pattern
├── wrappers/
│   └── MiddlewareWrappers.ts    # Reusable wrappers
├── clients/
│   ├── HttpClient.ts            # Resilient HTTP client
│   ├── WebSocketClient.ts       # WebSocket client with reconnection
│   └── WebRTCClient.ts          # WebRTC client for video calls
├── examples/
│   ├── ExceptionHandlingExamples.ts  # Usage examples
│   └── ErrorBoundaryExample.tsx      # Error Boundary for React
└── index.ts                     # Main entry point
```

### 4.3 Main Components

#### 4.3.1 Master AppError Class

**Responsibility**: Centralize all application errors in a standard format.

```typescript
import { AppError, ERROR_CODES } from '@/middleware';

// Create an error
const error = new AppError(
  ERROR_CODES.AUTH_FAILED,
  'Login credentials invalid',
  { component: 'AuthController', userId: '123' }
);

// Get user-friendly message
const userMessage = error.getMessage(); // "Incorrect email or password."

// Get technical information for logging
const techInfo = error.getTechnicalInfo();
```

**Predefined Error Codes**:
- `NETWORK_TIMEOUT`, `NETWORK_ERROR`
- `HTTP_400`, `HTTP_401`, `HTTP_403`, `HTTP_404`, `HTTP_500`
- `VALIDATION_ERROR`, `EMAIL_INVALID`, `PASSWORD_WEAK`
- `AUTH_FAILED`, `AUTH_TOKEN_EXPIRED`, `AUTH_PERMISSION_DENIED`
- `WS_DISCONNECTED`, `WS_RECONNECT_FAILED`
- `RTC_DEVICE`, `RTC_PERMISSION_DENIED`, `RTC_DEVICE_UNAVAILABLE`

#### 4.3.2 Error Adapter

**Responsibility**: Convert any error to AppError and generate user-friendly messages.

```typescript
import { ErrorAdapter } from '@/middleware';

// Convert raw error to AppError
const appError = ErrorAdapter.toAppError(error, { component: 'MyComponent' });

// Get user-friendly message
const userMessage = ErrorAdapter.toUserMessage(appError);

// Convert specific errors
const supabaseError = ErrorAdapter.fromSupabaseError(supabaseError);
const httpError = ErrorAdapter.fromHttpError(response);
```

#### 4.3.3 Logging System (Strategy Pattern)

**Responsibility**: Log events consistently with multiple providers.

```typescript
import { logger, SupabaseLoggingProvider } from '@/middleware';

// Configure providers
logger.addProvider(new SupabaseLoggingProvider(supabaseClient));

// Log events
logger.info('User logged in', { userId: '123' }, 'AuthController');
logger.error('Login failed', { error: 'Invalid credentials' }, 'AuthController');
logger.warn('API response slow', { duration: 5000 }, 'ApiClient');
```

**Available Providers**:
- `ConsoleLoggingProvider` - Basic console logging
- `SupabaseLoggingProvider` - Structured logging in Supabase
- `SentryLoggingProvider` - Error tracking with Sentry

### 4.4 Middleware Wrappers

#### 4.4.1 Basic Wrappers

**withAppError**: Captures errors and converts them to AppError
```typescript
import { withAppError } from '@/middleware';

const safeFunction = withAppError(myFunction, { component: 'MyComponent' });
```

**withLogging**: Logs operation duration and status
```typescript
import { withLogging } from '@/middleware';

const loggedFunction = withLogging(myFunction, { component: 'MyComponent' });
```

**withMiddleware**: Combines both wrappers
```typescript
import { withMiddleware } from '@/middleware';

const wrappedFunction = withMiddleware(myFunction, { component: 'MyComponent' });
```

#### 4.4.2 Specialized Wrappers

**withPermissionCheck**: Validates permissions before executing
```typescript
import { withPermissionCheck } from '@/middleware';

const protectedFunction = withPermissionCheck(
  myFunction, 
  'COACH_BOOKING',
  { component: 'BookingService' }
);
```

**withAuthentication**: Verifies authentication
```typescript
import { withAuthentication } from '@/middleware';

const authenticatedFunction = withAuthentication(myFunction, { component: 'MyComponent' });
```

**withRetry**: Implements automatic retries
```typescript
import { withRetry } from '@/middleware';

const resilientFunction = withRetry(myFunction, 3, 1000, { component: 'MyComponent' });
```

### 4.5 Resilient Clients

#### 4.5.1 HttpClient

**Features**:
- Automatic retry with exponential backoff
- Circuit breaker to prevent saturation
- Robust timeout handling
- Automatic authentication headers

```typescript
import { httpClient } from '@/middleware';

// Set authentication token
httpClient.setAuthToken('bearer-token');

// Make requests
const coaches = await httpClient.get('/api/coaches');
const newCoach = await httpClient.post('/api/coaches', coachData);
```

#### 4.5.2 WebSocketClient

**Features**:
- Automatic reconnection with exponential backoff
- Heartbeat to keep connection alive
- Connection state handling
- Typed event handlers

```typescript
import { WebSocketClient } from '@/middleware';

const wsClient = new WebSocketClient({
  url: 'wss://api.20mincoach.com/ws',
  reconnectAttempts: 5,
  reconnectDelay: 1000
});

wsClient.onMessage('coach_available', (message) => {
  console.log('Coach available:', message.data);
});

await wsClient.connect();
```

#### 4.5.3 WebRTCClient

**Features**:
- Device permission handling
- Automatic device switching
- Configurable connection timeouts
- Event handlers for connection states

```typescript
import { WebRTCClient } from '@/middleware';

const rtcClient = new WebRTCClient({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

await rtcClient.initialize();
const stream = await rtcClient.requestMediaAccess();
```

### 4.6 Usage Patterns

#### 4.6.1 Form A: Direct Error Handling

**When to use**: Complex business logic that requires granular control.

```typescript
// In a controller
export class AuthController {
  static async loginUser(email: string, password: string): Promise<any> {
    const context = { component: 'AuthController', action: 'loginUser' };
    
    try {
      const response = await httpClient.post('/api/auth/login', { email, password });
      return response.user;
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error, context);
      logger.error('Login failed', { error: appError.getTechnicalInfo() });
      throw appError;
    }
  }
}

// In a component
const handleLogin = async () => {
  try {
    const user = await AuthController.loginUser(email, password);
    // Navigate to next screen
  } catch (error) {
    const appError = ErrorAdapter.toAppError(error);
    const userMessage = ErrorAdapter.toUserMessage(appError);
    Alert.alert('Error', userMessage);
  }
};
```

#### 4.6.2 Form B: Middleware Wrappers

**When to use**: CRUD operations and standard API calls.

```typescript
// Base function (clean)
private static async _searchCoaches(query: string): Promise<Coach[]> {
  const response = await httpClient.get(`/api/coaches/search?q=${query}`);
  return response.coaches;
}

// Wrapped function (automatic handling)
static searchCoaches = withMiddleware(
  CoachService._searchCoaches,
  { component: 'CoachService', action: 'searchCoaches' }
);

// Usage in component
const searchCoaches = async () => {
  try {
    const coaches = await CoachService.searchCoaches(query);
    setCoaches(coaches);
  } catch (error) {
    // Error is already converted and logged automatically
    const userMessage = ErrorAdapter.toUserMessage(error as AppError);
    showToast(userMessage);
  }
};
```

### 4.7 Error Boundary for React

**Responsibility**: Capture rendering errors and show user-friendly error UI.

```typescript
import { ErrorBoundary } from '@/middleware';

function App() {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Send to monitoring service
        logger.error('React error boundary', { error: error.getTechnicalInfo() });
      }}
    >
      <MyApp />
    </ErrorBoundary>
  );
}
```

### 4.8 Developer Guide

#### 4.8.1 Golden Rules

1. **Never allow "raw" errors** from libraries to propagate
2. **Always convert** errors to AppError using ErrorAdapter
3. **UI never decides** error texts, only requests the message
4. **Always log** errors using the logging system
5. **Use middleware wrappers** for standard operations

#### 4.8.2 Workflow

1. **Identify** the layer where the error occurs
2. **Determine** whether to use direct handling or middleware wrapper
3. **Convert** the error to AppError
4. **Log** the error with appropriate context
5. **Show** user-friendly message

#### 4.8.3 Integration Examples

**In Controllers**:
```typescript
export const useSearchCoachesController = () => {
  const [uiError, setUiError] = useState<string | null>(null);
  
  const searchCoaches = async (query: string) => {
    try {
      setUiError(null);
      const coaches = await CoachService.searchCoaches(query);
      return coaches;
    } catch (error) {
      const appError = ErrorAdapter.toAppError(error);
      const userMessage = ErrorAdapter.toUserMessage(appError);
      setUiError(userMessage);
      throw appError;
    }
  };
  
  return { searchCoaches, uiError };
};
```

**In Screens**:
```typescript
export function CoachSearchScreen() {
  const { searchCoaches, uiError } = useSearchCoachesController();
  
  return (
    <View>
      <SearchBar onSearch={searchCoaches} />
      {uiError && <Text style={styles.errorText}>{uiError}</Text>}
    </View>
  );
}
```

### 4.9 Testing

**Requirements**: Unit tests for key middleware system components.

```typescript
// Tests for ErrorAdapter
describe('ErrorAdapter', () => {
  it('should convert generic error to AppError', () => {
    const error = new Error('Test error');
    const appError = ErrorAdapter.toAppError(error);
    expect(appError).toBeInstanceOf(AppError);
    expect(appError.code).toBe('UNKNOWN_ERROR');
  });
  
  it('should generate user-friendly messages', () => {
    const appError = new AppError('AUTH_FAILED', 'Auth failed');
    const userMessage = ErrorAdapter.toUserMessage(appError);
    expect(userMessage).toBe('Email o contraseña incorrectos.');
  });
});

// Tests for HttpClient
describe('HttpClient', () => {
  it('should handle network errors gracefully', async () => {
    // Mock fetch to throw network error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    
    await expect(httpClient.get('/test')).rejects.toThrow(AppError);
  });
});
```  

---

## 5. Logging System

### 5.1 Strategy Pattern Implementation

El sistema de logging utiliza el **Strategy Pattern** para permitir múltiples proveedores de logging sin modificar la lógica central.

```typescript
// Configuración de proveedores
import { logger, SupabaseLoggingProvider, SentryLoggingProvider } from '@/middleware';

// Agregar proveedores
logger.addProvider(new SupabaseLoggingProvider(supabaseClient));
logger.addProvider(new SentryLoggingProvider(sentryClient));

// Uso del logger
logger.info('User logged in', { userId: '123' }, 'AuthController');
logger.error('Login failed', { error: 'Invalid credentials' }, 'AuthController');
```

### 5.2 Available Providers

- **ConsoleLoggingProvider**: Logging básico en consola
- **SupabaseLoggingProvider**: Logging estructurado en Supabase
- **SentryLoggingProvider**: Tracking de errores con Sentry

### 5.3 Log Entry Structure

```typescript
interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: Record<string, any>;
  timestamp: Date;
  component?: string;
  userId?: string;
  action?: string;
  duration?: number;
}
```

---

## 6. Exception Handling System

### 6.1 Centralized Error Management

**Regla de Oro**: Nunca permitir errores "crudos" de librerías externas. Siempre convertir a `AppError`.

```typescript
import { AppError, ERROR_CODES, ErrorAdapter } from '@/middleware';

// Crear un error
const error = new AppError(
  ERROR_CODES.AUTH_FAILED,
  'Login credentials invalid',
  { component: 'AuthController', userId: '123' }
);

// Obtener mensaje amigable para el usuario
const userMessage = error.getMessage(); // "Email o contraseña incorrectos."

// Obtener información técnica para logging
const techInfo = error.getTechnicalInfo();
```

### 6.2 Error Adapter

Convierte cualquier error a `AppError` y genera mensajes amigables:

```typescript
// Convertir error genérico a AppError
const appError = ErrorAdapter.toAppError(error, { component: 'MyComponent' });

// Obtener mensaje amigable
const userMessage = ErrorAdapter.toUserMessage(appError);

// Convertir errores específicos
const supabaseError = ErrorAdapter.fromSupabaseError(supabaseError);
const httpError = ErrorAdapter.fromHttpError(response);
```

### 6.3 Predefined Error Codes

- **Network**: `NETWORK_TIMEOUT`, `NETWORK_ERROR`, `HTTP_400`, `HTTP_401`, etc.
- **Validation**: `VALIDATION_ERROR`, `EMAIL_INVALID`, `PASSWORD_WEAK`
- **Authentication**: `AUTH_FAILED`, `AUTH_TOKEN_EXPIRED`, `AUTH_PERMISSION_DENIED`
- **WebSocket**: `WS_DISCONNECTED`, `WS_RECONNECT_FAILED`
- **WebRTC**: `RTC_DEVICE`, `RTC_PERMISSION_DENIED`, `RTC_DEVICE_UNAVAILABLE`

---

## 7. Utilities & Helpers

### 7.1 Validation Utilities

```typescript
import { validateEmail, validatePassword, validateName, validatePhoneNumber } from '@/utils/validator';

// Validaciones disponibles
const isValidEmail = validateEmail('user@example.com');
const isValidPassword = validatePassword('password123');
const isValidName = validateName('John Doe');
const isValidPhone = validatePhoneNumber('+1234567890');
```

### 7.2 Logger Utility

```typescript
import { Logger } from '@/utils/logger';

// Logger básico para desarrollo
Logger.log('Operation completed', { data: result });
Logger.error('Operation failed', error);
Logger.warn('Slow operation detected', { duration: 5000 });
```

### 7.3 Supabase Configuration

```typescript
import { supabase } from '@/utils/supabase';

// Cliente configurado de Supabase
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

---

## 8. Background Jobs & Listeners

### 8.1 WebSocket Client

Maneja conexiones en tiempo real con reconexión automática:

```typescript
import { WebSocketClient } from '@/middleware';

const wsClient = new WebSocketClient({
  url: 'wss://api.20mincoach.com/ws',
  reconnectAttempts: 5,
  reconnectDelay: 1000
});

// Escuchar eventos
wsClient.onMessage('coach_available', (message) => {
  console.log('Coach available:', message.data);
});

await wsClient.connect();
```

### 8.2 WebRTC Client

Maneja videollamadas con manejo de permisos:

```typescript
import { WebRTCClient } from '@/middleware';

const rtcClient = new WebRTCClient({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

await rtcClient.initialize();
const stream = await rtcClient.requestMediaAccess();
```

### 8.3 HTTP Client

Cliente HTTP resiliente con retry automático:

```typescript
import { httpClient } from '@/middleware';

// Configurar token de autenticación
httpClient.setAuthToken('bearer-token');

// Realizar peticiones
const coaches = await httpClient.get('/api/coaches');
const newCoach = await httpClient.post('/api/coaches', coachData);
```

---

## 9. Middleware System

### 9.1 Middleware Wrappers

Sistema de wrappers para interceptar y procesar operaciones:

```typescript
import { withAppError, withLogging, withMiddleware } from '@/middleware';

// Wrapper básico
const safeFunction = withAppError(myFunction, { component: 'MyComponent' });

// Wrapper con logging
const loggedFunction = withLogging(myFunction, { component: 'MyComponent' });

// Wrapper combinado
const wrappedFunction = withMiddleware(myFunction, { component: 'MyComponent' });
```

### 9.2 Specialized Wrappers

```typescript
import { withPermissionCheck, withAuthentication, withRetry } from '@/middleware';

// Verificar permisos
const protectedFunction = withPermissionCheck(
  myFunction, 
  'COACH_BOOKING',
  { component: 'BookingService' }
);

// Verificar autenticación
const authenticatedFunction = withAuthentication(myFunction, { component: 'MyComponent' });

// Implementar reintentos
const resilientFunction = withRetry(myFunction, 3, 1000, { component: 'MyComponent' });
```

---

## 10. Proof of Concepts (PoCs)

### 10.1 Video Call PoC (`pocs/video-call/`)

**Objetivo**: Demostrar funcionalidad de videollamadas de 20 minutos

**Implementación**:
- WebRTC para comunicación peer-to-peer
- Timer de 20 minutos con notificaciones
- Manejo de permisos de cámara/micrófono
- Interfaz de usuario para controles de llamada

### 10.2 Notifications PoC (`pocs/notifications/`)

**Objetivo**: Demostrar sistema de notificaciones en tiempo real

**Implementación**:
- Notificaciones push nativas
- Notificaciones in-app
- Sistema de suscripción a eventos
- Manejo de estados de notificación

---

## 11. Class Diagram & Design Patterns

### 11.1 Main Classes

El diagrama de clases muestra la arquitectura del sistema con los siguientes componentes principales:

- **User & Coach**: Modelos de dominio
- **Controllers**: Lógica de control (AuthController, SearchController)
- **Slices**: Estado Redux (AuthSlice, CoachesSlice)
- **Services**: Lógica de negocio (CoachService)
- **Clients**: Comunicación externa (ApiClient, WebSocketClient)
- **Middleware**: Interceptores (Logger, ErrorHandler)

### 11.2 Design Patterns Implemented

1. **Strategy Pattern**: Sistema de logging con múltiples proveedores
2. **Singleton Pattern**: Store de Redux, Logger global
3. **Adapter Pattern**: ErrorAdapter para conversión de errores
4. **Factory Pattern**: Creación de diferentes tipos de booking
5. **Observer Pattern**: Sistema de notificaciones y WebSocket
6. **Mediator Pattern**: UIMediator para comunicación entre pantallas

### 11.3 Class Relationships

- **Composition**: User contiene Coach[] (favorites)
- **Inheritance**: AbstractBooking → PremiumBooking, BasicBooking
- **Dependency**: Controllers dependen de Services
- **Association**: Services usan ApiClient

---

## Required Diagrams

All diagrams are stored in `/docs/diagrams/` and exported as **PDF** and editable source files:

1. **N-Layer Architecture Diagram** - Muestra las capas de la aplicación
2. **Class Diagram (UML)** - Diagrama de clases con patrones de diseño
3. **Component Hierarchy** - Estructura de componentes React Native

---
## Visual Components

### Visual component architecture
This project follows an atomic design architecture, structured into three levels of UI components:

```bash
src/components/
├── common/
│   ├── atoms/        # Basic, reusable UI elements (Button, Input, etc.)
│   ├── molecules/    # Groupings of atoms (SearchBar, ProfileHeader, etc.)
│   └── organisms/    # Larger composites (CoachCard, FilterPanel, etc.)
├── auth/             # Screens and flows related to authentication
└── styles/           # Modularized style files for each component
```
Each component has a corresponding .styles.ts file located in the styles/ directory under its appropriate level (atoms, molecules, organisms).

### Reusability & scalability

All UI components are:
- 1. Reusably designed with props for flexibility.
- 2. Separated into visual `(*.tsx)` and styling `(*.styles.ts)` layers.
- 3. Easily themable via a central `ThemeContext`.

Example: `Button.tsx` receives props like disabled, with all visuals defined in `Button.styles.ts.`
 
 ``` tsx
 // src/components/common/atoms/Button.tsx
 interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}
```

``` ts
// src/components/styles/atoms/Button.styles.tsx
export const createButtonStyles = (theme: ThemeContextType, disabled = false) =>
  StyleSheet.create({
    baseStyle: {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    // ...
    ghostTextStyles: {
      color: disabled ? theme.colors.textSecondary : theme.colors.primary,
  },
});
 ```

### Responsive design guidelines

Responsiveness is managed via:
- **Flexbox** layouts for dynamic resizing.
- **StyleSheet** composition for base, responsive, and conditional styles.
- Shared layout patterns in `GlobalStyles.tsx`.

---
## Styles

## Theme Strategy

Dark and light themes are implemented via:
- A global [ThemeContext](src/components/styles/ThemeContext.tsx). This helps to centralized theme values.
- All styles reference the active theme from context.

**How it Works**

A `ThemeProvider` wraps the application and manages theme state.
The theme preference (light, dark, or system) is stored persistently using `AsyncStorage`. Theme colors are defined in a consistent shape via a `ThemeColors` interface for strong typing and reusability.

Each theme (light and dark) defines values for:
```tsx
interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  error: string;
  success: string;
  warning: string;
}
```

Example
```tsx
import { useTheme } from '../styles/ThemeContext';

const MyComponent = () => {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello Theme!</Text>
    </View>
  );
};
```

### Styling strategy

|**Principle**	| **Pecommended practice**	| 
| --- | --- |
|Modular styles	| One style file per component (`*.styles.ts`)	| 
|Theme support	| Central `ThemeContext` with light/dark toggling	| 
|Responsive rules	| Flexbox layout, % widths 	| 
|Layout styles	| Stored in `GlobalStyles.tsx`	| 

All style files use `StyleSheet.create()` to enable React Native optimization.

### Developer instructions

These rules must be followed by the development team when contributing in the UI:
- When creating a new reusable component, select the appropriate level (atom, molecule, or organism).
- Create a new style file when building a new component (e.g. `NewButton.styles.ts`) in the corresponding level folder.
- Use the theme context to apply colors, spacing, and font sizes (recommended to maintain consistency with the app’s overall design).
- Avoid hardcoding styles directly in `.tsx` files; place all styles in a corresponding `*.styles.ts` file. (Only very specific or unlikely-to-change details can be exceptions.)
- Ensure mobile responsiveness using flex, percentages (%), Dimensions, etc.
- Test both light and dark modes before submitting changes.

---

## Linter configuration

This project uses [ESLint](https://eslint.org/) as the linting tool to ensure clean, consistent, and error-free code. ESLint is configured with support for TypeScript, React, React Hooks, and Prettier integration for formatting. Also other pluggins used are:
- `@typescript-eslint/eslint-plugin` — TypeScript support.
- `eslint-plugin-react` — React-specific rules.
- `eslint-plugin-react-hooks` — Rules for hooks best practices.
- `eslint-plugin-prettier` — Enforces Prettier formatting rules. 

### Rules/conventions

#### Base JavaScript Rules (from `@eslint/js`)

Standard best practices for JavaScript, including:
- Disallow unused variables
- Disallow unreachable code
- Warn about confusing arrow functions or misuse of == vs ===
- Enforce curly braces for blocks
- Encourage === over ==

#### TypeScript Rules (from `@typescript-eslint`)

- `@typescript-eslint/no-unused-vars`: Disallow unused variables (Error)
- `@typescript-eslint/no-explicit-any`: Discourages using any type (Warning)
- Enforces strict typing and clean, maintainable TypeScript code
- Checks function return types, parameter consistency, and type safety

#### React Rules (from `eslint-plugin-react`)

- Enforces best practices in React components
- Validates JSX syntax
- Warns if component props aren’t used properly
- Helps avoid unnecessary re-renders or unsafe lifecycle methods

#### Prettier Formatting Rules (from `eslint-plugin-prettier`)

- All code must follow Prettier formatting
- Any formatting issues (indentation, spacing, quotes, etc.) are treated as errors
- Helps keep consistent code style across the entire team

#### Custom Rules
- `no-console`: Warn when using console.log
- `prefer-const`: Prefer const over let if possible
- `no-var`: Disallow use of var

### Running ESLint
```bash
npm run lint # to check your code
npm run lint --fix # to automatically fix problems
```

## Deliverables Checklist  TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!

1. DIAGRAMAS FALTANTES
  - [ ] Architecture-diagram.pdf - Diagrama N-Layer claro
  - [ ] Class-diagram.pdf - Con patrones de diseño etiquetados
  - [ ] Component-hierarchy.pdf - Estructura de componentes React

2. PRUEBAS DE CONCEPTO (PoCs) REALES
  - [ ] PoC #1: Video llamada funcional (20min timer incluido)
  - [ ] PoC #2: Sistema de roles funcionando (BasicUser/PremiumUser)
  - [ ] PoC #3: Búsqueda en tiempo real con filtros
  - [ ] PoC #4: Notificaciones en tiempo real

3. AUTENTICACIÓN
  - [ ] Auth0/Clerk configurado con 2 roles
  - [ ] BasicUser: Solo puede buscar coaches
  - [ ] PremiumUser: Puede buscar + reservar instantáneamente
  - [ ] MFA (Two Factor) funcionando
  - [ ] Middleware de permisos implementado

4. TESTING
  - [ ] 3 UNIT TESTS para AuthController (deben pasar)
  - [ ] 3 UNIT TESTS para Coach model (deben pasar)
  - [ ] Tests ejecutándose en pipeline
  - [ ] Scripts: npm test → funciona

5. UX/UI
  - [ ] Test con Maze/Useberry (5 participantes reales)
  - [ ] Evidencia: screenshots de resultados

6. ARQUITECTURA IMPLEMENTADA
  - [ ] Capa Middleware: error handling, logging, auth
  - [ ] Capa Business: lógica de negocio real
  - [ ] Capa Services: API clients funcionales
  - [ ] Capa Utils: loggers, validators

LO QUE EL PROFESOR VA A REVISAR ESPECÍFICAMENTE
[ ] 1. ¿Puedo clonar el repo y ejecutar `npm test` sin errores?
[ ] 2. ¿Los 6 tests unitarios PASAN?
[ ] 3. ¿Puedo hacer login como BasicUser y PremiumUser?
[ ] 4. ¿Veo diferentes funcionalidades según mi rol?
[ ] 5. ¿El diagrama de arquitectura es claro y profesional?
[ ] 6. ¿Hay evidencia de testing UX con personas reales?
[ ] 7. ¿Puedo entender TODO con solo leer el README.md?

---

## Timeline

- **Last commit date:** Wednesday, October 1,2025
- **Participation requirement:** Every group member must contribute commits weekly.  

---

## License
This repository is for **educational and prototype purposes only**.  
