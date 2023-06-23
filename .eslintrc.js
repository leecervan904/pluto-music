module.exports = {
  extends: ['@antfu/eslint-config-vue'],
  overrides: [
    {
      files: ['*.json', '*.json5', '*.jsonc'],
      rules: {
        'quote-props': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/quotes': 'off',
      },
    },
  ],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
  },
}
