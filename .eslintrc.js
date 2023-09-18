module.exports = {
  extends: ['next', 'eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],

  rules: {
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'block', next: '*' },
    ],
  },
};
