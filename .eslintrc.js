module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  env: {
    es6: true,
  },
  extends: [
    'eslint:recommended', 
    'plugin:import/errors', 
    'plugin:import/warnings',
    'airbnb-base'
  ],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'comma-dangle': [2, 'always-multiline'],
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'global-require': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'no-alert': 0,
    'no-console': 0,
    'no-undef': 1,
    'no-confusing-arrow': 0,
    'id-length': 0,
    'consistent-return': 0,
    'class-methods-use-this': 0,
    'no-unused-expressions': 0,
    'max-len': [
      2,
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
      },
    ],
    'new-cap': [2],
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-underscore-dangle': [
      2,
      {
        allow: ['__CLIENT__', '__SERVER__'],
      },
    ],
    'arrow-parens': 0,
    'no-plusplus': 0,
    'no-new': 0,
  },
  globals: {
    describe: true,
    beforeEach: true,
    it: true,
    process: true,
    console: true,
    logger: true,
    env: true,
    before: true,
    after: true,
    global: true
  },
}
