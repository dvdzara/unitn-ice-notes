import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { dependencies } from "./package.json";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import katexMacros from "./src/latex-macros";

export default defineConfig({
  site: "https://ice-notes.zarantonello.dev",
  markdown: {
    rehypePlugins: [
      [
        rehypeKatex,
        {
          output: "mathml",
          throwOnError: false,
          strict: true,
          macros: katexMacros,
        },
      ],
    ],
    remarkPlugins: [remarkMath],
  },
  integrations: [
    starlight({
      credits: true,
      customCss: ["./src/styles/globals.css"],
      head: [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: `https://cdn.jsdelivr.net/npm/katex@${dependencies.katex}/dist/katex.min.css`,
            crossorigin: "anonymous",
          },
        },
      ],
      favicon: "/favicon.svg",
      lastUpdated: true,
      title: "ICE Notes",
    }),
  ],
});
