// ============================================================
// functions.js — Functions in JavaScript
// ============================================================
// In Java, functions (methods) always belong to a class.
// In JS, functions are "first-class citizens" — they can be:
//   - assigned to variables
//   - passed as arguments
//   - returned from other functions

// --- 1. Function Declaration (like a Java method) ---
function greet(name) {
    return "Hello, " + name + "!";
}
console.log("Declaration:", greet("Ammar"));

// Declarations are hoisted — you can call them before they appear:
console.log("Hoisted call:", add(2, 3));
function add(a, b) {
    return a + b;
}

// --- 2. Function Expression (assign a function to a variable) ---
// NOT hoisted — must be defined before use.
const multiply = function (a, b) {
    return a * b;
};
console.log("Expression:", multiply(4, 5));

// --- 3. Arrow Functions (ES6 — most common in modern JS / UI5) ---
// Shorter syntax. Java equivalent: lambda expressions (x -> x * 2).
const square = (x) => x * x;
console.log("Arrow:", square(6));

// Multi-line arrow function:
const divide = (a, b) => {
    if (b === 0) return "Cannot divide by zero";
    return a / b;
};
console.log("Arrow multi-line:", divide(10, 3));

// Single parameter — parentheses optional:
const double = x => x * 2;
console.log("Arrow single param:", double(7));

// --- 4. Default Parameters (like Java's overloading, but simpler) ---
function welcome(name = "Guest") {
    return `Welcome, ${name}!`;
}
console.log("Default param:", welcome());       // "Welcome, Guest!"
console.log("Default param:", welcome("Ali"));  // "Welcome, Ali!"

// --- 5. Rest Parameters (like Java's varargs: int... numbers) ---
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log("Rest params:", sum(1, 2, 3, 4, 5)); // 15

// --- 6. Functions as Arguments (Callbacks) ---
// Very common in UI5 for event handlers.
function doOperation(a, b, operation) {
    return operation(a, b);
}
console.log("Callback add:", doOperation(10, 5, (a, b) => a + b));
console.log("Callback sub:", doOperation(10, 5, (a, b) => a - b));

// --- 7. Returning Functions (Higher-Order Functions) ---
function createMultiplier(factor) {
    return (number) => number * factor;
}
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);
console.log("Higher-order:", triple(4));   // 12
console.log("Higher-order:", tenTimes(4)); // 40

// --- 8. IIFE — Immediately Invoked Function Expression ---
// Runs immediately. Used in UI5 to avoid polluting global scope.
(function () {
    const secret = "I am private";
    console.log("IIFE:", secret);
})();
// console.log(secret); // ← ReferenceError — not accessible outside.

// --- 9. Arrow Functions vs Regular Functions (`this` context) ---
// IMPORTANT for UI5: Arrow functions do NOT have their own `this`.
// See this-keyword.js for deeper explanation.
const obj = {
    name: "UI5 App",
    // Regular function: `this` refers to the object
    regularMethod: function () {
        return "Regular: " + this.name;
    },
    // Arrow function: `this` is inherited from surrounding scope
    arrowMethod: () => {
        return "Arrow: " + this.name; // `this` is NOT the object!
    }
};
console.log(obj.regularMethod()); // "Regular: UI5 App"
console.log(obj.arrowMethod());   // "Arrow: undefined" (in Node.js)

// --- Key Takeaways for UI5 ---
// • Use arrow functions for callbacks and short logic.
// • Use regular functions (or method shorthand) for object methods.
// • Callbacks are everywhere in UI5: event handlers, promise chains, formatters.

// ============================================================
// Run: node js-basics/functions.js
// ============================================================
