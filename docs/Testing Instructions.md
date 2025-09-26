# Instrucciones de Testing - 20minCoach

## Instrucciones Rápidas

### 1. Ejecutar Todos los Tests
```bash
cd src
npm test
```

### 2. Ejecutar Tests con Cobertura
```bash
cd src
npm run test:coverage
```

### 3. Ejecutar Tests en Modo Watch
```bash
cd src
npm run test:watch
```

## Verificación de Tests

### Tests Implementados

#### Tests para UserModel (3+ tests)
- `src/tests/user.test.ts`
- Tests de roles (BasicUser, PremiumUser, Coach)
- Tests de métodos de verificación
- Tests de creación de usuarios

#### Tests para CoachModel (3+ tests)
- `src/tests/coach.test.ts`
- Tests de constructor y propiedades
- Tests de método `hasTag`
- Tests de método `matchesSpecialization`
- Tests de casos edge

#### Tests para AuthController (3+ tests)
- `src/tests/authController.test.ts`
- Tests de login exitoso
- Tests de validación de credenciales
- Tests de manejo de errores
- Tests de diferentes roles de usuario

#### Tests para SearchController (3+ tests)
- `src/tests/searchController.test.ts`
- Tests de validación de descripción de problema
- Tests de filtrado de coaches
- Tests de obtención de tags disponibles

### Verificar que los Tests Pasen

#### 1. Ejecutar Tests Individuales
```bash
# Tests de modelos
npm test -- --testPathPattern=user.test.ts
npm test -- --testPathPattern=coach.test.ts

# Tests de controladores
npm test -- --testPathPattern=authController.test.ts
npm test -- --testPathPattern=searchController.test.ts
```

#### 2. Verificar Cobertura
```bash
npm run test:coverage
```

Deberías ver algo como:
```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |   85.2  |   78.5   |   92.1  |   84.8  |
 models/          |   95.0  |   90.0   |   98.0  |   94.5  |
  User.ts         |   95.0  |   90.0   |   98.0  |   94.5  |
  Coach.ts        |   95.0  |   90.0   |   98.0  |   94.5  |
 controllers/     |   85.0  |   80.0   |   90.0  |   84.0  |
  authController.ts|  85.0  |   80.0   |   90.0  |   84.0  |
  searchController.ts| 85.0 |   80.0   |   90.0  |   84.0  |
------------------|---------|----------|---------|---------|-------------------
```

## Estructura de Archivos de Testing

```
src/
├── tests/
│   ├── fixtures/
│   │   └── testData.ts          # Datos de prueba reutilizables
│   ├── mocks/
│   │   └── apiMocks.ts          # Mocks de servicios
│   ├── utils/
│   │   └── testHelpers.ts       # Utilidades de testing
│   ├── user.test.ts             # Tests de UserModel
│   ├── coach.test.ts            # Tests de CoachModel
│   ├── authController.test.ts   # Tests de AuthController
│   ├── searchController.test.ts # Tests de SearchController
│   └── setup.ts                 # Configuración de Jest
├── jest.config.js               # Configuración principal de Jest
└── package.json                 # Scripts de testing
```

## Scripts Disponibles

### Scripts Principales
- `npm test` - Ejecutar todos los tests
- `npm run test:watch` - Ejecutar tests en modo watch
- `npm run test:coverage` - Ejecutar tests con reporte de cobertura
- `npm run test:ci` - Ejecutar tests para CI/CD

### Scripts Específicos
- `npm run test:models` - Solo tests de modelos
- `npm run test:controllers` - Solo tests de controladores
- `npm run test:unit` - Solo tests unitarios

## Verificación de Requisitos del Caso

### Requisito 1: 3 Unit Tests para 2 Clases Diferentes
- **UserModel**: 3+ tests implementados
- **CoachModel**: 3+ tests implementados
- **AuthController**: 3+ tests implementados
- **SearchController**: 3+ tests implementados

### Requisito 2: Scripts de Testing
- Scripts de npm configurados
- Instrucciones de ejecución documentadas
- Verificación de que los tests pasan/fallan

### Requisito 3: Instrucciones para Desarrolladores
- Guías completas en `docs/Developer Testing Guidelines.md`
- Patrones de testing documentados
- Ejemplos prácticos incluidos

## Troubleshooting

### Problemas Comunes

#### 1. Tests no se ejecutan
```bash
# Verificar que estás en el directorio correcto
cd src

# Verificar que las dependencias están instaladas
npm install

# Verificar configuración de Jest
npm test -- --verbose
```

#### 2. Tests fallan
```bash
# Ejecutar tests específicos para debug
npm test -- --testNamePattern="specific test name"

# Ver output detallado
npm test -- --verbose
```

#### 3. Cobertura baja
```bash
# Verificar qué líneas no están cubiertas
npm run test:coverage

# Abrir reporte HTML
open coverage/lcov-report/index.html
```

### Verificación Final

Para verificar que todo está funcionando correctamente:

1. **Ejecutar todos los tests**:
   ```bash
   cd src
   npm test
   ```

2. **Verificar cobertura**:
   ```bash
   npm run test:coverage
   ```

3. **Verificar que los tests fallan apropiadamente**:
   - Modificar temporalmente un test para que falle
   - Verificar que el test falla
   - Restaurar el test

4. **Verificar documentación**:
   - Revisar que todos los archivos de documentación están presentes
   - Verificar que los enlaces funcionan
   - Confirmar que las instrucciones son claras


