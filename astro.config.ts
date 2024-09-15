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
        baseUrl: "https://git.zarantonello.dev/davide/uni/-/edit/main",
      },
      favicon: "/favicon.svg",
      lastUpdated: true,
      pagination: false,
      social: {
        gitlab: "https://git.zarantonello.dev/davide",
      },
      title: "ICE Notes",
      sidebar: [
        {
          label: "Courses",
          autogenerate: { directory: "courses" },
        },
        {
          label: "Lessons",
          autogenerate: { directory: "lessons", collapsed: true },
        },
      ],
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeMathjax],
    remarkPlugins: [remarkMath],
  },
});
