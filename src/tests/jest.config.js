module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/tests/**",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
    "!src/**/index.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 80,
      statements: 80,
    },
    "./src/models/": {
      branches: 90,
      functions: 95,
      lines: 90,
      statements: 90,
    },
    "./src/controllers/": {
      branches: 80,
      functions: 90,
      lines: 85,
      statements: 85,
    },
  },
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated|react-native-gesture-handler)/)",
  ],
  testEnvironment: "node",
  verbose: true,
  collectCoverage: false,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html", "json"],
  testTimeout: 10000,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
