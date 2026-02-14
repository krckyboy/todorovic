export function getFileTypes() {
  const js = ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'];
  const ts = ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'];
  const react = ['**/*.jsx', '**/*.tsx'];
  const stories = ['**/*.stories.ts', '**/*.stories.tsx'];

  return { js, ts, react, all: [...js, ...ts], stories };
}

export function withFileTypes(configs, files) {
  const array = Array.isArray(configs) ? configs : [configs];
  return array.map((config) => ({ files: config.files ?? files, ...config }));
}
