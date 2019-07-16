const error = "error";
const warning = "warning";
const off = "off";

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    browser: true,
    chrome: true,
    webextensions: true,
    node: true
  },
  rules: {
    "prefer-const": error,
    "no-console": error
  }
};
