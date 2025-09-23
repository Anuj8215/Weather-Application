module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  env: {
    'react-native/react-native': true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-native/no-color-literals': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};