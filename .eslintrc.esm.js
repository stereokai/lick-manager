import { aliasesForEslint as alias } from "./pathbroker.mjs";

export default {
  settings: {
    "import/resolver": {
      alias,
    },
  },
  root: true,
  env: {
    browser: true,
  },
  plugins: ["import"],
  extends: [
    "standard",
    "plugin:import/recommended",
    "plugin:react/recommended",
    "standard-jsx",
    "standard-react",
    "plugin:react/jsx-runtime",
    "plugin:promise/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  overrides: [
    {
      files: ["**/*.jsx"],
      rules: {
        "react/prop-types": "off",
        "no-return-assign": "off",
        "no-unused-vars": "warn",
        "no-var": "off",
      },
    },
  ],
};
