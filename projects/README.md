# Projects — apply what you learned

Pick a small project and finish it before adding features. The first three entries below are **build-it-yourself briefs**, not existing implementations.

## 1. Console calculator — after chapters 01–02

- Write functions for addition, subtraction, multiplication, and division.
- Handle division by zero and invalid input explicitly.
- Check normal inputs, zero, and negative numbers with examples you write yourself.

## 2. Product or contact manager — after chapter 03

- Store entries as objects in an array; add, update, find, and remove entries.
- Produce a filtered list and a summary using array methods.
- Handle an empty list and an unknown entry without crashing.

## 3. Browser task list — after chapters 04–06

- Add, complete, and remove tasks through DOM event listeners.
- Reject empty input and render task text safely with `textContent`.
- Separate data operations from rendering; add persistence or API loading only after the basic version works.
- Check empty, single-task, and multiple-task states.

More prompts: [beginner tutorial project ideas](../reference/JAVASCRIPT_TUTORIAL.md#lesson-42--small-beginner-projects).

## 4. Existing UI5-style console demo — after the optional UI5 track

Read [the UI5 track](../tracks/ui5/README.md) first, then inspect [simple-ui5-like-app.js](ui5-style/simple-ui5-like-app.js).

From the repository root:

```bash
npm run demo:ui5
```

This is a **Node.js simulation**, not a browser UI or an installed SAP UI5 application. It combines model, view, controller, event, and service concepts. No UI5 SDK or backend is required.

Before extending it, trace one action from the controller through the model to the simulated view. Then make a small change and explain which parts it affects.

[Back to the learning path](../README.md)