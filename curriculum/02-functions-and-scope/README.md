# 02 — Functions and scope

**Prerequisite:** [Fundamentals](../01-fundamentals/README.md).
**Goal:** break a program into reusable functions and understand what they remember.

## Read and run, in order

1. [Declarations, expressions, and arrow functions](01_function_declarations_vs_expressions.md), then [functions.js](examples/functions.js).
2. [Execution context and the call stack](02_execution_context_and_call_stack.md).
3. [Closures](03_closures.md), then [closures.js](examples/closures.js).

From the repository root:

```bash
node curriculum/02-functions-and-scope/examples/functions.js
node curriculum/02-functions-and-scope/examples/closures.js
```

The examples include Java/UI5 comparisons; focus on the plain JavaScript first. Revisit object-returning factory patterns after chapter 03 if needed.

**Optional support:** beginner tutorial [functions, parameters, returns, and scope (21–24)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-21--functions), [callbacks (27)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-27--callbacks), and [rest parameters (31)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-31--spread-and-rest).

## Practice and checkpoint

Write a temperature-conversion function. Then write `createCounter()` so each call creates a separate counter that remembers its own count.

- [ ] Distinguish printing a value from returning it.
- [ ] Pass a function as an argument and explain when it runs.
- [ ] Demonstrate that two counters do not share their private state.

[← Fundamentals](../01-fundamentals/README.md) · [Learning path](../../README.md) · [Next: Objects and arrays →](../03-objects-and-arrays/README.md)