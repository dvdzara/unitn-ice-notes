// @ts-check

import eslintJS from "@eslint/js";
import eslintTS from "typescript-eslint";
import eslintAstro from "eslint-plugin-astro";
import eslintPrettier from "eslint-config-prettier";

export default eslintTS.config(
  eslintJS.configs.recommended,
  eslintPrettier,
  eslintTS.configs.eslintRecommended,
  ...eslintTS.configs.strict,
  ...eslintTS.configs.stylistic,
  ...eslintAstro.configs["jsx-a11y-strict"],
  ...eslintAstro.configs.recommended,

  { ignores: [".astro", "node_modules", "dist"] },
);
