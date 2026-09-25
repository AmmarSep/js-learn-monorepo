# 00 — Getting started

**Goal:** run a program and know which environment it needs. No prerequisites.

## Read and try, in order

1. Read [Hello world](../../practice/01-hello-world/README.md), run its [example](../../practice/01-hello-world/hello.js), and attempt its [exercises](../../practice/01-hello-world/exercises.js) before opening the [solutions](../../practice/01-hello-world/solutions.js).
2. Read [How JavaScript runs](01_how_javascript_runs.md). Run the [Node.js example](examples/01_node.js) to explore files and runtime globals.
3. Try the [browser example](examples/01_browser.js) **section by section** in a disposable page's developer console. It replaces the page body; do not use an important page. Some browser APIs depend on the page's origin and permissions.
4. Read [The JavaScript engine](02_javascript_engine.md) and run the [engine demo](examples/02_engine_demo.js). This is an overview; revisit the call stack in chapter 02 rather than memorizing engine internals now.

From the repository root:

```bash
npm start
npm run lesson:01:exercises
npm run demo:node
npm run demo:engine
```

`demo:node` writes and reads `output.txt` in the repository root, overwriting it if it exists. If that filename is already in use, run `01_node.js` directly with Node.js from a disposable working directory, using the full path to the script, rather than the npm shortcut. Browser globals such as `window` and `document` are unavailable in Node.js; other global APIs can vary by Node.js version.

**Need a slower explanation?** Read beginner tutorial [lessons 1–3](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-1--what-programming-is), then [statements](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-4--statements), [comments](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-11--comments), [console output](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-12--consolelog), and [errors](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-13--errors).

## Checkpoint

- [ ] Print a greeting and a calculated value without copying the example.
- [ ] Explain why a script using `document` cannot run directly in Node.js.
- [ ] Identify a syntax error versus a runtime error.

[Learning path](../../README.md) · [Next: Fundamentals →](../01-fundamentals/README.md)