export function reactLints(fileTypes) {
  return [
    {
      name: 'project-eslint/react',
      files: fileTypes.react,
      rules: {
        '@stylistic/multiline-ternary': 'off',
      },
    },
  ];
}
