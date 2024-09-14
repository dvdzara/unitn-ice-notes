export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "./src/**/*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: ["./src/**/*.{astro,html,md,mdx}"],
      options: {
        proseWrap: "always",
      },
    },
  ],
};
