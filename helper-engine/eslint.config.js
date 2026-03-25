export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // Node.js ke liye
      globals: {
        console: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
      },
    },

    rules: {
      "no-undef": "error", // define nahi kiya variable use kiya → error
      "no-unused-vars": "warn", // define kiya variable use nahi kiya → warning
    },
  },
];
