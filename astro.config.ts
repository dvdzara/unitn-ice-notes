import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeMathjax from "rehype-mathjax";

export default defineConfig({
  integrations: [
    starlight({
      credits: true,
      customCss: ["./src/styles/globals.css"],
      editLink: {
        baseUrl: "https://git.zarantonello.dev/davide/ice-notes/-/edit/main",
      },
      favicon: "/favicon.svg",
      lastUpdated: true,
      title: "ICE Notes",
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeMathjax],
    remarkPlugins: [remarkMath],
  },
});
