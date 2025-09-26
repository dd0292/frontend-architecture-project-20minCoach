# Guías para Desarrolladores - Testing en 20minCoach

## Índice
1. [Introducción](#introducción)
2. [Configuración Inicial](#configuración-inicial)
3. [Cómo Escribir Tests](#cómo-escribir-tests)
4. [Patrones y Convenciones](#patrones-y-convenciones)
5. [Cómo Agregar Nuevos Tests](#cómo-agregar-nuevos-tests)
6. [Debugging y Troubleshooting](#debugging-y-troubleshooting)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Ejemplos Prácticos](#ejemplos-prácticos)

## Introducción

Esta guía está diseñada para ayudar a los desarrolladores a escribir, mantener y ejecutar tests efectivos en el proyecto 20minCoach. Sigue las mejores prácticas de testing en React Native y TypeScript.

## Configuración Inicial

### Prerrequisitos
- Node.js 16+
- npm o yarn
- VS Code (recomendado) con extensión Jest

### Instalación
```bash
# Instalar dependencias
npm install

# Verificar configuración
npm test
```

### Configuración de VS Code
Crear `.vscode/settings.json`:
```json
{
  "jest.jestCommandLine": "npm test --",
  "jest.autoRun": "watch",
  "jest.showCoverageOnLoad": true
}
```

## Cómo Escribir Tests

### Estructura Básica

#### Template para Test de Modelo
```typescript
import { ModelName } from "../models/ModelName"

describe("ModelName", () => {
  let model: ModelName

  beforeEach(() => {
    // Setup común para cada test
    model = new ModelName(/* datos de prueba */)
  })

  afterEach(() => {
    // Cleanup si es necesario
  })

  describe("methodName", () => {
    test("should do something when condition is met", () => {
      // Arrange
      const input = "test input"
      const expectedOutput = "expected output"
      
      // Act
      const result = model.methodName(input)
      
      // Assert
      expect(result).toBe(expectedOutput)
    })

    test("should handle edge case", () => {
      // Test para casos edge
    })
  })
})
```

#### Template para Test de Controlador
```typescript
import { ControllerName } from "../controllers/controllerName"

describe("ControllerName", () => {
  // Mocks si es necesario
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("methodName", () => {
    test("should return expected result for valid input", async () => {
      // Arrange
      const input = { /* datos de entrada */ }
      
      // Act
      const result = await ControllerName.methodName(input)
      
      // Assert
      expect(result).toBeDefined()
      expect(result.property).toBe("expected value")
    })

    test("should throw error for invalid input", async () => {
      // Test de manejo de errores
      await expect(ControllerName.methodName(invalidInput))
        .rejects.toThrow("Expected error message")
    })
  })
})
```

### Patrón AAA (Arrange, Act, Assert)

#### Ejemplo Completo
```typescript
test("should calculate total price with tax", () => {
  // Arrange
  const basePrice = 100
  const taxRate = 0.1
  const expectedTotal = 110
  
  // Act
  const total = calculateTotalPrice(basePrice, taxRate)
  
  // Assert
  expect(total).toBe(expectedTotal)
})
```

## Patrones y Convenciones

### Naming Conventions

#### Archivos
- Tests de modelos: `ModelName.test.ts`
- Tests de controladores: `ControllerName.test.ts`
- Tests de componentes: `ComponentName.test.tsx`

#### Describe Blocks
```typescript
describe("UserModel", () => {           // Nombre de la clase
  describe("isPremiumUser", () => {     // Nombre del método
    test("should return true for premium users", () => {  // Descripción clara
```

#### Variables de Test
```typescript
// Prefijos descriptivos
const mockUser = { /* datos */ }
const validEmail = "test@example.com"
const expectedResult = "expected value"
const invalidInput = null
```

### Data Builders

#### Implementación
```typescript
class UserBuilder {
  private user: Partial<User> = {}
  
  withId(id: string) {
    this.user.id = id
    return this
  }
  
  withEmail(email: string) {
    this.user.email = email
    return this
  }
  
  withRole(role: UserRole) {
    this.user.role = role
    return this
  }
  
  asPremium() {
    this.user.role = "PremiumUser"
    return this
  }
  
  build(): User {
    return new UserModel(
      this.user.id || "default-id",
      this.user.email || "default@example.com",
      this.user.role || "BasicUser",
      this.user.name
    )
  }
}

// Uso en tests
const premiumUser = new UserBuilder()
  .withEmail("premium@example.com")
  .asPremium()
  .build()
```

### Mocks y Stubs

#### Mock de Servicios
```typescript
// Crear mock
const mockApiService = {
  login: jest.fn(),
  logout: jest.fn(),
  getUserProfile: jest.fn()
}

// Configurar comportamiento
mockApiService.login.mockResolvedValue({ success: true, user: mockUser })
mockApiService.login.mockRejectedValue(new Error("Network error"))

// Verificar llamadas
expect(mockApiService.login).toHaveBeenCalledWith(email, password)
expect(mockApiService.login).toHaveBeenCalledTimes(1)
```

#### Mock de Módulos
```typescript
// Mock completo de módulo
jest.mock("../services/apiService", () => ({
  ApiService: {
    login: jest.fn(),
    logout: jest.fn()
  }
}))

// Mock parcial
jest.mock("../utils/logger", () => ({
  ...jest.requireActual("../utils/logger"),
  logError: jest.fn()
}))
```

## Cómo Agregar Nuevos Tests

### Proceso Paso a Paso

#### 1. Identificar qué probar
- Nueva funcionalidad
- Bug fix
- Refactoring
- Casos edge no cubiertos

#### 2. Crear archivo de test
```bash
# Para modelo
touch src/tests/models/NewModel.test.ts

# Para controlador
touch src/tests/controllers/NewController.test.ts
```

#### 3. Escribir tests
- Seguir patrón AAA
- Cubrir casos happy path y edge cases
- Incluir tests de error

#### 4. Ejecutar tests
```bash
# Test específico
npm test -- --testPathPattern=NewModel.test.ts

# Todos los tests
npm test
```

#### 5. Verificar cobertura
```bash
npm run test:coverage
```

#### 6. Integrar en CI
- Verificar que pase en pipeline
- Documentar cambios en PR

### Checklist de Nuevo Test

- [ ] Archivo creado con naming correcto
- [ ] Describe blocks organizados lógicamente
- [ ] Tests cubren casos principales y edge cases
- [ ] Mocks configurados apropiadamente
- [ ] Assertions son específicas y claras
- [ ] Tests son independientes
- [ ] Cleanup en afterEach si es necesario
- [ ] Cobertura verificada
- [ ] Tests pasan en CI

## Debugging y Troubleshooting

### Herramientas de Debug

#### VS Code
1. Instalar extensión Jest
2. Usar breakpoints en tests
3. Ver cobertura en tiempo real

#### Chrome DevTools
```bash
npm test -- --inspect-brk
# Abrir chrome://inspect
```

#### Jest CLI
```bash
# Modo verbose
npm test -- --verbose

# Test específico
npm test -- --testNamePattern="specific test"

# Debug mode
npm test -- --inspect-brk --testNamePattern="failing test"
```

### Problemas Comunes

#### Tests que fallan intermitentemente
```typescript
// Malo - compartir estado
let counter = 0
test("test 1", () => {
  counter++
  expect(counter).toBe(1)
})

test("test 2", () => {
  counter++
  expect(counter).toBe(2) // Puede fallar si se ejecuta primero
})

// Bueno - estado aislado
test("test 1", () => {
  let counter = 0
  counter++
  expect(counter).toBe(1)
})
```

#### Async/await issues
```typescript
// Malo - no esperar async
test("async test", () => {
  someAsyncFunction()
  expect(something).toBe(true) // Puede fallar
})

// Bueno - esperar async
test("async test", async () => {
  await someAsyncFunction()
  expect(something).toBe(true)
})
```

#### Mocks no funcionan
```typescript
// ❌ Malo - mock después de import
import { apiService } from "../services/apiService"
jest.mock("../services/apiService") // Muy tarde

// Bueno - mock antes de import
jest.mock("../services/apiService")
import { apiService } from "../services/apiService"
```

## Mejores Prácticas

### Do's

#### Escribir tests legibles
```typescript
// Bueno - descriptivo
test("should return error when email is invalid", () => {
  const invalidEmail = "not-an-email"
  expect(() => validateEmail(invalidEmail)).toThrow("Invalid email format")
})

// Malo - no descriptivo
test("should work", () => {
  expect(validateEmail("test")).toBe(false)
})
```

#### Usar setup/teardown apropiadamente
```typescript
describe("UserService", () => {
  let userService: UserService
  
  beforeEach(() => {
    userService = new UserService()
    // Setup común
  })
  
  afterEach(() => {
    // Cleanup
    jest.clearAllMocks()
  })
})
```

#### Probar comportamiento, no implementación
```typescript
// Bueno - probar comportamiento
test("should authenticate user with valid credentials", async () => {
  const result = await authController.login("user@example.com", "password")
  expect(result.isAuthenticated).toBe(true)
})

// Malo - probar implementación
test("should call apiService.login", async () => {
  await authController.login("user@example.com", "password")
  expect(apiService.login).toHaveBeenCalled() // Demasiado específico
})
```

### Don'ts

#### No probar implementación interna
```typescript
// Malo
test("should set internal state", () => {
  const user = new User()
  user.login("email", "password")
  expect(user._isLoggedIn).toBe(true) // Acceso a estado interno
})
```

#### No crear tests frágiles
```typescript
// Malo - dependiente de orden
test("should increment counter", () => {
  globalCounter++
  expect(globalCounter).toBe(1)
})
```

#### No ignorar tests fallidos
```typescript
// Malo - test.skip sin razón
test.skip("should work", () => {
  // Test que no funciona
})
```

## Ejemplos Prácticos

### Test de Modelo Completo
```typescript
import { UserModel } from "../models/User"

describe("UserModel", () => {
  let user: UserModel

  beforeEach(() => {
    user = new UserModel("1", "test@example.com", "BasicUser", "Test User")
  })

  describe("isPremiumUser", () => {
    test("should return true for premium users", () => {
      const premiumUser = new UserModel("2", "premium@example.com", "PremiumUser")
      expect(premiumUser.isPremiumUser()).toBe(true)
    })

    test("should return false for basic users", () => {
      expect(user.isPremiumUser()).toBe(false)
    })

    test("should return false for coaches", () => {
      const coach = new UserModel("3", "coach@example.com", "Coach")
      expect(coach.isPremiumUser()).toBe(false)
    })
  })

  describe("canAccessPremiumFeatures", () => {
    test("should return true for premium users", () => {
      const premiumUser = new UserModel("2", "premium@example.com", "PremiumUser")
      expect(premiumUser.canAccessPremiumFeatures()).toBe(true)
    })

    test("should return true for coaches", () => {
      const coach = new UserModel("3", "coach@example.com", "Coach")
      expect(coach.canAccessPremiumFeatures()).toBe(true)
    })

    test("should return false for basic users", () => {
      expect(user.canAccessPremiumFeatures()).toBe(false)
    })
  })
})
```

### Test de Controlador Completo
```typescript
import { AuthController } from "../controllers/authController"

// Mock del modelo
jest.mock("../models/User", () => ({
  UserModel: jest.fn().mockImplementation((id, email, role, name) => ({
    id,
    email,
    role,
    name,
    isPremiumUser: () => role === "PremiumUser",
    isCoach: () => role === "Coach"
  }))
}))

describe("AuthController", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("login", () => {
    test("should create user with correct properties", async () => {
      const email = "test@example.com"
      const password = "password123"
      
      const user = await AuthController.login(email, password)
      
      expect(user.email).toBe(email)
      expect(user.role).toBe("BasicUser")
    })

    test("should create coach for coach email", async () => {
      const user = await AuthController.login("coach@example.com", "password123")
      
      expect(user.role).toBe("Coach")
    })

    test("should throw error for empty email", async () => {
      await expect(AuthController.login("", "password123"))
        .rejects.toThrow("Email and password are required")
    })

    test("should throw error for short password", async () => {
      await expect(AuthController.login("test@example.com", "123"))
        .rejects.toThrow("Password must be at least 6 characters")
    })
  })
})
```

## Recordatorios

1. **Escribir tests claros y mantenibles**
2. **Seguir las convenciones establecidas**
3. **Probar comportamiento, no implementación**
4. **Mantener tests independientes**
5. **Verificar cobertura regularmente**

