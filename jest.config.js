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
