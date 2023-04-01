module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'dist'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
  },
}
