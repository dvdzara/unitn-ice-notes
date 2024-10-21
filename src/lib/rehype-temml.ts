import type { Root } from "hast";
import { fromHtml } from "hast-util-from-html";
import { toString } from "hast-util-to-string";
import temml from "temml";
import { SKIP, visitParents } from "unist-util-visit-parents";

// This plugin doesn't support math inside ```math...``` blocks, only math
// inside $$...$$ blocks.

const macros = {
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

  "\\cos": "\\text{cos}\\left({#1}\\right)",
  "\\arccos": "\\text{arccos}\\left({#1}\\right)",
  "\\cosh": "\\text{cosh}\\left({#1}\\right)",
  "\\sin": "\\text{sin}\\left({#1}\\right)",
  "\\arcsin": "\\text{arcsin}\\left({#1}\\right)",
  "\\sinh": "\\text{sinh}\\left({#1}\\right)",
  "\\tan": "\\text{tan}\\left({#1}\\right)",
  "\\arctan": "\\text{arctan}\\left({#1}\\right)",
  "\\cot": "\\text{cot}\\left({#1}\\right)",
  "\\arccot": "\\text{arccot}\\left({#1}\\right)",

  "\\ln": "\\text{ln}\\left({#1}\\right)",
  "\\log": "\\text{log}_{#1}\\left({#2}\\right)",

  "\\rref": "\\text{rref}",
  "\\span": "\\text{span}",

  // Vector.
  "\\v": "\\underline",
  // Vector segment.
  "\\V": "\\overrightarrow",
};

export default () => {
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
      const mathRenderedString =
        `<${containerTag} class="math-container">` +
        temml.renderToString(toString(element), {
          displayMode: mathDisplay,
          macros,
          strict: true,
          // Makes the build fail when an invalid math block is found.
          throwOnError: true,
        }) +
        `</${containerTag}>`;

      const mathRenderedElement = fromHtml(mathRenderedString, {
        fragment: true,
      });

      const index = parent.children.indexOf(element);
      parent.children.splice(index, 1, ...mathRenderedElement.children);
      return SKIP;
    });
  };
};
