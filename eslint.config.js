import eslintPluginAstro from 'eslint-plugin-astro';
import typescriptEslint from 'typescript-eslint';
import { recommended } from './eslint/eslintConfig.js';

const projectRules = recommended({
  react: true,
  ignores: ['.astro/**', 'node_modules/**', 'eslint/**'],
});

export default [
  ...projectRules,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
  },
  {
    files: ['**/*.astro', '**/*.astro/*', '**/*.astro/**'],
    ...typescriptEslint.configs.disableTypeChecked,
  },
  ...eslintPluginAstro.configs['flat/recommended'],
];
