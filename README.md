# Learn JavaScript, one topic at a time

**Start here:** [00 — Getting started](curriculum/00-getting-started/README.md).
Follow the numbered curriculum instead of reading several courses in parallel.
No Java or UI5 knowledge is required; Java comparisons in some examples are optional context.

## Your learning path

Each chapter tells you what to read, what to run, and what you should be able to do before moving on.
Use these checkboxes to track **your progress**, not whether a lesson exists.

- [ ] [00 — Getting started](curriculum/00-getting-started/README.md): run your first program; distinguish Node.js from the browser.
- [ ] [01 — Fundamentals](curriculum/01-fundamentals/README.md): variables, types, operators, conditions, loops.
- [ ] [02 — Functions and scope](curriculum/02-functions-and-scope/README.md): arguments, return values, the call stack, closures.
- [ ] [03 — Objects and arrays](curriculum/03-objects-and-arrays/README.md): properties, array methods, `this`, prototypes, classes.
- [ ] [04 — Asynchronous JavaScript](curriculum/04-asynchronous-javascript/README.md): callbacks, the event loop, promises, `async`/`await`.
- [ ] [05 — DOM and browser APIs](curriculum/05-dom-and-browser/README.md): HTML elements, events, JSON, fetch.
- [ ] [06 — Modules and code quality](curriculum/06-modules-and-quality/README.md): imports/exports, debugging, common mistakes.
- [ ] [Build a small project](projects/README.md) without copying an answer.
- [ ] Optional: [JavaScript for UI5](tracks/ui5/README.md), then the UI5-style console project.

## Run your first example

Install a currently supported [Node.js LTS release](https://nodejs.org/) and open a terminal in **this repository's root**.
The examples have no external dependencies, so **no `npm install` is needed**.

```bash
node --version
npm start
```

`npm start` runs the hello-world walkthrough. Read the [hello-world lesson](practice/01-hello-world/README.md), then try:

```bash
npm run lesson:01:exercises
# After attempting the exercises:
npm run lesson:01:solutions
```

All commands in the chapter guides run from the repository root. Browser exercises are explicitly labeled; do not run DOM code with Node.js.
Markdown code blocks are **individual examples**, including intentional mistakes, not complete scripts to paste all at once.

## A simple study routine

1. Read one concept, not a whole folder.
2. Predict what its example will print, then run it.
3. Change a value or add a case and explain the result aloud.
4. Try the chapter's practice task without looking at a solution.
5. Move on when you can meet the checkpoint; revisit the chapter if you cannot.

If an explanation feels too dense, use the chapter's optional beginner-tutorial links.
You do **not** need to finish that second tutorial separately.

## Where things belong

| Folder | Purpose |
| --- | --- |
| [curriculum/](curriculum/README.md) | The main learning sequence, with theory and matching `examples/` together |
| [practice/](practice/README.md) | Existing exercises and answer keys; attempt exercises before reading solutions |
| [projects/](projects/README.md) | Small project briefs and the existing UI5-style console demo |
| [reference/](reference/README.md) | Optional explanations, syntax lookup, glossary, and review notes |
| [tracks/ui5/](tracks/ui5/README.md) | Optional framework-oriented material after core JavaScript |

Looking for something from the old folders? See the [old-to-new location map](ORGANIZATION.md).