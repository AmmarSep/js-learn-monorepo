// ============================================================
// variables.js — Variable Declarations in JavaScript
// ============================================================
// In Java you declare variables with a type:  int x = 10;
// In JS you declare with: var, let, or const (no type needed).

// --- var (function-scoped, old style — avoid in modern JS) ---
var name = "Ammar";
console.log("var name:", name);

// var is hoisted to the top of its function and can be re-declared:
var name = "Ali"; // No error! This is dangerous and confusing.
console.log("var re-declared:", name);

// --- let (block-scoped, modern — use this for mutable variables) ---
// Similar to a Java local variable.
let age = 25;
age = 26; // OK — you can reassign
console.log("let age:", age);

// let respects block scope (like Java):
if (true) {
    let blockVar = "I exist only inside this block";
    console.log("Inside block:", blockVar);
}
// console.log(blockVar); // ← ReferenceError! Not accessible outside.

// --- const (block-scoped, cannot be reassigned — use by default) ---
// Similar to Java's `final` keyword.
const PI = 3.14159;
console.log("const PI:", PI);
// PI = 3.14; // ← TypeError! Cannot reassign a const.

// IMPORTANT: const does NOT make objects immutable!
const person = { name: "Ammar" };
person.name = "Ali"; // This is allowed — you're mutating the object, not reassigning.
console.log("Mutated const object:", person);

// --- Best Practice for UI5 / modern JS ---
// 1. Use `const` by default.
// 2. Use `let` only when you need to reassign.
// 3. Never use `var` in new code.

// --- Hoisting Demo ---
// In Java, using a variable before declaration is a compile error.
// In JS with var, the declaration is "hoisted" (moved to top), but not the value.
console.log("hoisted:", hoisted); // undefined (not an error!)
var hoisted = "I was hoisted";
console.log("after assignment:", hoisted);

// With let/const, accessing before declaration throws a ReferenceError:
// console.log(notYet); // ← ReferenceError: Cannot access 'notYet' before initialization
// let notYet = "hello";

// ============================================================
// Run: node js-basics/variables.js
// ============================================================
