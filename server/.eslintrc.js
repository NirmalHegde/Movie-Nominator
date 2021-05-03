module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    "no-tabs": 0,
    indent: ["error", 2],
    "linebreak-style": 0,
    semi: [2, "never"],
    quotes: [2, "single"],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
