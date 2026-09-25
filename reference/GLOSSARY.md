# GLOSSARY — Java ↔ JavaScript

A growing translation table. Entries are added as each lesson introduces them.

[Reference index](README.md) · [Main learning path](../README.md)

| Java term                      | JavaScript equivalent                  | Notes |
|--------------------------------|----------------------------------------|-------|
| `class`                        | `class` (ES2015) / function + prototype | JS classes are syntactic sugar over prototypes ([objects and arrays](../curriculum/03-objects-and-arrays/README.md)). |
| `method`                       | function stored as a property of an object | A "method" in JS is just a function attached to an object ([objects and arrays](../curriculum/03-objects-and-arrays/README.md)). |
| `field` / instance variable    | property                                | Properties live on objects and can be added/removed at runtime. |
| `package`                      | module (file)                          | One file = one module. No `package` keyword ([modules](../curriculum/06-modules-and-quality/README.md)). |
| `import`                       | `import` (ESM) / `require` (CommonJS)  | Two coexisting module systems. |
| `interface`                    | duck typing / TypeScript `interface`   | Vanilla JS has no interfaces; structural typing is implicit. |
| `generics` (`List<String>`)    | (none in plain JS) / TypeScript generics | JS is dynamically typed; no compile-time generics. |
| `Thread` / `ExecutorService`   | the event loop + Promises              | JS is single-threaded; concurrency via async ([asynchronous JavaScript](../curriculum/04-asynchronous-javascript/README.md)). |
| `null`                         | `null`                                  | But JS *also* has `undefined` — they’re different ([fundamentals](../curriculum/01-fundamentals/README.md)). |
| `System.out.println(x)`        | `console.log(x)`                        | `console` is a global object; `log` is a method on it ([hello world](../practice/01-hello-world/README.md)). |
| `public static void main`      | top-level code in a `.js` file          | No `main`. The file is the program. |
| `String`                       | `string` primitive (or `String` wrapper) | Strings are primitives, not objects (most of the time). |
| `int` / `long` / `double`      | `number` (IEEE-754 double) / `bigint`   | Only one numeric type by default. |
| `boolean`                      | `boolean`                               | Same. |
| `final` (variable)             | `const`                                 | Binding is immutable; the value can still mutate (object/array). |
| `var` (Java 10+ local inference) | `let` (block-scoped) / `var` (legacy) | Java’s `var` ≠ JS’s `var`. JS’s `let` is the real analogue. |
| `Object` (root class)          | `Object` (root prototype)               | Every value (except `null`/`undefined`) inherits from it. |
| `toString()`                   | `toString()`                            | Same name, called automatically in string contexts. |
| `equals(Object o)`             | `===` (strict equality)                 | No method override; use `===` or `Object.is` ([fundamentals](../curriculum/01-fundamentals/README.md)). |
| `hashCode()`                   | (no built-in)                           | `Map`/`Set` use reference identity for objects. |
| Lambda `(x) -> x + 1`          | Arrow function `(x) => x + 1`           | Almost identical syntax — see [functions](../curriculum/02-functions-and-scope/README.md) and [`this`](../curriculum/03-objects-and-arrays/examples/this-keyword.js). |
| `Runnable` / `Callable`        | function value                          | Functions are first-class values in JS. |
