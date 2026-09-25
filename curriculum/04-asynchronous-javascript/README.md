# 04 — Asynchronous JavaScript

**Prerequisite:** [Objects and arrays](../03-objects-and-arrays/README.md).
**Goal:** reason about execution order and handle both successful and failed asynchronous work.

## Read and run, in order

1. [Callbacks and the event loop](01_callbacks_and_event_loop.md).
2. [Promises](02_promises.md), then [promises.js](examples/promises.js).
3. [`async` and `await`](03_async_await.md), then [async-await.js](examples/async-await.js).

From the repository root:

```bash
node curriculum/04-asynchronous-javascript/examples/promises.js
node curriculum/04-asynchronous-javascript/examples/async-await.js
```

These standalone examples simulate asynchronous operations. Let timers finish; interleaved output and caught-error messages are part of the demonstrations. Markdown snippets using API URLs may need a real endpoint; they are not a bundled backend.

**Optional support:** beginner tutorial [promises (37)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-37--promises) and [async/await (38)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-38--asyncawait).

## Practice and checkpoint

Create a promise that resolves after a short delay. Consume it first with `.then()`, then with `await`. Make it reject and handle the error in both versions.

- [ ] Predict the order of synchronous code, promise callbacks, and timers.
- [ ] Explain why an async function returns a promise.
- [ ] Compare sequential awaits with `Promise.all()` and handle rejection.

[← Objects and arrays](../03-objects-and-arrays/README.md) · [Learning path](../../README.md) · [Next: DOM and browser APIs →](../05-dom-and-browser/README.md)