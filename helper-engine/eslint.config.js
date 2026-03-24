//import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",

      globals: {
        require: "readonly",
        module: "readonly",
        console: "readonly",
      },
    },

    plugins: {
      //"unused-imports": unusedImports,
      import: importPlugin,
    },

    rules: {
      "no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
];
