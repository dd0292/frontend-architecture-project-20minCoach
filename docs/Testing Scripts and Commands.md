# Scripts de Testing y Comandos - 20minCoach

## Scripts Disponibles

### Scripts Principales

#### `npm test`
Ejecuta todos los tests del proyecto
```bash
npm test
```

#### `npm run test:watch`
Ejecuta tests en modo watch (se re-ejecutan automáticamente al cambiar archivos)
```bash
npm run test:watch
```

#### `npm run test:coverage`
Ejecuta todos los tests y genera reporte de cobertura
```bash
npm run test:coverage
```

#### `npm run test:ci`
Ejecuta tests en modo CI (sin watch, con cobertura)
```bash
npm run test:ci
```

### Scripts Específicos por Categoría

#### `npm run test:unit`
Ejecuta solo tests unitarios
```bash
npm run test:unit
```

#### `npm run test:integration`
Ejecuta solo tests de integración
```bash
npm run test:integration
```

#### `npm run test:models`
Ejecuta tests específicos de modelos
```bash
npm run test:models
```

#### `npm run test:controllers`
Ejecuta tests específicos de controladores
```bash
npm run test:controllers
```

## Comandos Avanzados

### Ejecutar Tests Específicos

#### Por archivo
```bash
npm test -- --testPathPattern=user.test.ts
```

#### Por patrón de nombre
```bash
npm test -- --testNamePattern="AuthController"
```

#### Por describe block
```bash
npm test -- --testNamePattern="login"
```

### Opciones de Jest

#### Modo verbose (más detallado)
```bash
npm test -- --verbose
```

#### Ejecutar solo tests que fallaron
```bash
npm test -- --onlyFailures
```

#### Ejecutar tests en paralelo
```bash
npm test -- --maxWorkers=4
```

#### Ejecutar tests en modo debug
```bash
npm test -- --inspect-brk
```

### Generar Reportes

#### Reporte HTML de cobertura
```bash
npm run test:coverage
# Abrir: coverage/lcov-report/index.html
```

#### Reporte JSON de cobertura
```bash
npm test -- --coverage --coverageReporters=json
```

#### Reporte en formato JUnit (para CI)
```bash
npm test -- --coverage --coverageReporters=json --reporters=default --reporters=jest-junit
```

## Configuración de Entornos

### Variables de Entorno para Testing

Crear archivo `.env.test`:
```env
NODE_ENV=test
API_BASE_URL=http://localhost:3000/api
MOCK_API=true
```

### Configuración de CI/CD

#### GitHub Actions
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:ci
      - uses: codecov/codecov-action@v1
```

#### GitLab CI
```yaml
test:
  stage: test
  script:
    - npm ci
    - npm run test:ci
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

## Debugging de Tests

### Herramientas de Debug

#### VS Code
1. Instalar extensión "Jest"
2. Configurar en `.vscode/settings.json`:
```json
{
  "jest.jestCommandLine": "npm test --",
  "jest.autoRun": "off"
}
```

#### Chrome DevTools
```bash
npm test -- --inspect-brk
# Abrir chrome://inspect en Chrome
```

### Técnicas de Debug

#### Test específico
```typescript
test.only('should debug this test', () => {
  // Solo este test se ejecutará
})
```

#### Skip tests
```typescript
test.skip('should skip this test', () => {
  // Este test se saltará
})
```

#### Logging en tests
```typescript
test('should log values', () => {
  const result = someFunction()
  console.log('Debug result:', result)
  expect(result).toBeDefined()
})
```

## Métricas y Monitoreo

### Cobertura de Código

#### Verificar cobertura mínima
```bash
npm run test:coverage
# Verificar que se cumplan los thresholds en jest.config.js
```

#### Cobertura por archivo
```bash
npm test -- --coverage --collectCoverageFrom="src/models/**/*.{ts,tsx}"
```

### Performance de Tests

#### Medir tiempo de ejecución
```bash
npm test -- --verbose --detectOpenHandles
```

#### Ejecutar tests en paralelo
```bash
npm test -- --maxWorkers=50%
```

## Troubleshooting

### Problemas Comunes

#### Tests que fallan intermitentemente
```bash
# Ejecutar tests múltiples veces
npm test -- --runInBand --detectOpenHandles
```

#### Memory leaks
```bash
npm test -- --detectLeaks --detectOpenHandles
```

#### Timeout issues
```bash
npm test -- --testTimeout=30000
```

### Limpieza

#### Limpiar cache de Jest
```bash
npm test -- --clearCache
```

#### Limpiar node_modules
```bash
rm -rf node_modules package-lock.json
npm install
```

## Integración con IDEs

### VS Code

#### Configuración recomendada
```json
{
  "jest.jestCommandLine": "npm test --",
  "jest.autoRun": "watch",
  "jest.showCoverageOnLoad": true,
  "jest.coverageFormatter": "DefaultFormatter"
}
```

#### Snippets útiles
```json
{
  "Jest Test": {
    "prefix": "test",
    "body": [
      "test('$1', () => {",
      "  // Arrange",
      "  $2",
      "  ",
      "  // Act",
      "  $3",
      "  ",
      "  // Assert",
      "  expect($4).toBe($5)",
      "})"
    ]
  }
}
```

### WebStorm

#### Configuración de Jest
1. File → Settings → Languages & Frameworks → JavaScript → Jest
2. Jest package: `node_modules/jest`
3. Jest options: `--config=jest.config.js`

## Mejores Prácticas

### Organización de Tests

#### Estructura recomendada
```
src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx
├── models/
│   ├── User.ts
│   └── User.test.ts
└── tests/
    ├── fixtures/
    ├── mocks/
    └── setup.ts
```

#### Naming conventions
- Archivos de test: `ComponentName.test.ts`
- Describe blocks: Nombre del componente/método
- Test cases: Descripción clara de la funcionalidad

### Performance

#### Tests rápidos
- Usar mocks para dependencias externas
- Evitar operaciones I/O en tests unitarios
- Usar `beforeEach` para setup común

#### Tests paralelos
- Mantener tests independientes
- No compartir estado entre tests
- Usar `afterEach` para cleanup


