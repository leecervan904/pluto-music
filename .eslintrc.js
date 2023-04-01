module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['node_modules', 'dist'],
  rules: {
    'vue/no-multiple-template-root': 0,
    'import/no-extraneous-dependencies': 0,
    'no-bitwise': 0,
    'import/prefer-default-export': 0,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
}
