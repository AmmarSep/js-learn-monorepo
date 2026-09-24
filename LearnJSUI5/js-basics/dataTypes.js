// ============================================================
// dataTypes.js — JavaScript Data Types
// ============================================================
// Java is statically typed (int x = 5;).
// JS is dynamically typed — a variable can hold any type at any time.

// --- Primitive Types (7 total) ---

// 1. String
const greeting = "Hello, UI5!";
const name = 'Ammar';              // single or double quotes both work
const template = `Welcome ${name}`; // template literals (like Java's String.format)
console.log("String:", greeting, name, template);

// 2. Number (no int/float/double distinction — just "number")
const integer = 42;
const decimal = 3.14;
const negative = -7;
console.log("Number:", integer, decimal, negative);
// Java: int + double are different. JS: all numbers are 64-bit floating point.

// 3. BigInt (for very large integers, rarely used in UI5)
const big = 9007199254740991n;
console.log("BigInt:", big);

// 4. Boolean
const isActive = true;
const isDeleted = false;
console.log("Boolean:", isActive, isDeleted);

// 5. undefined — variable declared but no value assigned
let notAssigned;
console.log("undefined:", notAssigned); // undefined

// 6. null — intentionally empty (like Java's null)
const empty = null;
console.log("null:", empty);

// 7. Symbol (unique identifier, advanced — used internally in UI5 framework)
const sym = Symbol("id");
console.log("Symbol:", sym.toString());

// --- Reference Type: Object ---
// Everything that is not a primitive is an object (arrays, functions, dates, etc.)
const person = { name: "Ammar", age: 25 };
console.log("Object:", person);

// --- typeof operator (checking types at runtime) ---
console.log("\n--- typeof checks ---");
console.log("typeof 'hello':", typeof "hello");     // "string"
console.log("typeof 42:",      typeof 42);           // "number"
console.log("typeof true:",    typeof true);         // "boolean"
console.log("typeof undefined:", typeof undefined);  // "undefined"
console.log("typeof null:",    typeof null);         // "object" ← famous JS bug!
console.log("typeof {}:",      typeof {});           // "object"
console.log("typeof []:",      typeof []);           // "object" (arrays are objects)
console.log("typeof function:", typeof function(){}); // "function"

// --- Type Coercion (JS converts types automatically — Java doesn't!) ---
console.log("\n--- Type Coercion ---");
console.log("'5' + 3:", "5" + 3);   // "53" — string concatenation wins
console.log("'5' - 3:", "5" - 3);   // 2 — subtraction triggers numeric conversion
console.log("'5' == 5:", "5" == 5); // true — loose equality (type coercion)
console.log("'5' === 5:", "5" === 5); // false — strict equality (no coercion)

// RULE: Always use === and !== in JS (especially in UI5 code).

// --- Truthy and Falsy Values ---
// In Java, only boolean can be used in if(). In JS, anything can be!
console.log("\n--- Falsy values (evaluate to false) ---");
const falsyValues = [false, 0, "", null, undefined, NaN];
falsyValues.forEach((val, i) => {
    console.log(`  falsyValues[${i}] = ${val} → ${!!val}`);
});

// Everything else is "truthy":
console.log("Truthy: 'hello' →", !!"hello"); // true
console.log("Truthy: 42 →", !!42);           // true
console.log("Truthy: {} →", !!{});           // true (empty object is truthy!)
console.log("Truthy: [] →", !![]);           // true (empty array is truthy!)

// ============================================================
// Run: node js-basics/dataTypes.js
// ============================================================
