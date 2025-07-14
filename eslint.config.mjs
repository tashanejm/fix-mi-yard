import js from '@eslint/js';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import {defineConfig, globalIgnores} from 'eslint/config';
import angular from 'angular-eslint';
import stylistic from '@stylistic/eslint-plugin';

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
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
      '@angular-eslint': angular.tsPlugin,
      '@stylistic': stylistic
    },
    processor: angular.processInlineTemplates,
    extends: [
      js.configs.recommended,
      tsEslint.configs.strictTypeChecked,
      tsEslint.configs.stylisticTypeChecked,
      stylistic.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        // project: ['./tsconfig.json']
      },
      globals: globals.browser
    },
    rules: {
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
      "@stylistic/semi": ["error", "always"],
      '@stylistic/comma-dangle': [ 'error', 'never' ],
      '@typescript-eslint/no-extraneous-class': ['error',
        {
          allowEmpty: true
        }
      ],
      '@typescript-eslint/no-unsafe-assignment': 'off'
    }
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateAll,
      ...angular.configs.templateAccessibility
    ],
    rules: {
      '@angular-eslint/template/no-call-expression': [
        'error',
        {
          allowSuffix: '$'
        }
      ],
      '@angular-eslint/template/i18n': [
        'error',
        {
          checkAttributes: false
        }
      ]
    }
  }
]);
