# Complete Testing Guide - 20minCoach

## Table of Contents
1. [Introduction](#introduction)
2. [Configuration and Setup](#configuration-and-setup)
3. [Scripts and Commands](#scripts-and-commands)
4. [Implemented Tests](#implemented-tests)
5. [Testing Structure](#testing-structure)
6. [How to Write Tests](#how-to-write-tests)
7. [Patterns and Conventions](#patterns-and-conventions)
8. [Tools and Utilities](#tools-and-utilities)
9. [Debugging and Troubleshooting](#debugging-and-troubleshooting)
10. [Code Coverage](#code-coverage)
11. [Best Practices](#best-practices)
12. [CI/CD Integration](#cicd-integration)

---

## Introduction

This guide contains all the necessary information to implement, execute, and maintain the testing system in the 20minCoach project. The system is fully functional.

### Technologies Used
- **Main Framework**: Jest 29.7.0
- **Configuration**: React Native + TypeScript
- **Coverage**: Configured thresholds (80% lines, 90% functions)
- **Current Status**:  **4 test suites, 47 tests - ALL PASSING**

---

## Configuration and Setup

### Prerequisites
- Node.js 16+
- npm
- VS Code (recommended) with Jest extension

### Installation
```bash
# Install dependencies
npm install

# Verify everything works
npm test
```

### Jest Configuration

**File: `jest.config.js`**
```javascript
export const preset = "react-native";
export const setupFilesAfterEnv = ["<rootDir>/src/tests/setup.ts"];
export const testMatch = [
  "**/__tests__/**/*.(ts|tsx|js)",
  "**/*.(test|spec).(ts|tsx|js)",
];
export const collectCoverageFrom = [
  "src/**/*.{ts,tsx}",
  "!src/**/*.d.ts",
  "!src/tests/**",
  "!src/**/*.test.{ts,tsx}",
  "!src/**/*.spec.{ts,tsx}",
  "!src/**/index.ts",
];
export const coverageThreshold = {
  global: {
    branches: 75,
    functions: 90,
    lines: 80,
    statements: 80,
  },
};
export const transformIgnorePatterns = [
  "node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated|react-native-gesture-handler)/)",
];
export const testEnvironment = "node";
export const verbose = true;
export const collectCoverage = false;
export const coverageDirectory = "coverage";
export const coverageReporters = ["text", "lcov", "html", "json"];
export const testTimeout = 10000;
export const clearMocks = true;
export const resetMocks = true;
export const restoreMocks = true;
```

**File: `src/tests/setup.ts`**
```typescript
import { jest } from "@jest/globals";

// Basic mock for React Native - no external dependencies
jest.mock("react-native", () => {
  const RN = jest.requireActual("react-native");
  return {
    ...RN,
    Platform: {
      OS: "ios",
      select: jest.fn(),
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
    },
  };
});
```

---

## Scripts and Commands

### Main Commands
```bash
# Run all tests
npm test

# Run tests in watch mode (automatically run when files change)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD (no watch, with coverage)
npm run test:ci

# Specific tests by category
npm run test:unit
npm run test:integration
npm run test:models
npm run test:controllers

# With npx (alternative)
npx jest
npx jest --watch
npx jest --coverage
```

### Scripts in package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:models": "jest --testPathPattern=models",
    "test:controllers": "jest --testPathPattern=controllers"
  }
}
```

---

## Implemented Tests

### 📊 Current Status: ✅ ALL PASSING

| Test Suite | Tests | Status | Description |
|------------|-------|--------|-------------|
| **UserModel** | 4 tests | ✅ PASS | Validations, roles, premium access |
| **CoachModel** | 17 tests | ✅ PASS | Constructor, search, specialization, tags |
| **SearchController** | 22 tests | ✅ PASS | Search, filters, text validations |
| **AuthController** | 5 tests | ✅ PASS | Login, validations, roles |
| **TOTAL** | **47 tests** | **✅ ALL PASS** | **0 tests failing** |

### Execution Result
```
Test Suites: 4 passed, 4 total
Tests:       47 passed, 47 total
Snapshots:   0 total
Time:        7.528 s
```

---

## Testing Structure

```
src/tests/
├── setup.ts                 # Global Jest configuration
├── fixtures/
│   └── testData.ts         # Reusable test data
├── mocks/
│   └── apiMocks.ts         # External API mocks
├── utils/
│   └── testHelpers.ts      # Test utilities
├── authController.test.ts   # Auth controller tests
├── coach.test.ts           # Coach model tests
├── searchController.test.ts # Search controller tests
├── user.test.ts            # User model tests
└── tsconfig.json           # TypeScript configuration for tests
```

---

## How to Write Tests

### Basic Test Structure
```typescript
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('MyClass', () => {
  let instance: MyClass;

  beforeEach(() => {
    instance = new MyClass();
  });

  describe('Specific method', () => {
    test('should return expected result when given valid input', () => {
      // Arrange
      const input = 'test input';
      const expected = 'expected output';

      // Act
      const result = instance.myMethod(input);

      // Assert
      expect(result).toBe(expected);
    });
  });
});
```

### Example: Model Test
```typescript
// src/tests/coach.test.ts
import { CoachModel } from "../models/Coach";

describe("CoachModel", () => {
  let coach: CoachModel;
  let coachData: any;

  beforeEach(() => {
    coachData = {
      id: "coach-1",
      name: "Dr. María García",
      title: "Psychologist",
      specialization: ["psychology", "therapy"],
      bio: "Experienced psychologist",
      rating: 4.8,
      reviewCount: 120,
      profilePicture: "https://example.com/maria.jpg",
      isAvailable: true,
      experience: "10 years",
      hourlyRate: 50,
      tags: ["psychology", "therapy", "cbt"],
    };
    coach = new CoachModel(coachData);
  });

  test("should create coach with all required properties", () => {
    expect(coach.id).toBe("coach-1");
    expect(coach.name).toBe("Dr. María García");
    expect(coach.title).toBe("Psychologist");
    expect(coach.rating).toBe(4.8);
    expect(coach.isAvailable).toBe(true);
  });

  test("should return true when coach has the specified tag", () => {
    expect(coach.hasTag("psychology")).toBe(true);
    expect(coach.hasTag("therapy")).toBe(true);
  });
});
```

### Example: Controller Test
```typescript
// src/tests/searchController.test.ts
import { SearchController } from "../controllers/searchController";

describe("SearchController", () => {
  describe("validateProblemDescription", () => {
    test("should return valid for description with 40+ words", () => {
      const longDescription = "I am experiencing significant anxiety..."; // 40+ words

      const result = SearchController.validateProblemDescription(longDescription);

      expect(result.isValid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    test("should return invalid for description with less than 40 words", () => {
      const shortDescription = "I need help with anxiety.";

      const result = SearchController.validateProblemDescription(shortDescription);

      expect(result.isValid).toBe(false);
      expect(result.message).toContain("Please provide at least 40 words");
    });
  });
});
```

---

## Patterns and Conventions

### Naming
- **Test files**: `*.test.ts` or `*.spec.ts`
- **Describe blocks**: Use descriptive names for class/function
- **Test cases**: Use format `should [expected behavior] when [condition]`

### AAA Structure (Arrange-Act-Assert)
```typescript
test('should validate email correctly', () => {
  // Arrange
  const validEmail = 'test@example.com';
  const invalidEmail = 'invalid-email';

  // Act
  const validResult = validateEmail(validEmail);
  const invalidResult = validateEmail(invalidEmail);

  // Assert
  expect(validResult).toBe(true);
  expect(invalidResult).toBe(false);
});
```

### Mocks and Stubs
```typescript
// Function mocks
jest.mock('../utils/api', () => ({
  fetchData: jest.fn(() => Promise.resolve({ data: 'mock data' }))
}));

// Class mocks
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: jest.fn()
  }
}));
```

---

## Tools and Utilities

### Test Data Factory
```typescript
// src/tests/fixtures/testData.ts
export const createMockUser = (overrides = {}) => ({
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'BasicUser' as const,
  sessionsRemaining: 5,
  packageType: 'Basic Package',
  ...overrides
});

export const createMockCoach = (overrides = {}) => ({
  id: 'coach-1',
  name: 'Test Coach',
  title: 'Test Title',
  specialization: ['test-specialization'],
  bio: 'Test bio',
  rating: 4.5,
  reviewCount: 100,
  profilePicture: 'test-image.jpg',
  isAvailable: true,
  experience: '5 years',
  hourlyRate: 40,
  tags: ['test-tag'],
  ...overrides
});
```

### Test Helpers
```typescript
// src/tests/utils/testHelpers.ts
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0));

export const createMockNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn()
});

export const expectToThrow = async (fn: () => Promise<any>, expectedError: string) => {
  await expect(fn).rejects.toThrow(expectedError);
};
```

---

## Debugging and Troubleshooting

### Common Problems and Solutions

#### 1. Error: "Cannot find module"
```bash
# Problem: Modules not found
# Solution: Verify Jest configuration
npm install
npx jest --clearCache
```

#### 2. Error: "Multiple configurations found"
```bash
# Problem: Duplicate Jest configuration
# Solution: Remove configuration from package.json, use only jest.config.js
```

#### 3. Error: "ReferenceError: require is not defined"
```bash
# Problem: Using CommonJS in ES modules project
# Solution: Use import/export instead of require/module.exports
```

#### 4. Slow tests
```bash
# Problem: Tests taking too long
# Solution: Use mocks for async operations
jest.setTimeout(10000); // For specific tests that need more time
```

### Debug Commands
```bash
# Run a specific test
npx jest src/tests/user.test.ts

# Run tests with verbose output
npx jest --verbose

# Run tests in debug mode
npx jest --detectOpenHandles

# Clear Jest cache
npx jest --clearCache
```

---

## Code Coverage

### Coverage Configuration
```javascript
// jest.config.js
export const coverageThreshold = {
  global: {
    branches: 75,      // 75% of branches covered
    functions: 90,     // 90% of functions covered
    lines: 80,         // 80% of lines covered
    statements: 80,    // 80% of statements covered
  },
};
```

### Generate Coverage Report
```bash
# Generate complete report
npm run test:coverage

# View report in browser
open coverage/lcov-report/index.html
```

### Understanding Coverage
- **Statements**: Percentage of executed statements
- **Branches**: Percentage of executed control branches
- **Functions**: Percentage of called functions
- **Lines**: Percentage of executed lines

---

## Best Practices

### ✅ DO
- Write tests before or alongside code
- Use descriptive names for tests
- Keep tests simple and focused
- Use AAA pattern (Arrange-Act-Assert)
- Mock external dependencies
- Verify both success and error cases
- Keep tests independent from each other

### ❌ DON'T
- Write tests after all code is done
- Make tests too complex
- Depend on test execution order
- Make tests depend on external state
- Ignore failing tests
- Write tests that don't add value

### Good Test Example
```typescript
describe('UserModel', () => {
  test('should identify premium user correctly', () => {
    // Arrange
    const premiumUser = new UserModel({
      ...baseUserData,
      role: 'PremiumUser'
    });

    // Act
    const isPremium = premiumUser.isPremium();

    // Assert
    expect(isPremium).toBe(true);
  });

  test('should check if user can book session when sessions remaining', () => {
    // Arrange
    const userWithSessions = new UserModel({
      ...baseUserData,
      sessionsRemaining: 3
    });

    // Act
    const canBook = userWithSessions.canBookSession();

    // Assert
    expect(canBook).toBe(true);
  });
});
```

---

## CI/CD Integration

### GitHub Actions
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:ci
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
```

### CI Scripts
```json
{
  "scripts": {
    "test:ci": "jest --ci --coverage --watchAll=false --passWithNoTests",
    "test:ci:verbose": "jest --ci --coverage --verbose --watchAll=false"
  }
}
```

---

## Quick Reference Commands

### Run Tests
```bash
npm test                    # All tests
npm run test:watch         # Watch mode
npm run test:coverage      # With coverage
npm run test:ci            # For CI/CD
```

### Specific Tests
```bash
npx jest user.test.ts                    # Specific test
npx jest --testNamePattern="auth"        # By name
npx jest src/tests/                      # By directory
```

### Debugging
```bash
npx jest --verbose                       # Detailed output
npx jest --detectOpenHandles            # Detect open handles
npx jest --clearCache                   # Clear cache
```

---

## Project Status

### Completed
- [x] Jest configuration
- [x] Test setup
- [x] Tests for UserModel (4 tests)
- [x] Tests for CoachModel (17 tests)
- [x] Tests for SearchController (22 tests)
- [x] Tests for AuthController (5 tests)
- [x] Mocks and fixtures
- [x] Coverage configuration
- [x] CI/CD scripts

###  Final Result
```
✅ Test Suites: 4 passed, 4 total
✅ Tests:       47 passed, 47 total
✅ Snapshots:   0 total
✅ Time:        7.528 s
✅ Status:      ALL TESTS PASSING
```
