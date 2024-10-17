# How to format math blocks

Files to ignore in vscode search:
`.*ignore, .devcontainer/*, .npmrc, *.astro, *.css, *.js, *.json, *.svg, *.ts, *.vscode, *.yaml, *.yml, LICENSE, math-format.md, public/*`

Between parentheses is the (search, replace) to insert in vscode search:

- check that the element after `^` is enclosed in {} (`^_([^{\\])`, `^{$1}`);
- check that the element after `_` is enclosed in {} (`_([^{\\])`, `_{$1}`);
- check that there aren't double spaces;
- check that functions starting with `\` are used:
  - `\cos`;
  - `\sin`;
  - `\tan`;
  - ...
- check spacing around operators:
  - `=`;
  - `+` (`(?=[^ ])\+(?!\\infty)(?=[^ ])`, `+`);
  - `-` (`(?=[^ ])-(?!\\infty)(?=[^ ])`, `-`);
  - `\pm`;
  - `\cdot` (`?=[^ ])\\cdot(?=[^ ]`, `\cdot`)
  - `\times` (`(?=[^ ])\\times(?=[^ ])`, `\times`)
  - ...
- brackets with `\left`, `\right`:
  - left (`(\s*)?(\\left)?(\s)*\\\{(\s*\\)?\s+`, `\left\{ \ `)
  - right (`\s*(\\\s*)?(\\right)?\\\}`, ` \ \right\}`)
