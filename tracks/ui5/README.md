# Optional track — JavaScript for UI5

Use this track after the [core curriculum](../../curriculum/README.md), especially `this`, prototypes, async code, and modules. If your goal is general JavaScript, you can skip it.

These are **self-contained Node.js simulations** of UI5-style concepts, not real SAP UI5 controls or browser applications. They do not require a UI5 SDK, backend, or package installation. Service examples simulate requests; they do not connect to an SAP system.

## Read and run, in order

| Order | Example | Focus |
| --- | --- | --- |
| 1 | [Modularization](examples/modularization.js) | ES modules compared with a simulated `sap.ui.define` loader |
| 2 | [MVC pattern](examples/mvc-pattern.js) | Separate data, display, and controller responsibilities |
| 3 | [Event handling](examples/event-handling.js) | Observer pattern and attach/fire events |
| 4 | [Data binding](examples/data-binding-concepts.js) | One-way, two-way, aggregation, and formatters |
| 5 | [API calls](examples/api-calls.js) | CRUD and OData-style service wrappers |
| 6 | [UI5-style console project](../../projects/ui5-style/simple-ui5-like-app.js) | Put the concepts together |

From the **repository root**:

```bash
node tracks/ui5/examples/modularization.js
node tracks/ui5/examples/mvc-pattern.js
node tracks/ui5/examples/event-handling.js
node tracks/ui5/examples/data-binding-concepts.js
node tracks/ui5/examples/api-calls.js
npm run demo:ui5
```

## Checkpoint

- [ ] Trace an event from a view to a controller and a model update.
- [ ] Explain one-way versus two-way binding.
- [ ] Separate service calls from display logic.
- [ ] Explain which parts are educational simulations rather than actual UI5 APIs.

The original general-JavaScript examples now sit beside their matching topics in the [curriculum](../../curriculum/README.md). The Java comparisons below are supplemental notes, not prerequisites.

[Learning path](../../README.md) · [Project guide](../../projects/README.md)

## ⚠️ Common Mistakes for Java Developers in JavaScript

### 1. `this` is NOT the same as in Java
```javascript
// Java: `this` always refers to the current object instance
// JS: `this` depends on HOW the function is called

const obj = {
    name: "App",
    greet() { console.log(this.name); }
};

const fn = obj.greet;
fn();      // undefined! `this` is lost
obj.greet(); // "App" — works because called as method

// Fix: use .bind(this), arrow functions, or `var that = this`
```

### 2. `==` vs `===` (Loose vs Strict Equality)
```javascript
// Java: == compares values (primitives) or references (objects)
// JS: == does type coercion, === does not

"5" == 5    // true  (coercion!) — DANGEROUS
"5" === 5   // false (no coercion) — SAFE

// RULE: Always use === and !== in JavaScript
```

### 3. No Real Classes (Prototypes Under the Hood)
```javascript
// Java: classes are blueprints, real compile-time types
// JS: `class` is syntactic sugar over prototype-based inheritance

class Dog extends Animal { }
// Under the hood: Dog.prototype = Object.create(Animal.prototype)

// UI5 doesn't use ES6 classes — it uses Controller.extend("...", { })
```

### 4. Variables Without Types
```javascript
// Java: int x = 5; String name = "Ali";
// JS: let x = 5; let name = "Ali";

let x = 5;
x = "now a string"; // No error! Type can change at runtime
x = { key: "now an object" }; // Still no error
```

### 5. `null` and `undefined` Are Different
```javascript
// Java: only null exists
// JS: null (intentional empty) vs undefined (not assigned)

let a;           // undefined — declared but no value
let b = null;    // null — intentionally empty
typeof a         // "undefined"
typeof b         // "object" (famous bug!)
```

### 6. Array/Object Comparison Doesn't Work Like Java
```javascript
// Java: Arrays.equals(a, b) or Objects.equals(a, b)
// JS: == compares references, not content

[1, 2, 3] === [1, 2, 3]  // false! Different objects in memory
{ a: 1 } === { a: 1 }    // false!

// Fix: JSON.stringify(a) === JSON.stringify(b) (simple)
// or use a deep-equal library
```

### 7. `for...in` vs `for...of`
```javascript
// Java: for (int x : array) — iterates values
// JS has two different loop types:

const arr = [10, 20, 30];
for (let x in arr)  console.log(x);  // "0", "1", "2" — INDICES (strings!)
for (let x of arr)  console.log(x);  // 10, 20, 30 — VALUES ✓

// RULE: Use for...of for arrays, for...in for object keys
```

### 8. Functions Are Values (First-Class Citizens)
```javascript
// Java: methods belong to classes
// JS: functions can be stored in variables, passed around, returned

const greet = function(name) { return "Hi " + name; };
const operations = [greet, (n) => n.toUpperCase()];
operations[0]("Ammar"); // "Hi Ammar"

// This is why callbacks and event handlers work in UI5
```

### 9. No Method Overloading
```javascript
// Java: void print(int x) { } void print(String x) { }
// JS: last definition wins, extra args are ignored

function greet(name) { return "Hello " + name; }
function greet(name, title) { return title + " " + name; } // overwrites!

greet("Ammar"); // "undefined Ammar" — title is undefined

// Fix: use default parameters or check arguments
function greet(name, title = "Mr.") { return title + " " + name; }
```

### 10. Async by Default
```javascript
// Java: code runs top-to-bottom (synchronous by default)
// JS: many operations are asynchronous (setTimeout, fetch, file I/O)

console.log("1");
setTimeout(() => console.log("2"), 0);  // async — goes to queue
console.log("3");
// Output: 1, 3, 2  — NOT 1, 2, 3!

// Fix: use async/await or Promises to control execution order
```
