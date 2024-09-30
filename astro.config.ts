import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { dependencies } from "./package.json";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const macros = {
  // such that
  "\\|": "\\ \\vert\\ ",

  "\\{": "\\left\\lbrace\\ ",
  "\\}": "\\ \\right\\rbrace",
  "\\[": "\\left[",
  "\\]": "\\right]",
  "\\(": "\\left(",
  "\\)": "\\right)",

  "\\C": ",\\ ",

  // vector name
  "\\VN": "\\underline",
  // vector
  "\\V": "\\overrightarrow",

  // Integer part of a number
  "\\INT": "\\llcorner {#1} \\lrcorner",

  // logical and
  "\\AND": "\\ and \\ ",
  // logical or
  "\\OR": "\\ or \\ ",
  // logical not
  "\\NOT": "\\lnot",

  // customized symbols
  "\\EX": "\\exists\\ ",
  "\\EXN": "\\not\\exists\\ ",
  "\\EXS": "\\exists!\\ ",

  // arrows
  "\\ARR": "\\Rightarrow",
  "\\AR": "\\rightarrow",
  "\\ALRR": "\\Leftrightarrow",
};

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
          macros,
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
