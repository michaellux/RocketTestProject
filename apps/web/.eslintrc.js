module.exports = {
  extends: ["@antfu"],
  rules: {
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "@typescript-eslint/semi": "off",
    "eslint-comments/no-unlimited-disable": "off",
  },
};
