module.exports = {
  root: false,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prefer-const': 'off',
    'no-var': 'off',
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/type-annotation-spacing":"off",
    "@typescript-eslint/no-this-alias":"off",
    "@typescript-eslint/no-unused-vars":"off"
  }
}
