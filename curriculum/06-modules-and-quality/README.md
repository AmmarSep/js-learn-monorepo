# 06 — Modules and code quality

**Prerequisite:** [DOM and browser APIs](../05-dom-and-browser/README.md).
**Goal:** split code into understandable pieces and diagnose mistakes systematically.

## Read and try, in order

1. Beginner tutorial: [Modules (39)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-39--modules), including separate exporting and importing files.
2. [Debugging](01_debugging.md): console methods, breakpoints, and stepping through execution.
3. [Common pitfalls](02_common_pitfalls.md): predict the problem before reading the fix.

The repository's runnable `.js` examples use **CommonJS**. For the tutorial's ES-module exercise, create separate `.mjs` files and run the entry file with Node.js, or use `<script type="module">` on a page served over HTTP. Do not change the root package's module type: the Node.js environment lesson intentionally uses `require` and `__filename`.

The UI5 track's [modularization example](../../tracks/ui5/examples/modularization.js) is an optional comparison with `sap.ui.define`; it simulates a loader and is not a replacement for the ES-module exercise.

**Optional support:** beginner tutorial [debugging (41)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-41--debugging).

## Practice and checkpoint

Split your product-summary or counter exercise into a reusable module and an entry file. Add an incorrect input deliberately, then use a breakpoint to find and fix the problem.

- [ ] Explain named exports, default exports, and imports.
- [ ] Pause inside a function and inspect its arguments and local variables.
- [ ] Reproduce a bug with a small example before changing code.
- [ ] Handle an error without silently hiding it.

[← DOM and browser APIs](../05-dom-and-browser/README.md) · [Learning path](../../README.md) · [Next: Projects →](../../projects/README.md) · [Optional: UI5 →](../../tracks/ui5/README.md)