# Linter Rules for Middleware

## Rule: Mandatory Error Handling

This rule ensures that all `catch` blocks use the error handling middleware.

### ESLint Configuration

```javascript
// eslint.config.js
{
  rules: {
    // Custom rule for error middleware
    "middleware/require-error-handling": "error",
    "middleware/no-raw-errors": "error",
    "middleware/require-logging": "warn"
  }
}
```

### Specific Rules

#### 1. `middleware/require-error-handling`
**Description**: All `catch` blocks MUST use `ErrorAdapter.toAppError()`

** Incorrect**:
```typescript
try {
  await someOperation();
} catch (error) {
  console.error(error); // Error: ErrorAdapter not used
  throw error; // Error: raw error thrown
}
```

** Correct**:
```typescript
try {
  await someOperation();
} catch (error) {
  const appError = ErrorAdapter.toAppError(error, context);
  logger.error('Operation failed', { error: appError.getTechnicalInfo() });
  throw appError;
}
```

#### 2. `middleware/no-raw-errors`
**Description**: Throwing "raw" errors from libraries is not allowed

** Incorrect**:
```typescript
try {
  await fetch('/api/data');
} catch (error) {
  throw error; // Error: raw error thrown
}
```

** Correct**:
```typescript
try {
  await fetch('/api/data');
} catch (error) {
  throw ErrorAdapter.toAppError(error, context);
}
```

#### 3. `middleware/require-logging`
**Description**: All errors must be logged

** Incorrect**:
```typescript
try {
  await someOperation();
} catch (error) {
  const appError = ErrorAdapter.toAppError(error, context);
  throw appError; // Warning: error not logged
}
```

** Correct**:
```typescript
try {
  await someOperation();
} catch (error) {
  const appError = ErrorAdapter.toAppError(error, context);
  logger.error('Operation failed', { error: appError.getTechnicalInfo() });
  throw appError;
}
```

### ESLint Plugin Implementation

```javascript
// eslint-plugin-middleware.js
module.exports = {
  rules: {
    'require-error-handling': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require error handling middleware in catch blocks',
          category: 'Best Practices',
          recommended: true
        }
      },
      create(context) {
        return {
          CatchClause(node) {
            const body = node.body.body;
            let hasErrorAdapter = false;
            let hasRawThrow = false;

            body.forEach(statement => {
              if (statement.type === 'ExpressionStatement' &&
                  statement.expression.type === 'CallExpression' &&
                  statement.expression.callee.object &&
                  statement.expression.callee.object.name === 'ErrorAdapter') {
                hasErrorAdapter = true;
              }
              
              if (statement.type === 'ThrowStatement' &&
                  statement.argument.name &&
                  statement.argument.name !== 'appError') {
                hasRawThrow = true;
              }
            });

            if (!hasErrorAdapter) {
              context.report({
                node,
                message: 'Catch blocks must use ErrorAdapter.toAppError()'
              });
            }

            if (hasRawThrow) {
              context.report({
                node,
                message: 'Cannot throw raw errors, must use AppError'
              });
            }
          }
        };
      }
    }
  }
};
```

### Configuration in package.json

```json
{
  "scripts": {
    "lint:middleware": "eslint src/middleware --ext .ts,.tsx",
    "lint:check-rules": "eslint src --ext .ts,.tsx --rule 'middleware/require-error-handling: error'"
  }
}
```

### CI/CD Integration

```yaml
# .github/workflows/lint.yml
name: Lint Middleware Rules
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Run middleware linting
        run: npm run lint:check-rules
```

### Additional Recommended Rules

#### 4. `middleware/require-context`
**Description**: All calls to `ErrorAdapter.toAppError()` must include context

```typescript
//  Incorrect
ErrorAdapter.toAppError(error);

//  Correct
ErrorAdapter.toAppError(error, { component: 'MyComponent', action: 'myAction' });
```

#### 5. `middleware/no-console-error`
**Description**: Do not use `console.error()` directly, use the logging system

```typescript
//  Incorrect
console.error('Error occurred:', error);

//  Correct
logger.error('Error occurred', { error: error.message }, 'MyComponent');
```

### Monitoring and Metrics

The middleware system should include metrics to monitor compliance:

```typescript
// middleware/metrics.ts
export class MiddlewareMetrics {
  static trackErrorHandling(component: string, success: boolean) {
    // Log compliance metric
    logger.info('Error handling compliance', { 
      component, 
      success,
      timestamp: new Date() 
    });
  }
  
  static trackRawErrorUsage(component: string) {
    // Log rule violation
    logger.warn('Raw error usage detected', { 
      component,
      timestamp: new Date() 
    });
  }
}
```

### Documentation for Developers

Include these rules in the project documentation and in the onboarding of new developers to ensure consistent compliance with the error handling pattern.
