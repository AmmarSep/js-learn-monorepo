# Practice

Attempt exercises before looking at solutions. Start with [chapter 00](../curriculum/00-getting-started/README.md), then use the practice tasks in each chapter's README.

## Existing exercise files

The [hello-world practice set](01-hello-world/README.md) is the existing exercise/solution pair. It explains JavaScript from the beginning, with optional Java comparisons:

1. Read the [lesson](01-hello-world/README.md).
2. Predict and run [hello.js](01-hello-world/hello.js).
3. Complete the TODOs in [exercises.js](01-hello-world/exercises.js).
4. Compare your work with [solutions.js](01-hello-world/solutions.js).

From the **repository root**:

```bash
npm run lesson:01
npm run lesson:01:exercises
npm run lesson:01:solutions
```

These command names preserve the original hello-world lesson's numbering; they do not refer to curriculum chapter 01. Running an exercise file successfully does not mean you have completed its TODOs.

## Practice for later topics

- [Fundamentals](../curriculum/01-fundamentals/README.md): decisions and loops.
- [Functions and scope](../curriculum/02-functions-and-scope/README.md): conversion functions and independent counters.
- [Objects and arrays](../curriculum/03-objects-and-arrays/README.md): a product inventory summary.
- [Async](../curriculum/04-asynchronous-javascript/README.md): delayed success and failure.
- [Browser](../curriculum/05-dom-and-browser/README.md): interactive counters and data loading.
- [Modules and quality](../curriculum/06-modules-and-quality/README.md): separate modules and debug an incorrect input.

These are prompts, not additional prebuilt exercise files. The [beginner tutorial](../reference/JAVASCRIPT_TUTORIAL.md) also contains mini-practice, answers, and quizzes. When ready, choose a [project](../projects/README.md).

## Reference docs

- [Glossary](../reference/GLOSSARY.md) — Java term ↔ JS term mapping.
- [Cheatsheet](../reference/CHEATSHEET.md) — Side-by-side Java vs JS syntax.

---

## Conventions used in the hello-world set

The lesson uses these visual markers:

- 🟦 **In Java you would…** — the Java way of doing it.
- 🟨 **In JS you do…** — the JavaScript way.
- ⚠️ **Gotcha** — something that bites Java devs specifically.
- 💡 **Why** — the underlying reason JS behaves this way.

Code style:
- Modern JS (ES2022+).
- `'use strict';` at the top of every file.
- `const` by default, `let` when reassignment is needed, **never** `var`
  (except in examples explicitly teaching `var` in the fundamentals chapter).
- Heavy inline comments — especially where syntax differs from Java.

[Back to the learning path](../README.md)
