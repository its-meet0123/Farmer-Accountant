import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    // rules: {
    //   "no-unused-vars": "error", // Variable banaya par use nahi kiya toh error
    //   "no-undef": "error", // Bina import kiye kuch use kiya toh error
    //   "import/no-unresolved": "error", // Galat path se import kiya toh error
    //   "no-duplicate-imports": "error", // Ek hi file se do baar import kiya toh error
    // },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "no-undef": "error", // Bina import kiye kuch use kiya toh error
      "import/no-unresolved": "error", // Galat path se import kiya toh error
      "no-duplicate-imports": "error", // Ek hi file se do baar import kiya toh error
    },
  },
]);
