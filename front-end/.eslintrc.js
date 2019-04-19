module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    semi: 0,
    'no-plusplus': [
      'error',
      {allowForLoopAfterthoughts: true}
    ],
    'comma-dangle': ["error", "never"],
    'no-console': 0
  },
};
