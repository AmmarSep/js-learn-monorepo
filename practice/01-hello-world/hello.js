'use strict';
// ^^^^^^^^^^^^^
// "Strict mode" pragma. MUST be the very first statement of the file.
// It turns silent JS quirks into hard errors (e.g. assigning to an
// undeclared variable throws instead of silently creating a global).
// Java equivalent: there isn't one — Java is "always strict".

// ---------------------------------------------------------------------------
// 1. THE classic one-liner.
// ---------------------------------------------------------------------------
//
// In Java you would write:
//     System.out.println("Hello, world!");
// In JavaScript you write:
console.log('Hello, world!');
//  ^^^^^^^ ^^^ ^^^^^^^^^^^^^^^^^
//  |       |   |
//  |       |   +-- argument: a string literal (single quotes are fine)
//  |       +-- the call operator () invokes the function value
//  +-- "console.log" = property "log" on the global object "console".
//      The dot (.) is the property-access operator. It is the same dot
//      Java uses in `System.out.println` — JS just needs fewer hops because
//      `console` is itself a plain object whose `log` property is a function.

// ---------------------------------------------------------------------------
// 2. There is no `main`. The file runs top-to-bottom.
// ---------------------------------------------------------------------------
//
// Each statement below executes in order, the moment Node.js parses it.
// You don't wrap anything in `public class Main { public static void main ... }`.

console.log('I run second.');   // The string can use single OR double quotes.
console.log("I run third.");    // Identical meaning to single-quoted strings.

// ---------------------------------------------------------------------------
// 3. Template literals (backticks) — the JS equivalent of String.format.
// ---------------------------------------------------------------------------
//
// Backticks (`) allow:
//   - multi-line strings, AND
//   - ${expression} interpolation (any JS expression goes inside ${}).
const name = 'Java dev';        // `const` = an immutable *binding* (Java's `final`).
console.log(`Hello, ${name}!`); // -> "Hello, Java dev!"
console.log(`2 + 2 = ${2 + 2}`); // -> "2 + 2 = 4"  (expression evaluated first)

// ---------------------------------------------------------------------------
// 4. Proof that `console.log` is "just" a function stored on an object.
// ---------------------------------------------------------------------------
//
// We grab the function value out of `console` and stash it under a new name.
// Notice we do NOT add `()` — without parens, `console.log` is the FUNCTION
// itself, not the result of calling it. (You can't do this with Java's
// `System.out.println` directly without method references.)
const shout = console.log;       // Functions are first-class values in JS.
shout('called via a different name -> still works');

// Equivalent Java idea would be a method reference:
//     Consumer<Object> shout = System.out::println;
//     shout.accept("...");

// ---------------------------------------------------------------------------
// 5. console has more methods than just `log`.
// ---------------------------------------------------------------------------
//
// `console` is an object with many properties; `log` is just the most famous.
console.info('console.info  -> usually equivalent to log');
console.warn('console.warn  -> goes to stderr, often colored yellow');
console.error('console.error -> goes to stderr, often colored red');

// ---------------------------------------------------------------------------
// 6. The return value of console.log is `undefined` (JS's "no value" value).
// ---------------------------------------------------------------------------
//
// Java's `void` means "no return". JS instead returns the SPECIAL VALUE
// `undefined`, which you can actually capture in a variable. We'll explore
// `undefined` vs `null` thoroughly in curriculum/01-fundamentals/.
const result = console.log('What does console.log return?');
console.log('It returned ->', result); // -> "It returned -> undefined"

// ---------------------------------------------------------------------------
// 7. Semicolons are technically optional. We keep them anyway.
// ---------------------------------------------------------------------------
//
// JS has Automatic Semicolon Insertion (ASI). The line below would also
// work without the trailing `;`. Don't rely on ASI — there are edge cases
// where it inserts the wrong thing (notably before lines starting with
// `(`, `[`, `` ` ``, `+`, `-`, `/`).
console.log('Done.')   // <- no semicolon here on purpose; still works
;                       // <- but we put one to be explicit
