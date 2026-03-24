import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";

export default [
  js.configs.recommended, // 👈 direct use (NO extends)

  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 🔴 Syntax issues pakadne ke liye
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",

      // 🟢 React rules
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      // 🟢 Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // 🟢 Clean code
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
      "no-undef": "error",
      "no-duplicate-imports": "error",
    },
  },
  //  {
  //   ignores: ["dist"],
  // },
  // {
  //   files: ["**/*.{js,jsx}"],
  //   plugins: {
  //     import: importPlugin,
  //   },
  //   extends: [
  //     js.configs.recommended,
  //     reactHooks.configs.flat.recommended,
  //     reactRefresh.configs.vite,
  //   ],
  //   languageOptions: {
  //     ecmaVersion: 2020,
  //     globals: globals.browser,
  //     parserOptions: {
  //       ecmaVersion: "latest",
  //       ecmaFeatures: { jsx: true },
  //       sourceType: "module",
  //     },
  //   },
  //   rules: {
  //     "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
  //     "no-undef": "error", // Bina import kiye kuch use kiya toh error
  //     "import/no-unresolved": "error", // Galat path se import kiya toh error
  //     "no-duplicate-imports": "error", // Ek hi file se do baar import kiya toh error
  //   },
  // },
];
