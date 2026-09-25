# 05 — DOM and browser APIs

**Prerequisite:** [Asynchronous JavaScript](../04-asynchronous-javascript/README.md).
**Goal:** connect JavaScript to a page and display data from an API.

## Read and try, in order

1. [DOM basics and selecting elements](01_dom_basics.md).
2. [Events and fetch](02_events_and_fetch.md).
3. Beginner tutorial: [JSON (35)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-35--json), then [fetch (36)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-36--fetch).

**Environment: browser, not Node.js.** Create a small disposable HTML page with the elements used by each snippet, load it in a browser, and run one example at a time in its developer console or a script loaded after the elements. The existing [browser demo](../00-getting-started/examples/01_browser.js) shows element creation, but replaces the page body.

Code referencing `#myId`, a button, or another selector needs a matching element first. Relative URLs such as `/api/data` are placeholders: this repository does not provide that server. Public fetch examples require network access and a server that permits your page's origin (CORS). Storage availability also depends on the browser and origin; use a local HTTP server when needed.

**Optional support:** beginner tutorial [DOM basics (33)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-33--dom-basics) and [events (34)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-34--events).

## Practice and checkpoint

Build a page with a button and a counter. Add a second button to load data from a reachable JSON endpoint; show loading, success, and failure states.

- [ ] Select an element safely and change its text.
- [ ] Attach an event listener and explain the event object.
- [ ] Check the HTTP response status, parse JSON, and show a useful error.

[← Asynchronous JavaScript](../04-asynchronous-javascript/README.md) · [Learning path](../../README.md) · [Next: Modules and code quality →](../06-modules-and-quality/README.md)