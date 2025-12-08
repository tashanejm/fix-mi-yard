import js from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import angularTemplateParser from '@angular-eslint/template-parser';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import angularEslint from '@angular-eslint/eslint-plugin';
import { Plugin } from '@eslint/core';

// Helper types
import type { Linter } from 'eslint';

type Rules = Linter.RulesRecord;

function extractRulesFromConfigArray(configArray: Record<string, unknown>[]): Rules {
  return configArray.reduce((acc, config) => Object.assign(acc, config?.['rules']), {}) as Rules;
}

export default defineConfig([
  globalIgnores([
    '**/dist/**',
    '**/e.spec.ts',
    'eslint.config.mjs',
    '**/node_modules/**',
    '.angular/*',
    '**/coverage/**',
    '**/build/**',
    '**/out/**',
    '**/lib/**',
    '**/.cache/**',
    '**/.next/**',
    '**/.nuxt/**',
    '**/.storybook/**'
  ]),
  {
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser
    }
  },
  // Javascript
  {
    files: ['**/*.js'],
    plugins: { js },
    rules: {
      ...js.configs.recommended.rules
    }
  },
  // Typescript
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularEslint as any, //could be wrong check copilot version
      '@typescript-eslint': tsEslint.plugin,
      '@stylistic': stylistic
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.spec.json'
        ],
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      ...extractRulesFromConfigArray(tsEslint.configs.strictTypeChecked as Record<string, unknown>[]),
      ...extractRulesFromConfigArray(tsEslint.configs.stylisticTypeChecked as Record<string, unknown>[]),
      ...extractRulesFromConfigArray([angularEslint.configs.recommended]),
      ...stylistic.configs.recommended.rules,
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        }
      ],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@typescript-eslint/no-extraneous-class': ['error',
        {
          allowEmpty: true
        }
      ],
      '@typescript-eslint/no-unsafe-assignment': 'off'
    }
  },
  // Html
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin as Record<string, Plugin>
    },
    // processor: angular.processInlineTemplates,
    rules: {
      ...angularTemplatePlugin.configs.recommended.rules as Partial<Rules>,
      ...angularTemplatePlugin.configs.accessibility.rules as Partial<Rules>,
      ...angularTemplatePlugin.configs.all.rules as Partial<Rules>,
      '@angular-eslint/template/no-call-expression': [
        'error',
        {
          allowSuffix: '$'
        }
      ],
      '@angular-eslint/template/i18n': [
        'error',
        {
          checkAttributes: false,
          checkText: false
        }
      ]
    }
  }
]);
