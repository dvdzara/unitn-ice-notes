import type { Root } from "hast";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { toString } from "hast-util-to-string";
import temml from "temml";
import { SKIP, visitParents } from "unist-util-visit-parents";

export default function rehypeKatex() {
  return (tree: Root) => {
    visitParents(tree, "element", function (element, parents) {
      const classes = Array.isArray(element.properties.className)
        ? element.properties.className
        : [];

      // This class is used by `remark-math` for flow math (block, `$$\nmath\n$$`).
      const mathDisplay = classes.includes("math-display");
      // This class is used by `remark-math` for text math (inline, `$math$`).
      const mathInline = classes.includes("math-inline");

      if (!mathDisplay && !mathInline) {
        return;
      }

      let parent = parents[parents.length - 1];

      // If this was generated with ` ```math `, replace the `<pre>` and use
      // display.
      if (
        element.tagName === "code" &&
        parent &&
        parent.type === "element" &&
        parent.tagName === "pre"
      ) {
        element = parent;
        parent = parents[parents.length - 2];
      }

      if (!parent) {
        return;
      }

      const containerTag = mathDisplay ? "div" : "span";
      const spanClasses = "math-container";

      const mathRenderedString =
        `<${containerTag} class="${spanClasses}">` +
        temml.renderToString(toString(element), {
          strict: true,
          displayMode: mathDisplay,
          // Makes the build fail when an invalid math block is found.
          throwOnError: true,
          macros: {
            "\\st": "\\ : \\ ",

            "\\C": "\\mathbb{C}",
            "\\N": "\\mathbb{N}",
            "\\Q": "\\mathbb{Q}",
            "\\R": "\\mathbb{R}",
            "\\Z": "\\mathbb{Z}",

            "\\PC": "\\left\\{\\ {#1}\\ \\right\\}",
            "\\PR": "\\left({#1}\\right)",

            // TODO
            // trygonometric functions with \PR
            // graf & rg with \PR
            // rref with \PR
            // span with \PR

            "\\cos": "\\text{cos}\\PR{#1}",
            "\\arccos": "\\text{arccos}\\PR{#1}",
            "\\cosh": "\\text{cosh}\\PR{#1}",
            "\\sin": "\\text{sin}\\PR{#1}",
            "\\arcsin": "\\text{arcsin}\\PR{#1}",
            "\\sinh": "\\text{sinh}\\PR{#1}",
            "\\tan": "\\text{tan}\\PR{#1}",
            "\\arctan": "\\arctan{arcsin}\\PR{#1}",
            "\\cot": "\\text{cot}\\PR{#1}",
            "\\arccot": "\\text{arccot}\\PR{#1}",

            // "\\ln": "\\text{ln}\\PR{#1}",
            // "\\log": "\\text{log}_{#1}\\PR{#2}",


            "\\rref": "\\text{rref}",
            "\\span": "\\text{span}",

            // Vector.
            "\\v": "\\underline",
            // Vector segment.
            "\\V": "\\overrightarrow",
          },
        }) +
        `</${containerTag}>`;

      const mathRenderedElement = fromHtmlIsomorphic(mathRenderedString, {
        fragment: true,
      });

      const index = parent.children.indexOf(element);
      parent.children.splice(index, 1, ...mathRenderedElement.children);
      return SKIP;
    });
  };
}
