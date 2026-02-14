import js from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';
import { withFileTypes } from './helpers.js';

export function baseLints(_config, fileTypes) {
  return [
    ...withFileTypes(prettierPlugin, fileTypes.all),
    ...withFileTypes(js.configs.recommended, fileTypes.all),
    ...withFileTypes(stylisticPlugin.configs.recommended, fileTypes.all),
    {
      name: 'project-eslint/base',
      files: fileTypes.all,
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.browser,
        },
      },
      plugins: {
        'unused-imports': unusedImportsPlugin,
      },
      rules: {
        'no-extra-semi': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'unused-imports/no-unused-imports': 'error',
        '@stylistic/operator-linebreak': 'off',
        '@stylistic/brace-style': 'off',
        '@stylistic/no-trailing-spaces': 'off',
        '@stylistic/semi-spacing': 'off',
        '@stylistic/no-multiple-empty-lines': 'off',
        '@stylistic/member-delimiter-style': 'off',
        '@stylistic/arrow-parens': 'off',
        '@stylistic/indent-binary-ops': 'off',
        '@stylistic/yield-star-spacing': 'off',
        '@stylistic/semi': 'off',
        '@stylistic/quote-props': 'off',
        '@stylistic/comma-dangle': 'off',
        '@stylistic/indent': 'off',
        '@stylistic/array-bracket-spacing': 'off',
        '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
        'no-console': 'off',
        'no-debugger': 'error',
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        yoda: 'error',
        'no-unused-private-class-members': 'error',
        'no-constant-binary-expression': 'error',
        complexity: ['error'],
        'no-param-reassign': ['error'],
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'no-constant-condition': ['error', { checkLoops: false }],
        'no-shadow': 'error',
        'prefer-const': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-destructuring': [
          'error',
          {
            VariableDeclarator: {
              array: false,
              object: true,
            },
            AssignmentExpression: {
              array: false,
              object: false,
            },
          },
          {
            enforceForRenamedProperties: false,
          },
        ],
        'prefer-template': ['error'],
        'prefer-regex-literals': [
          'error',
          {
            disallowRedundantWrapping: true,
          },
        ],
      },
    },
  ];
}
