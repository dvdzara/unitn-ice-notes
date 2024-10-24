import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import remarkMath from "remark-math";
import rehypeKatex from "./src/lib/rehype-katex";

export default defineConfig({
  site: "https://ice-notes.zarantonello.dev",
  markdown: {
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkMath],
  },
  integrations: [
    starlight({
      credits: true,
      customCss: ["./src/styles/globals.css"],
      favicon: "/favicon.svg",
      lastUpdated: true,
      title: "ICE Notes",
      social: {
        github: "https://github.com/dvdzara/unitn-ice-notes",
      },
      head: [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
            crossorigin: "anonymous",
          },
        },
      ],
      sidebar: [
        "Analisi 1",
        "Geometria e algebra lineare",
        "Programmazione 1",
      ].map((c) => {
        return {
          label: c,
          autogenerate: {
            directory: c,
            collapsed: true,
          },
        };
      }),
    }),
  ],
  devToolbar: { enabled: false },
});
