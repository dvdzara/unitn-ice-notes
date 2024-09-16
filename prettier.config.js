export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "./src/**/*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: ["./src/**/*.{astro,md,mdx}"],
      options: {
        proseWrap: "always",
      },
    },
  ],
};
