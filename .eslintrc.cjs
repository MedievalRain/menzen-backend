module.exports = {
  root: true,
  env: { es2020: true, node: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [],
  rules: {
    "no-cond-assign": ["error", "always"],
    "no-undef": "error",
    "no-unreachable": "error",
    "no-constant-condition": "error",
    eqeqeq: ["error", "always"],
    "no-var": "error",
    "no-constant-condition": "error",
    "no-duplicate-imports": "error",
    "prefer-const": "error",
    "dot-notation": "warn",
    yoda: "error",
    quotes: ["error", "double"],
    "no-template-curly-in-string": "error",
    camelcase: "error",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
