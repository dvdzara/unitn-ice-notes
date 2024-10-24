import type { Root } from "hast";
import { fromHtml } from "hast-util-from-html";
import { toString } from "hast-util-to-string";
import temml from "temml";
import { SKIP, visitParents } from "unist-util-visit-parents";

const macros = {
  "\\st": "\\ : \\ ",

  "\\C": "\\mathbb{C}",
  "\\N": "\\mathbb{N}",
  "\\Q": "\\mathbb{Q}",
  "\\R": "\\mathbb{R}",
  "\\Z": "\\mathbb{Z}",

  "\\(": "\\left(",
  "\\)": "\\right)",
  "\\[": "\\left[",
  "\\]": "\\right]",
  "\\lb": "\\left\\{\\ ",
  "\\rb": "\\ \\right\\}",

  "\\cos": "\\text{cos}\\(#1\\)",
  "\\arccos": "\\text{arccos}\\(#1\\)",
  "\\cosh": "\\text{cosh}\\(#1\\)",
  "\\sin": "\\text{sin}\\(#1\\)",
  "\\arcsin": "\\text{arcsin}\\(#1\\)",
  "\\sinh": "\\text{sinh}\\(#1\\)",
  "\\tan": "\\text{tan}\\(#1\\)",
  "\\arctan": "\\text{arctan}\\(#1\\)",
  "\\cot": "\\text{cot}\\(#1\\)",
  "\\arccot": "\\text{arccot}\\(#1\\)",

  "\\ln": "\\text{ln}\\(#1\\)",
  "\\log": "\\text{log}_{#1}\\(#2\\)",

  "\\rg": "\\text{rg}\\(#1\\)",
  "\\rref": "\\text{rref}\\(#1\\)",
  "\\span": "\\text{span}\\(#1\\)",
  "\\graf": "\\text{graf}\\(#1\\)",

  // Derivative of a function.
  "\\dx": "D\\[ #1 \\]",

  "\\matrix": "\\begin{bmatrix} #1 \\end{bmatrix}",

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
