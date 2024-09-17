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
      social: {
        gitlab: "https://git.zarantonello.dev/davide",
      },
      title: "ICE Notes",
      sidebar: [
        {
          label: "ICE Notes",
          slug: "index",
        },
        {
          label: "Courses",
          autogenerate: { directory: "courses" },
        },
        {
          label: "Lessons",
          autogenerate: { directory: "lessons", collapsed: true },
        },
        {
          label: "Typesetting guidelines",
          slug: "typesetting-guidelines",
        },
      ],
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeMathjax],
    remarkPlugins: [remarkMath],
  },
});
