// ============================================================
// objects.js — Objects in JavaScript
// ============================================================
// In Java, you need a class to create an object.
// In JS, objects can be created on the fly (object literals).
// Objects are the foundation of everything in JS — and in UI5.

// --- 1. Object Literal (most common way) ---
const person = {
    firstName: "Ammar",
    lastName: "S",
    age: 25,
    isActive: true
};
console.log("Object literal:", person);

// --- 2. Accessing Properties ---
// Dot notation (like Java):
console.log("Dot notation:", person.firstName);

// Bracket notation (like Java's Map.get("key")):
console.log("Bracket notation:", person["lastName"]);

// Bracket notation is needed when the key is dynamic:
const key = "age";
console.log("Dynamic key:", person[key]);

// --- 3. Adding / Modifying / Deleting Properties ---
// In Java, object structure is fixed by the class. In JS, it's flexible!
person.email = "ammar@example.com"; // add new property
person.age = 26;                     // modify existing
delete person.isActive;              // remove property
console.log("Modified:", person);

// --- 4. Methods (functions inside objects) ---
const calculator = {
    // Method shorthand (modern, preferred in UI5):
    add(a, b) {
        return a + b;
    },
    // Traditional way:
    subtract: function (a, b) {
        return a - b;
    }
};
console.log("Method:", calculator.add(10, 5));
console.log("Method:", calculator.subtract(10, 5));

// --- 5. `this` inside methods ---
// `this` refers to the object the method is called on (like Java's `this`).
const user = {
    name: "Ammar",
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};
console.log("this:", user.greet());

// --- 6. Nested Objects ---
// Very common in UI5 data models.
const order = {
    id: "ORD-001",
    customer: {
        name: "Ali",
        address: {
            city: "Riyadh",
            country: "Saudi Arabia"
        }
    },
    items: ["Laptop", "Mouse"]
};
console.log("Nested:", order.customer.address.city);

// --- 7. Destructuring (ES6 — heavily used in modern UI5) ---
// Like unpacking — extract properties into variables.
const { firstName, lastName, age } = person;
console.log("Destructured:", firstName, lastName, age);

// Nested destructuring:
const { customer: { address: { city } } } = order;
console.log("Nested destructure:", city);

// Renaming during destructuring:
const { firstName: fName } = person;
console.log("Renamed:", fName);

// --- 8. Spread Operator (...) — Copy / Merge objects ---
const defaults = { theme: "sap_fiori_3", language: "en" };
const userSettings = { language: "ar", fontSize: 14 };
const merged = { ...defaults, ...userSettings }; // userSettings overrides
console.log("Spread merge:", merged);

// Shallow copy:
const copy = { ...person };
copy.firstName = "Changed";
console.log("Original:", person.firstName); // unchanged
console.log("Copy:", copy.firstName);

// --- 9. Object.keys(), Object.values(), Object.entries() ---
// Useful for iterating objects (JS has no Map.entrySet() like Java).
console.log("Keys:", Object.keys(person));
console.log("Values:", Object.values(person));
console.log("Entries:", Object.entries(person));

// Iterating:
Object.entries(person).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
});

// --- 10. Optional Chaining (?.) — Safe navigation ---
// Like Java's Optional or null checks, but built into the syntax.
const data = { response: { results: [{ name: "Item1" }] } };
console.log("Optional chain:", data?.response?.results?.[0]?.name); // "Item1"
console.log("Optional chain:", data?.missing?.property); // undefined (no error!)

// --- 11. Object.freeze() and Object.seal() ---
const config = Object.freeze({ apiUrl: "/api/v1", timeout: 3000 });
config.apiUrl = "/changed"; // silently fails (or throws in strict mode)
console.log("Frozen:", config.apiUrl); // still "/api/v1"

// --- UI5 Connection ---
// UI5 controllers, models, and views are all objects with methods.
// Understanding object creation, `this`, and destructuring is essential.
// Example UI5 pattern:
//   return Controller.extend("my.app.controller.Main", {
//       onInit: function() { this.getView(); },
//       onPress: function(oEvent) { ... }
//   });

// ============================================================
// Run: node js-basics/objects.js
// ============================================================
