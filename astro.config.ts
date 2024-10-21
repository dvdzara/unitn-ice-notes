import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import remarkMath from "remark-math";
import rehypeTemml from "./src/lib/rehype-temml";
import rehypeMermaid from "rehype-mermaid";

export default defineConfig({
  site: "https://ice-notes.zarantonello.dev",
  markdown: {
    rehypePlugins: [
      rehypeTemml,
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
      social: {
        github: "https://github.com/dvdzara/unitn-ice-notes",
      },
    }),
  ],
  devToolbar: { enabled: false },
});
