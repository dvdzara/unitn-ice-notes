import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import remarkMath from "remark-math";
import rehypeTemml from "./src/lib/rehype-temml.ts";

export default defineConfig({
  site: "https://ice-notes.zarantonello.dev",
  markdown: {
    rehypePlugins: [rehypeTemml],
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
