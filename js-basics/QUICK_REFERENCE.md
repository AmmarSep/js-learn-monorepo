# JavaScript Quick Reference Guide

**A cheat sheet for all the core concepts from the curriculum.**

---

## Variables

```javascript
const x = 5;       // Use this by default (can't reassign)
let y = 10;        // Use when you need to reassign
var z = 15;        // Never use (function scoped)

// Scope
const global = 1;  // Accessible everywhere
if (true) {
  const block = 2;  // Only inside { }
}
```

---

## Data Types

```javascript
// Primitives (copied by value)
let num = 42;
let str = "hello";
let bool = true;
let undef = undefined;
let nil = null;

// References (copied by reference)
let obj = { x: 1 };
let arr = [1, 2, 3];
let func = function() { };
```

---

## Operators

```javascript
// Arithmetic
5 + 3   // 8
5 - 3   // 2
5 * 3   // 15
5 / 3   // 1.666...
5 % 3   // 2 (remainder)
2 ** 3  // 8 (power)

// Comparison (always use ===)
5 === 5       // true
5 === "5"     // false
5 > 3         // true
5 >= 5        // true

// Logical
true && false     // false
true || false     // true
!true             // false

// Assignment
x = 5;   x += 3;  x -= 2;  x *= 2;  x /= 2;  x++;  x--;

// Ternary
let status = age >= 18 ? "adult" : "minor";
```

---

## Control Flow

```javascript
// if/else
if (x > 0) {
  // ...
} else if (x < 0) {
  // ...
} else {
  // ...
}

// switch
switch (value) {
  case 1:
    // ...
    break;
  default:
    // ...
}

// for loop
for (let i = 0; i < 10; i++) { }

// while loop
while (condition) { }

// for...of (arrays)
for (let item of array) { }

// for...in (objects)
for (let key in object) { }

// break and continue
break;      // Exit loop
continue;   // Skip to next iteration
```

---

## Functions

```javascript
// Declaration (hoisted)
function add(a, b) {
  return a + b;
}

// Expression (not hoisted)
const multiply = function(a, b) {
  return a * b;
};

// Arrow function (modern)
const divide = (a, b) => a / b;
const square = x => x * x;
const random = () => Math.random();

// Call
add(5, 3);        // 8
add();            // NaN (missing arguments)

// Default parameters
function greet(name = "Guest") {
  return "Hello, " + name;
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
```

---

## Objects

```javascript
// Create
const person = {
  name: "Alice",
  age: 30,
  greet: function() {
    return "Hello";
  }
};

// Access
person.name          // "Alice" (dot notation)
person["age"]        // 30 (bracket notation)
person.greet()       // "Hello"

// Modify
person.name = "Bob";
person.city = "NYC";  // Add property

// Delete
delete person.city;

// Check existence
"name" in person              // true
person.hasOwnProperty("name") // true

// Iterate
Object.keys(person)      // ["name", "age", "greet"]
Object.values(person)    // ["Alice", 30, ...]
Object.entries(person)   // [["name", "Alice"], ...]

for (let key in person) {
  console.log(key, person[key]);
}
```

---

## Arrays

```javascript
// Create
const arr = [1, 2, 3];
const empty = [];
const mixed = [1, "hello", true];

// Access and modify
arr[0]           // 1
arr[0] = 10;     // Change element
arr.length       // 3
arr.push(4);     // Add to end
arr.pop();       // Remove from end
arr.shift();     // Remove from start
arr.unshift(0);  // Add to start

// Methods (return new array)
arr.map(x => x * 2)           // Transform
arr.filter(x => x > 2)        // Select
arr.reduce((a, b) => a + b)   // Combine

// Search
arr.indexOf(2)          // 1
arr.includes(2)         // true
arr.find(x => x > 2)    // 3

// Other
arr.join(",")           // "1,2,3"
arr.slice(1, 3)         // [2, 3]
arr.reverse()           // [3, 2, 1]
arr.sort()              // Sorted array
arr.forEach(x => { })   // Iterate
```

---

## this Keyword

```javascript
// In method: this is the object
const user = {
  name: "Alice",
  greet: function() {
    console.log(this.name);  // "Alice"
  }
};

// In function: this is global
function test() {
  console.log(this);  // window (browser) or global (Node)
}

// In arrow function: this is outer scope
const obj = {
  name: "Alice",
  greet: () => {
    console.log(this.name);  // undefined
  }
};

// In constructor: this is new object
function Person(name) {
  this.name = name;
}
const p = new Person("Alice");
```

---

## Closures

```javascript
// Function returns function
function makeAdder(x) {
  return function(y) {
    return x + y;  // Closure: x is captured
  };
}

const add5 = makeAdder(5);
add5(3);  // 8

// Counter pattern
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}
```

---

## Async/Await

```javascript
// Promise
Promise.resolve(5)
  .then(x => x * 2)
  .then(x => console.log(x))
  .catch(error => console.log("Error"));

// async/await
async function fetchUser() {
  try {
    let response = await fetch("/api/user");
    if (!response.ok) throw new Error("Failed");
    let user = await response.json();
    return user;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

// Run
let user = await fetchUser();

// Parallel
let [user, posts] = await Promise.all([
  fetch("/api/user").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);
```

---

## Events

```javascript
// Add listener
elem.addEventListener("click", function(event) {
  console.log(event.type);     // "click"
  console.log(event.target);   // The element
  event.preventDefault();      // Stop default action
});

// Remove listener
elem.removeEventListener("click", handler);

// Common events
"click"       // Mouse clicked
"change"      // Form input changed
"submit"      // Form submitted
"keydown"     // Key pressed
"input"       // User typing
"mouseover"   // Mouse over element
"mouseout"    // Mouse left element
```

---

## DOM

```javascript
// Select
document.querySelector("#id")           // First match
document.querySelectorAll(".class")     // All matches
document.getElementById("id")           // By ID
document.getElementsByClassName("class") // By class

// Content
elem.textContent = "text"      // Just text
elem.innerHTML = "<p>html</p>" // HTML string
elem.innerText                 // Visible text

// Attributes
elem.setAttribute("attr", "value")
elem.getAttribute("attr")
elem.removeAttribute("attr")
elem.hasAttribute("attr")

// Classes
elem.classList.add("active")
elem.classList.remove("active")
elem.classList.toggle("active")
elem.classList.contains("active")

// Styles
elem.style.color = "blue"
elem.style.backgroundColor = "red"
elem.style.fontSize = "16px"

// Create and add
const div = document.createElement("div")
div.textContent = "Hello"
document.body.appendChild(div)

// Navigate
elem.parentElement
elem.children
elem.firstElementChild
elem.lastElementChild
elem.nextElementSibling
elem.previousElementSibling

// Remove
elem.remove()
parent.removeChild(elem)
```

---

## Fetch API

```javascript
// GET
fetch("/api/users")
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))

// POST
fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" })
})
  .then(r => r.json())
  .then(data => console.log(data))

// async/await
async function getUsers() {
  let response = await fetch("/api/users")
  if (!response.ok) throw new Error("Failed")
  return await response.json()
}
```

---

## Console Methods

```javascript
console.log("message")           // Log
console.error("error")           // Error (red)
console.warn("warning")          // Warning (yellow)
console.table(data)              // Display as table
console.time("label")            // Start timer
console.timeEnd("label")         // End timer
console.group("title")           // Group logs
console.groupEnd()               // End group
console.assert(condition, msg)   // Assert
console.trace()                  // Show call stack
```

---

## String Methods

```javascript
const str = "hello world"

str.length           // 11
str.toUpperCase()    // "HELLO WORLD"
str.toLowerCase()    // "hello world"
str.includes("world") // true
str.indexOf("world") // 6
str.slice(0, 5)      // "hello"
str.substring(0, 5)  // "hello"
str.split(" ")       // ["hello", "world"]
str.replace("world", "there") // "hello there"
str.trim()           // Remove whitespace
str.repeat(2)        // "hello worldhello world"
str.startsWith("h")  // true
str.endsWith("d")    // true

// Template strings
const name = "Alice"
const msg = `Hello, ${name}!`  // "Hello, Alice!"
```

---

## Number Methods

```javascript
const num = 42.7

Number.isInteger(num)   // false
Number.isNaN(NaN)       // true
Number.isFinite(num)    // true

num.toFixed(1)          // "42.7"
num.toString()          // "42.7"
parseInt("42")          // 42
parseFloat("42.7")      // 42.7

Math.round(42.7)        // 43
Math.floor(42.7)        // 42
Math.ceil(42.3)         // 43
Math.abs(-5)            // 5
Math.max(1, 2, 3)       // 3
Math.min(1, 2, 3)       // 1
Math.random()           // 0 - 1
Math.sqrt(16)           // 4
Math.pow(2, 3)          // 8
```

---

## Common Patterns

```javascript
// Default value
const name = userInput || "Guest"

// Swap values
[a, b] = [b, a]

// Deep copy
const copy = JSON.parse(JSON.stringify(obj))

// Check if value exists
if (value !== undefined && value !== null) { }
if (value != null) { }  // Shorter version

// Wait for condition
while (!condition) { }

// Execute function multiple times
for (let i = 0; i < 3; i++) {
  doSomething()
}

// Get unique values
const unique = [...new Set(array)]

// Flatten array
const flat = array.flat()

// Empty array
array = []
array.length = 0
array.splice(0)
```

---

## Debugging Checklist

- [ ] Check browser console for errors (F12)
- [ ] Use `console.log()` to trace execution
- [ ] Use breakpoints in DevTools (Sources tab)
- [ ] Step through code line by line
- [ ] Check variable values at each step
- [ ] Watch the call stack
- [ ] Use `console.table()` for complex data
- [ ] Use `console.time()` for performance
- [ ] Check API responses in Network tab
- [ ] Verify HTML structure with Inspector

---

## Common Mistakes to Avoid

| Mistake | Wrong | Right |
|---------|-------|-------|
| Equality | `x == y` | `x === y` |
| Scope | `var x = 1` | `const x = 1` |
| Array access | `arr[index]++` | `arr[index] = arr[index] + 1` |
| Object compare | `obj1 === obj2` | Compare values, not reference |
| Async | `let data = fetch(...)` | `let data = await fetch(...)` |
| Events | No `preventDefault()` | Add `event.preventDefault()` |
| DOM | Check before using | `if (elem) { ... }` |
| Closure | Not returning function | Return the function |
| this | Arrow in method | Use regular function |
| Truthy | `if ([])` | `if ([].length > 0)` |

---

## File Size

Use this as a quick reference, but **refer back to the full lessons** for deep understanding. Each concept in the curriculum builds on the others.

---

## Remember

1. **const first** - Use const by default
2. **Understand scope** - Know where variables exist
3. **Use ===** - Always strict equality
4. **Handle errors** - try/catch with async
5. **Check responses** - Verify API status
6. **Prevent default** - When handling events
7. **Debug effectively** - Use console and DevTools
8. **Read documentation** - MDN is your friend
9. **Build projects** - Apply what you learn
10. **Keep learning** - JavaScript is always evolving

---

**For full explanations and examples, refer to the detailed lessons in each phase directory.**
