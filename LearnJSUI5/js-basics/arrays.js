// ============================================================
// arrays.js — Arrays in JavaScript
// ============================================================
// In Java: int[] arr = {1, 2, 3}; — fixed type, fixed size.
// In JS: arrays are dynamic, can hold mixed types, and have powerful methods.

// --- 1. Creating Arrays ---
const fruits = ["Apple", "Banana", "Cherry"];
const mixed = [1, "hello", true, null, { name: "Ammar" }]; // mixed types allowed!
const empty = [];
console.log("Array:", fruits);
console.log("Mixed:", mixed);

// --- 2. Accessing & Modifying ---
console.log("First:", fruits[0]);       // "Apple"
console.log("Last:", fruits[fruits.length - 1]); // "Cherry"
fruits[1] = "Blueberry";               // modify
console.log("Modified:", fruits);

// --- 3. Common Mutating Methods ---
const numbers = [1, 2, 3];

numbers.push(4);        // add to end (like Java's list.add())
console.log("push:", numbers);

numbers.pop();           // remove from end
console.log("pop:", numbers);

numbers.unshift(0);      // add to beginning
console.log("unshift:", numbers);

numbers.shift();         // remove from beginning
console.log("shift:", numbers);

numbers.splice(1, 1, 99); // at index 1, remove 1 item, insert 99
console.log("splice:", numbers);

// --- 4. Non-Mutating Methods (return new array) ---
const arr = [1, 2, 3, 4, 5];

// slice — extract a portion (like Java's subList)
console.log("slice(1,3):", arr.slice(1, 3)); // [2, 3]

// concat — merge arrays
console.log("concat:", arr.concat([6, 7]));

// spread — modern way to merge (preferred)
console.log("spread:", [...arr, 6, 7]);

// --- 5. Iteration Methods (Essential for UI5!) ---
const prices = [10, 20, 30, 40, 50];

// forEach — loop through (like Java's for-each)
console.log("\nforEach:");
prices.forEach((price, index) => {
    console.log(`  [${index}] $${price}`);
});

// map — transform each element, return new array (like Java Stream .map())
const doubled = prices.map(p => p * 2);
console.log("map (doubled):", doubled);

// filter — keep elements that match condition (like Java Stream .filter())
const expensive = prices.filter(p => p > 25);
console.log("filter (>25):", expensive);

// find — get first match (like Java Stream .findFirst())
const found = prices.find(p => p > 25);
console.log("find (>25):", found); // 30

// findIndex — get index of first match
console.log("findIndex (>25):", prices.findIndex(p => p > 25)); // 2

// some — does any element match? (like Java Stream .anyMatch())
console.log("some (>100):", prices.some(p => p > 100)); // false

// every — do all elements match? (like Java Stream .allMatch())
console.log("every (>0):", prices.every(p => p > 0)); // true

// reduce — accumulate to single value (like Java Stream .reduce())
const total = prices.reduce((sum, price) => sum + price, 0);
console.log("reduce (total):", total); // 150

// --- 6. Chaining Methods (like Java Streams) ---
// Common pattern in UI5: filter → map → forEach
const products = [
    { name: "Laptop", price: 1200, inStock: true },
    { name: "Mouse", price: 25, inStock: true },
    { name: "Keyboard", price: 75, inStock: false },
    { name: "Monitor", price: 400, inStock: true }
];

const availableExpensive = products
    .filter(p => p.inStock)          // only in-stock
    .filter(p => p.price > 50)       // only expensive
    .map(p => p.name);               // extract names

console.log("\nChained:", availableExpensive); // ["Laptop", "Monitor"]

// --- 7. Sorting ---
const unsorted = [3, 1, 4, 1, 5, 9];
// WARNING: sort() without a comparator sorts as strings!
console.log("Default sort:", [...unsorted].sort()); // [1, 1, 3, 4, 5, 9] (works here, but)
console.log("String sort bug:", [10, 9, 80].sort()); // [10, 80, 9] — wrong!

// Always provide a comparator for numbers:
console.log("Correct sort:", [10, 9, 80].sort((a, b) => a - b)); // [9, 10, 80]

// Sort objects (like Java's Comparator):
const sortedProducts = [...products].sort((a, b) => a.price - b.price);
console.log("Sorted products:", sortedProducts.map(p => `${p.name}: $${p.price}`));

// --- 8. Destructuring Arrays ---
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log("\nDestructured:", first, second); // 10, 20
console.log("Rest:", rest);                    // [30, 40, 50]

// Swap variables (no temp needed!):
let a = 1, b = 2;
[a, b] = [b, a];
console.log("Swapped:", a, b); // 2, 1

// --- 9. Checking if Array ---
console.log("\nisArray:", Array.isArray([1, 2]));    // true
console.log("isArray:", Array.isArray("hello"));     // false
// typeof [] returns "object", so use Array.isArray() instead.

// --- 10. includes / indexOf ---
const colors = ["red", "green", "blue"];
console.log("includes:", colors.includes("green")); // true (like Java's contains())
console.log("indexOf:", colors.indexOf("blue"));     // 2 (like Java's indexOf())

// --- UI5 Connection ---
// Arrays are used everywhere in UI5:
//   - OData results come as arrays of objects
//   - List/Table bindings iterate over arrays
//   - filter() and map() are key for data transformation
//   - JSONModel data is typically { results: [...] }

// ============================================================
// Run: node js-basics/arrays.js
// ============================================================
