import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: ["remark-gfm", "remark-smartypants", "remark-math"],
    rehypePlugins: ["rehype-mathjax"],
  },
});
