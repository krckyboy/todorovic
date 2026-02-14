import jsoncPlugin from 'eslint-plugin-jsonc';
import jsoncEslintParser from 'jsonc-eslint-parser';

export function jsonLints() {
  return [
    {
      plugins: {
        jsonc: jsoncPlugin,
      },
      files: ['**/package.json'],
      languageOptions: {
        parser: jsoncEslintParser,
      },
      rules: {
        'jsonc/sort-keys': [
          'error',
          {
            pathPattern: '^$',
            order: [
              'name',
              'version',
              'description',
              'type',
              'keywords',
              'homepage',
              'bugs',
              'license',
              'author',
              'contributors',
              'funding',
              'files',
              'main',
              'module',
              'browser',
              'man',
              'bin',
              'directories',
              'repository',
              '$schema',
              'scripts',
              'config',
              'dependencies',
              'devDependencies',
              'peerDependencies',
              'bundledDependencies',
              'optionalDependencies',
              'engines',
              'engineStrict',
              'os',
              'cpu',
              'preferGlobal',
              'private',
              'publishConfig',
              'targets',
              '*',
            ],
          },
          {
            pathPattern: '^(?!(publishConfig\\.)?exports($|.+)).*$',
            order: { type: 'asc' },
          },
        ],
      },
    },
  ];
}
