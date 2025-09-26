# Estrategia de Testing - 20minCoach

## Resumen Ejecutivo

Esta documentación define la estrategia de testing para la aplicación 20minCoach, enfocándose en pruebas unitarias con Jest como herramienta principal. La estrategia garantiza la calidad del código, facilita el mantenimiento y proporciona confianza en el desarrollo continuo.

## 1. Tecnologías de Testing Seleccionadas

### Framework Principal: Jest
- **Versión**: 29.7.0
- **Justificación**: 
  - Integración nativa con React Native
  - Soporte completo para TypeScript
  - Mocking avanzado y snapshots
  - Cobertura de código integrada
  - Amplia comunidad y documentación

### Librerías Complementarias
- **@testing-library/react-native**: Para testing de componentes React Native
- **@testing-library/jest-native**: Matchers adicionales para React Native
- **react-test-renderer**: Para renderizado de componentes en tests

## 2. Arquitectura de Testing

### Estructura de Directorios
```
src/
├── tests/
│   ├── unit/              # Tests unitarios
│   │   ├── models/        # Tests de modelos
│   │   ├── controllers/   # Tests de controladores
│   │   ├── utils/         # Tests de utilidades
│   │   └── components/    # Tests de componentes
│   ├── integration/       # Tests de integración
│   ├── e2e/              # Tests end-to-end
│   ├── fixtures/         # Datos de prueba
│   ├── mocks/            # Mocks reutilizables
│   └── setup.ts          # Configuración global
├── __mocks__/            # Mocks automáticos
└── jest.config.js        # Configuración de Jest
```

### Patrones de Testing Implementados

#### 1. AAA Pattern (Arrange, Act, Assert)
```typescript
describe('UserModel', () => {
  test('should create user with correct properties', () => {
    // Arrange
    const id = '1'
    const email = 'test@example.com'
    const role = 'BasicUser'
    
    // Act
    const user = new UserModel(id, email, role)
    
    // Assert
    expect(user.id).toBe(id)
    expect(user.email).toBe(email)
    expect(user.role).toBe(role)
  })
})
```

#### 2. Test Doubles (Mocks, Stubs, Spies)
```typescript
// Mock de servicios externos
jest.mock('../services/apiService', () => ({
  ApiService: {
    login: jest.fn(),
    logout: jest.fn()
  }
}))
```

#### 3. Data Builders
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
  
  build(): User {
    return new UserModel(
      this.user.id || 'default-id',
      this.user.email || 'default@example.com',
      this.user.role || 'BasicUser'
    )
  }
}
```

## 3. Cobertura de Testing

### Objetivos de Cobertura
- **Líneas de código**: 80% mínimo
- **Funciones**: 90% mínimo
- **Ramas**: 75% mínimo
- **Declaraciones**: 80% mínimo

### Métricas por Capa
- **Models**: 95% (lógica de negocio crítica)
- **Controllers**: 85% (orquestación de lógica)
- **Utils**: 90% (funciones auxiliares)
- **Components**: 70% (UI components)

## 4. Tipos de Tests

### 4.1 Unit Tests
**Propósito**: Probar unidades individuales de código en aislamiento

**Cobertura**:
- Modelos de datos (User, Coach)
- Controladores (AuthController, SearchController)
- Utilidades (validators, logger)
- Funciones puras

**Ejemplo**:
```typescript
describe('AuthController', () => {
  describe('login', () => {
    test('should validate email format', async () => {
      await expect(
        AuthController.login('invalid-email', 'password123')
      ).rejects.toThrow('Invalid email format')
    })
  })
})
```

### 4.2 Integration Tests
**Propósito**: Probar la interacción entre múltiples componentes

**Cobertura**:
- Flujos de autenticación completos
- Integración entre controladores y modelos
- Comunicación con APIs externas

### 4.3 Component Tests
**Propósito**: Probar componentes React Native de forma aislada

**Cobertura**:
- Renderizado correcto
- Interacciones del usuario
- Props y estado
- Navegación

## 5. Estrategia de Mocking

### 5.1 Mocks Automáticos
```typescript
// __mocks__/react-native.js
export default {
  Alert: {
    alert: jest.fn()
  },
  Platform: {
    OS: 'ios'
  }
}
```

### 5.2 Mocks Manuales
```typescript
const mockApiService = {
  login: jest.fn().mockResolvedValue({ success: true }),
  logout: jest.fn().mockResolvedValue({ success: true })
}
```

### 5.3 Mock Data
```typescript
// tests/fixtures/userData.ts
export const mockUsers = {
  basicUser: {
    id: '1',
    email: 'basic@example.com',
    role: 'BasicUser' as const,
    name: 'Basic User'
  },
  premiumUser: {
    id: '2',
    email: 'premium@example.com',
    role: 'PremiumUser' as const,
    name: 'Premium User'
  }
}
```

## 6. Configuración de Jest

### 6.1 jest.config.js
```javascript
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js)',
    '**/*.(test|spec).(ts|tsx|js)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/tests/**',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}'
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

## 7. Scripts de Testing

### 7.1 Scripts de NPM
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration"
  }
}
```

### 7.2 Scripts de CI/CD
```bash
# Ejecutar tests en CI
npm run test:ci

# Generar reporte de cobertura
npm run test:coverage

# Ejecutar tests específicos
npm test -- --testNamePattern="AuthController"
```

## 8. Guías para Desarrolladores

### 8.1 Cómo Escribir Tests

#### Estructura de un Test
```typescript
describe('ComponentName', () => {
  // Setup común
  beforeEach(() => {
    // Configuración antes de cada test
  })

  afterEach(() => {
    // Limpieza después de cada test
  })

  describe('methodName', () => {
    test('should do something when condition is met', () => {
      // Arrange
      const input = 'test input'
      
      // Act
      const result = component.method(input)
      
      // Assert
      expect(result).toBe('expected output')
    })
  })
})
```

#### Convenciones de Naming
- **Archivos de test**: `ComponentName.test.ts` o `ComponentName.spec.ts`
- **Describe blocks**: Nombre del componente o método
- **Test cases**: Descripción clara de lo que se está probando
- **Variables**: Prefijo `mock` para datos de prueba

### 8.2 Cómo Agregar Nuevos Tests

1. **Identificar qué probar**:
   - Funcionalidad nueva
   - Bug fixes
   - Refactoring

2. **Escribir el test**:
   - Seguir el patrón AAA
   - Usar nombres descriptivos
   - Incluir casos edge

3. **Verificar cobertura**:
   - Ejecutar `npm run test:coverage`
   - Asegurar cobertura mínima

4. **Integrar en CI**:
   - Verificar que pase en pipeline
   - Documentar cambios

### 8.3 Debugging Tests

#### Herramientas
- **Jest CLI**: `npm test -- --verbose`
- **VS Code**: Extensión Jest
- **Chrome DevTools**: `--inspect-brk`

#### Técnicas
```typescript
// Debug específico
test.only('should debug this test', () => {
  // Solo este test se ejecutará
})

// Logging en tests
test('should log values', () => {
  const result = someFunction()
  console.log('Result:', result)
  expect(result).toBeDefined()
})
```

## 9. Métricas y Reportes

### 9.1 Métricas de Calidad
- **Cobertura de código**: Generada automáticamente
- **Tiempo de ejecución**: Monitoreado en CI
- **Tasa de fallos**: Trackeada por test suite

### 9.2 Reportes
- **HTML Coverage Report**: `coverage/lcov-report/index.html`
- **JSON Coverage**: `coverage/coverage-final.json`
- **JUnit XML**: Para integración con CI

## 10. Mejores Prácticas

### 10.1 Do's
-  Escribir tests antes del código (TDD)
-  Mantener tests simples y legibles
-  Usar nombres descriptivos
-  Probar casos edge y errores
-  Mantener tests independientes
-  Usar mocks apropiadamente

### 10.2 Don'ts
-  No probar implementación interna
-  No crear tests frágiles
-  No ignorar tests fallidos
-  No duplicar lógica de negocio en tests
-  No usar datos reales en tests

## 11. Roadmap de Testing

### Fase 1 (Actual)
-  Configuración básica de Jest
-  Tests unitarios para modelos
-  Tests para controladores principales

### Fase 2 (Próxima)
-  Tests de componentes React Native
-  Tests de integración
-  Mocks avanzados

### Fase 3 (Futuro)
-  Tests E2E con Detox
-  Tests de performance
-  Tests de accesibilidad


