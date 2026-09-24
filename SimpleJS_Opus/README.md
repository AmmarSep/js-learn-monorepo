# SimpleJS_Opus

> A progressive **JavaScript course for Java developers**.
> Every concept is taught from absolute fundamentals and explicitly compared
> to its Java equivalent. All examples run on plain Node.js — no frameworks.

---

## 🎯 Who is this for?

You if you:
- Are fluent in **Java** (JDK 8 → 23, OOP, generics, threads, JVM).
- Are a **complete beginner** in JavaScript.
- Want to understand not just *what* JS does, but *why* it looks so weird
  coming from a strongly-typed, class-based language.

---

## 🚀 How to use this repo

1. Install [Node.js 18+](https://nodejs.org/).
2. Clone this repo and `cd` into it.
3. Run any lesson directly:
   ```bash
   npm run lesson:01
   ```
4. Read the lesson’s `README.md` first, then the `.js` file (top-to-bottom),
   then attempt `exercises.js`, then peek at `solutions.js`.

Each lesson is **self-contained** — you can run it in isolation.

---

## 🗺️ Roadmap & checklist

Tick each lesson as you finish it.

- [x] **01 — Hello World — and why we write `console.log` with a dot**
- [ ] 02 — Variables and types (`var` / `let` / `const`, primitives, `null` vs `undefined`)
- [ ] 03 — Why dots are used (objects, properties, methods)
- [ ] 04 — Functions (declarations, expressions, arrow functions, first-class)
- [ ] 05 — Objects and prototypes (the JS answer to classes)
- [ ] 06 — `this` and binding (the most confusing keyword in JS)
- [ ] 07 — Closures (functions that remember)
- [ ] 08 — Arrays and iteration (`map`, `filter`, `reduce`, `for…of`)
- [ ] 09 — Async: callbacks and Promises
- [ ] 10 — `async` / `await` vs Java threads & `CompletableFuture`
- [ ] 11 — Modules (`import` / `export` vs Java `package` / `import`)
- [ ] 12 — Classes vs Java classes (sugar over prototypes)
- [ ] 13 — Error handling (`try`/`catch`/`throw`, custom errors)
- [ ] 14 — Collections beyond arrays (`Map`, `Set`, `WeakMap`)
- [ ] 15 — JSON, serialization, and the wire format
- [ ] 16 — The event loop and the microtask queue
- [ ] 17 — Generators and iterators
- [ ] 18 — Decorators, getters/setters, `Proxy` and `Reflect`
- [ ] 19 — TypeScript bridge (optional, for Java-style typing)
- [ ] 20 — Tooling: npm, bundlers, browsers (a gentle intro)

> The roadmap may grow. Lessons are generated **one at a time** and added
> to this checklist as they land.

---

## 📚 Reference docs (root level)

- [`GLOSSARY.md`](./GLOSSARY.md) — Java term ↔ JS term mapping.
- [`CHEATSHEET.md`](./CHEATSHEET.md) — Side-by-side Java vs JS syntax.

---

## 🧭 Conventions used in this course

Every lesson uses these visual markers:

- 🟦 **In Java you would…** — the Java way of doing it.
- 🟨 **In JS you do…** — the JavaScript way.
- ⚠️ **Gotcha** — something that bites Java devs specifically.
- 💡 **Why** — the underlying reason JS behaves this way.

Code style:
- Modern JS (ES2022+).
- `'use strict';` at the top of every file.
- `const` by default, `let` when reassignment is needed, **never** `var`
  (except when we’re explicitly explaining it in lesson 02).
- Heavy inline comments — especially where syntax differs from Java.
