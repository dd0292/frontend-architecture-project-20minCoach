// eslint.config.js
import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettierPlugin from "eslint-plugin-prettier";

/**
 * ESLint configuration for a React Native Expo project using TypeScript.
 * This config includes:
 * - JavaScript standard rules
 * - TypeScript support
 * - React and React Hooks linting
 * - Prettier integration for code formatting
 * - Custom rules for cleaner code
 */

/** @type {import("eslint").Linter.Config[]} */
export default [
  // Base JavaScript rules from ESLint
  js.configs.recommended,

  // Define global variables like console, window, etc.
  {
    languageOptions: {
      globals: {
        console: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        process: "readonly", // For backend-like logic or build tools
      },
    },
  },

  // TypeScript support
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enables JSX in TS files
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      // Includes recommended TypeScript rules
      ...typescriptPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // React and React Hooks support
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect", // Automatically detects React version
      },
    },
  },

  // Prettier integration for formatting
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Show Prettier formatting issues as ESLint errors
    },
  },

  // Custom code quality rules
  {
    rules: {
      "no-console": "warn", // Always warn on console logs
      "prefer-const": "error", // Prefer const over let
      "no-var": "error", // Disallow var entirely
    },
  },

  // Ignore common non-source folders and test files
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
      "*.min.js",
      "src/tests/",
    ],
  },
];
