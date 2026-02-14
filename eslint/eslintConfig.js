import { baseLints } from './base.js';
import { getFileTypes } from './helpers.js';
import { importsLints } from './imports.js';
import { jsonLints } from './json.js';
import { reactLints } from './react.js';
import { typescriptLints } from './typescript.js';

export function recommended(config) {
  const fileTypes = getFileTypes();

  return [
    ...baseLints(config, fileTypes),
    ...typescriptLints(config, fileTypes),
    ...(config?.react ? reactLints(fileTypes) : []),
    ...importsLints(config, fileTypes),
    ...jsonLints(),
    {
      ignores: [
        'dist/**',
        'dist-playground/**',
        '.idea/**',
        '.cache/**',
        '.turbo/**',
        ...(config?.ignores ?? []),
      ],
    },
  ];
}
