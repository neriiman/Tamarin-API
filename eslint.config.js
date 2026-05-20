import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  {
    files: ['**/*.ts'],

    languageOptions: {
      ecmaVersion: 'latest',

      globals: globals.node,

      parserOptions: {
        sourceType: 'module',
      },
    },

    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],

    rules: {
      'no-console': 'off',

      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]);
