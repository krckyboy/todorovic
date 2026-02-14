import fs from 'node:fs';
import path from 'node:path';
import { defaultConditionNames } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import';
import nodeImportPlugin from 'eslint-plugin-node-import';
import { withFileTypes } from './helpers.js';

export function importsLints(config, fileTypes) {
  const restrictedZones = config?.restrictedZones
    ? getRestrictedZones()
    : undefined;

  return [
    ...withFileTypes(importPlugin.flatConfigs.errors, fileTypes.all),
    ...withFileTypes(importPlugin.flatConfigs.typescript, fileTypes.all),
    {
      name: 'project-eslint/imports',
      files: fileTypes.all,
      plugins: {
        'node-import': nodeImportPlugin,
      },
      rules: {
        'import/newline-after-import': ['error'],
        'import/no-duplicates': 1,
        'import/default': 'off',
        'import/namespace': 'off',
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/no-unresolved': [
          'error',
          { ignore: ['^virtual:', '^astro:', '^/pagefind/'] },
        ],
        'import/extensions': config?.extensions
          ? [
              'error',
              'always',
              { ignorePackages: true, checkTypeImports: true },
            ]
          : ['error', 'never', { js: 'ignorePackages', json: 'always' }],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'unknown',
            ],
            pathGroups: [],
            'newlines-between': 'never',
            pathGroupsExcludedImportTypes: [],
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'node-import/prefer-node-protocol': 'error',
        ...restrictedZones,
      },
      settings: {
        'import/resolver': {
          typescript: {
            conditionNames: [
              ...(config?.conditionNames ?? []),
              ...defaultConditionNames,
            ],
          },
          node: true,
        },
      },
    },
  ];
}

export function getRestrictedZones() {
  const modulesPath = path.resolve('src', 'modules');
  if (!fs.existsSync(modulesPath)) {
    return {};
  }

  const modules = fs.readdirSync(modulesPath);

  return {
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          { target: './src/components', from: './src/{layouts,modules}/**/*' },
          ...modules.map((module) => ({
            target: `./src/modules/${module}`,
            from: `./src/modules/!(${module})/components/**/*`,
          })),
        ],
      },
    ],
  };
}
