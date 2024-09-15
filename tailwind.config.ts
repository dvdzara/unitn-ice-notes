import type { Config } from "tailwindcss";
import tailwindPluginTypography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{astro,html,md,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindPluginTypography],
};

export default config;
