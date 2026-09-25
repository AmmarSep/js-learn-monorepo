# 03 — Objects and arrays

**Prerequisite:** [Functions and scope](../02-functions-and-scope/README.md).
**Goal:** model data, transform collections, and understand method calls and inheritance.

## Read and run, in order

1. [Objects and property access](01_objects_and_property_access.md), then [objects.js](examples/objects.js).
2. [Arrays and array methods](02_arrays_and_array_methods.md), then [arrays.js](examples/arrays.js).
3. [The `this` keyword](examples/this-keyword.js): read the comments and predict each call's receiver before running it.
4. [Prototypes and inheritance](examples/prototypes.js), then the beginner tutorial's [classes lesson](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-40--classes).

From the repository root:

```bash
node curriculum/03-objects-and-arrays/examples/objects.js
node curriculum/03-objects-and-arrays/examples/arrays.js
node curriculum/03-objects-and-arrays/examples/this-keyword.js
node curriculum/03-objects-and-arrays/examples/prototypes.js
```

UI5-specific sections illustrate applications of these concepts; you do not need the framework yet.

**Optional support:** beginner tutorial [arrays and object access (17–20)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-17--arrays), [array methods (26)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-26--array-methods), and [methods, `this`, destructuring, and spread (28–31)](../../reference/JAVASCRIPT_TUTORIAL.md#lesson-28--objects-and-methods).

## Practice and checkpoint

Create an array of products with a name, price, and stock count. Filter available products, map them to names, and reduce them to a total inventory value.

- [ ] Use dot access and bracket access appropriately.
- [ ] Explain mutation versus creating a new array/object.
- [ ] Explain why extracting a method can change `this`, and fix it with `bind`.
- [ ] Trace where an inherited property is found.

[← Functions and scope](../02-functions-and-scope/README.md) · [Learning path](../../README.md) · [Next: Asynchronous JavaScript →](../04-asynchronous-javascript/README.md)