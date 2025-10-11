module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:svelte/recommended", "plugin:astro/recommended", "prettier"],
  plugins: ["svelte"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3"
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  ignorePatterns: ["dist", "node_modules"]
};
