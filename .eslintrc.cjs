// .eslintrc.cjs

/* eslint-env node */
module.exports = {
  // Specifies the root directory for ESLint configuration
  root: true,

  // Defines the environment our code will run in.
  // 'browser' adds global browser variables like `document`.
  // 'es2021' adds modern ECMAScript globals.
  env: {
    browser: true,
    es2021: true,
  },

  // Extends a predefined set of rules. 'standard' is a popular, solid choice.
  // 'prettier' must be the last item in this array to disable conflicting style rules.
  extends: ['standard', 'prettier'],

  // Specifies parser options.
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript standard
    sourceType: 'module', // We are using ES modules
  },

  // Custom rules or overrides can be added here.
  rules: {
    // Example: We can relax a rule if we disagree with it.
    // For now, we will stick to the defaults.
  },
};
