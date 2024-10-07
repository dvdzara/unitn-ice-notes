import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";

export default defineConfig({
  site: "https://ice-notes.zarantonello.dev",
  markdown: {
    rehypePlugins: [
      [rehypeKatex, { output: "mathml", strict: true }],
      [rehypeMermaid, { dark: true, strategy: "img-png" }],
    ],
    remarkPlugins: [remarkMath],
  },
  integrations: [
    starlight({
      credits: true,
      customCss: ["./src/styles/globals.css"],
      favicon: "/favicon.svg",
      lastUpdated: true,
      title: "ICE Notes",
    }),
  ],
});
