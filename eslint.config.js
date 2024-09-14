// @ts-check

import eslintPluginAstro from "eslint-plugin-astro";
import eslintJS from "@eslint/js";
import eslintTS from "typescript-eslint";

export default eslintTS.config(
  eslintJS.configs.recommended,
  eslintTS.configs.eslintRecommended,
  ...eslintTS.configs.strict,
  ...eslintTS.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-strict"],

  {
    ignores: [".astro/"],
  },
);
