module.exports = {
  root: true,
  env: {
    browser: true,
  },
  // plugins: [
  //   'promise',
  //   'react'
  // ],
  extends: [
    "standard",
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
      },
    },
  ],
};
