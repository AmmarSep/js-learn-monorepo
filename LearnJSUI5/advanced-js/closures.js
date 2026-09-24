// ============================================================
// closures.js — Closures in JavaScript
// ============================================================
// A closure is when a function "remembers" variables from its outer scope,
// even after the outer function has finished executing.
// Java doesn't have closures in the same way (lambdas have limited capture).

// --- 1. Basic Closure ---
function createGreeter(greeting) {
    // `greeting` is captured by the inner function
    return function (name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
console.log(sayHello("Ammar")); // "Hello, Ammar!" — remembers "Hello"
console.log(sayHi("Ali"));      // "Hi, Ali!" — remembers "Hi"

// --- 2. Closure for Private State (like Java's private fields) ---
// JS doesn't have access modifiers (public/private/protected).
// Closures are the classic way to create private variables.
function createCounter() {
    let count = 0; // private — not accessible from outside

    return {
        increment() { count++; },
        decrement() { count--; },
        getCount() { return count; }
    };
}

const counter = createCounter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
console.log("Counter:", counter.getCount()); // 2
// console.log(counter.count); // undefined — truly private!

// --- 3. Closure in Loops (Classic Gotcha) ---
// Problem with var in loops:
console.log("\n--- var in loop (broken) ---");
for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log("var loop:", i); // prints 3, 3, 3 (not 0, 1, 2!)
    }, 100);
}
// Why? `var` is function-scoped, so all callbacks share the same `i`.
// By the time setTimeout fires, the loop is done and i === 3.

// Fix with let (block-scoped — each iteration gets its own `i`):
console.log("--- let in loop (fixed) ---");
for (let j = 0; j < 3; j++) {
    setTimeout(function () {
        console.log("let loop:", j); // prints 0, 1, 2 ✓
    }, 200);
}

// --- 4. Closure for Configuration (Factory Pattern) ---
// Common in UI5 for creating configured formatters or validators.
function createValidator(minLength, maxLength) {
    return function (value) {
        if (value.length < minLength) return `Too short (min ${minLength})`;
        if (value.length > maxLength) return `Too long (max ${maxLength})`;
        return "Valid";
    };
}

const validateUsername = createValidator(3, 20);
const validatePassword = createValidator(8, 50);
console.log("\nValidator:", validateUsername("Am"));       // "Too short (min 3)"
console.log("Validator:", validateUsername("Ammar"));      // "Valid"
console.log("Validator:", validatePassword("1234"));       // "Too short (min 8)"

// --- 5. Module Pattern (pre-ES6, still seen in UI5) ---
// Uses closure + IIFE to create a module with private/public members.
const UserModule = (function () {
    // Private
    const users = [];

    function findIndex(name) {
        return users.findIndex(u => u.name === name);
    }

    // Public API
    return {
        addUser(name) {
            users.push({ name, createdAt: new Date() });
        },
        removeUser(name) {
            const idx = findIndex(name);
            if (idx !== -1) users.splice(idx, 1);
        },
        getUsers() {
            return [...users]; // return copy to protect private array
        }
    };
})();

UserModule.addUser("Ammar");
UserModule.addUser("Ali");
console.log("\nModule pattern:", UserModule.getUsers());
// console.log(UserModule.users); // undefined — private!

// --- 6. Closure with `this` (UI5 Pitfall) ---
// In UI5, you often need closures inside controller methods.
function Controller() {
    this.data = "Controller Data";

    // Problem: `this` is lost inside callbacks
    this.loadData = function () {
        const self = this; // classic fix: save reference to `this`
        setTimeout(function () {
            console.log("\nself pattern:", self.data); // works!
        }, 300);

        // Modern fix: use arrow function (inherits `this`)
        setTimeout(() => {
            console.log("arrow pattern:", this.data); // works!
        }, 300);
    };
}

const ctrl = new Controller();
ctrl.loadData();

// --- UI5 Connection ---
// Closures are used in UI5 for:
//   - Formatter functions that capture configuration
//   - Event handlers that need access to controller scope
//   - The Module Pattern (sap.ui.define wraps your code in a closure)
//   - Private helper functions inside controllers

// ============================================================
// Run: node advanced-js/closures.js
// ============================================================
