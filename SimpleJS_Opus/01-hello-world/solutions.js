'use strict';

// =============================================================================
// LESSON 01 — SOLUTIONS
// =============================================================================
// Reference solutions for exercises.js. Each block is the minimal idiomatic
// answer with brief commentary on WHY it's written this way.
// Run with:    node 01-hello-world/solutions.js
//              npm run lesson:01:solutions
// =============================================================================

// --- Exercise 1 ---------------------------------------------------------------
// Single-quoted string is conventional for plain ASCII messages.
console.log('Hello, world!');

// --- Exercise 2 ---------------------------------------------------------------
// Template literal: backticks + ${expression}. The `language` constant is
// inlined at runtime — no manual `+` concatenation required.
const language = 'JavaScript';
console.log(`I am learning ${language}.`);

// --- Exercise 3 ---------------------------------------------------------------
// We grab the function VALUE (no parens) and call it via the new name.
// Java analogue: `Consumer<Object> say = System.out::println;`
const say = console.log;          // first-class function reference
say('Functions are values in JS.');

// --- Exercise 4 ---------------------------------------------------------------
// `console.warn` writes to stderr (so does `console.error`). `console.log`
// goes to stdout. Same `<object>.<method>` shape — just a different method.
console.warn('This is a warning');

// --- Exercise 5 ---------------------------------------------------------------
// Backticks preserve raw newlines inside the literal — no escape needed.
// We outdent the lines flush-left so the printed output isn't indented.
console.log(`Line 1
Line 2
Line 3`);

// --- Exercise 6 ---------------------------------------------------------------
// `console.log` is variadic; commas pass each value as a separate argument.
// Node prints them with a single space between, regardless of type.
console.log(1, 'two', true);

// --- Exercise 7 ---------------------------------------------------------------
// Demonstrating the const reassignment error in a controlled way using
// try/catch (which we'll cover formally in lesson 13). We wrap the bad
// assignment in `eval` so the SyntaxError surfaces at runtime instead of
// killing the whole file at parse time.
try {
    // The inner code is parsed only when eval runs, so the rest of THIS
    // file still loads cleanly.
    eval('const PI = 3.14; PI = 3.14159;');
} catch (err) {
    // `err` is an Error object. `.name` and `.message` are properties on it.
    console.log(`Caught: ${err.name} -> ${err.message}`);
    // Expected output (roughly):
    //   Caught: TypeError -> Assignment to constant variable.
}
