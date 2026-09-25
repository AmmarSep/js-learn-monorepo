# JavaScript Study and Review Guide

**Optional summaries and review material.** Use the [main learning path](../README.md) and [chapter guides](../curriculum/README.md) for your day-to-day study order. The phases below correspond to curriculum chapters 00–06; additional examples and module lessons are linked from those chapters.

---

## How to Use This Guide

1. **Start at Phase 0** and progress sequentially
2. **Read each concept fully** before moving to the next
3. **Try code snippets individually** in the appropriate environment; some demonstrate intentional mistakes or need HTML/API setup
4. **Don't skip concepts** - they build on each other
5. **Experiment** - modify examples to understand how they work

---

## Phase 0: Environment & Execution

**Goal:** Understand where and how JavaScript runs, and how the engine executes your code.

### 📖 Concepts

| # | Concept | File | Time |
|---|---------|------|------|
| 1 | How JavaScript Runs in Browser & Node.js | [Read lesson](../curriculum/00-getting-started/01_how_javascript_runs.md) | 20 min |
| 2 | JavaScript Engine (V8 Conceptually) | [Read lesson](../curriculum/00-getting-started/02_javascript_engine.md) | 25 min |
| 3 | Code Flow: Parse → Compile → Execute | [Run example](../curriculum/00-getting-started/examples/02_engine_demo.js) | 10 min |

### Code to Run

Run from the repository root. The Node.js environment example writes `output.txt`; the browser example replaces the current page body. See [setup and precautions](../curriculum/00-getting-started/README.md).

```bash
# Browser version
# Open a disposable page's DevTools console and try sections from:
# curriculum/00-getting-started/examples/01_browser.js

# Node.js version
node curriculum/00-getting-started/examples/01_node.js
node curriculum/00-getting-started/examples/02_engine_demo.js
```

### Key Takeaways
- JavaScript runs in different environments (browser, Node.js)
- Same language, different APIs
- Engine: Parse → Compile → Execute
- Call stack tracks function execution

---

## Phase 1: Core Fundamentals

**Goal:** Master variables, data types, operators, and control flow.

### 📖 Concepts

| # | Concept | File | Time |
|---|---------|------|------|
| 1 | var, let, const (Scope & Hoisting) | [Read lesson](../curriculum/01-fundamentals/01_var_let_const.md) | 20 min |
| 2 | Data Types (Primitive vs Reference) | [Read lesson](../curriculum/01-fundamentals/02_data_types.md) | 20 min |
| 3 | Operators & Expressions | [Read lesson](../curriculum/01-fundamentals/03_operators_and_expressions.md) | 20 min |
| 4 | Control Flow (if, for, while) | [Read lesson](../curriculum/01-fundamentals/04_control_flow.md) | 20 min |

### Quick Summary

```javascript
// Variables
const x = 5;          // Can't reassign
let y = 10;           // Can reassign, block-scoped
var z = 15;           // Avoid - function scoped

// Data types
let num = 42;         // Primitive (number)
let str = "hello";    // Primitive (string)
let obj = { x: 1 };   // Reference (object)

// Operators
5 + 3 === 8;          // true (strict equality)
if (x > 0) { }        // Control flow

// Loops
for (let i = 0; i < 3; i++) { }
```

### Key Takeaways
- Use `const` by default, `let` when needed, never `var`
- Primitives: number, string, boolean, null, undefined
- References: object, array, function
- Primitives copied by value, references copied by reference
- Always use `===` not `==`

---

## Phase 2: Functions & Scope

**Goal:** Master functions, scope, and closures.

### 📖 Concepts

| # | Concept | File | Time |
|---|---------|------|------|
| 1 | Function Declarations vs Expressions | [Read lesson](../curriculum/02-functions-and-scope/01_function_declarations_vs_expressions.md) | 15 min |
| 2 | Execution Context & Call Stack | [Read lesson](../curriculum/02-functions-and-scope/02_execution_context_and_call_stack.md) | 20 min |
| 3 | Closures (Data Privacy & Patterns) | [Read lesson](../curriculum/02-functions-and-scope/03_closures.md) | 25 min |

### Quick Summary

```javascript
// Function declaration (hoisted)
function add(a, b) {
  return a + b;
}

// Function expression (not hoisted)
const multiply = function(a, b) {
  return a * b;
};

// Arrow function (modern, no 'this')
const divide = (a, b) => a / b;

// Closure example
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

### Key Takeaways
- Function declarations are hoisted, expressions are not
- Arrow functions have different `this` binding
- Execution context contains variables and `this`
- Closures enable data privacy
- Understand the call stack for debugging

---

## Phase 3: Objects, Arrays & Prototypes

**Goal:** Master objects and array methods.

### 📖 Concepts

| # | Concept | File | Time |
|---|---------|------|------|
| 1 | Objects & Property Access | [Read lesson](../curriculum/03-objects-and-arrays/01_objects_and_property_access.md) | 20 min |
| 2 | Arrays & Array Methods | [Read lesson](../curriculum/03-objects-and-arrays/02_arrays_and_array_methods.md) | 30 min |

### Quick Summary

```javascript
// Objects
const person = {
  name: "Alice",
  age: 30,
  greet: function() {
    return "Hello, " + this.name;
  }
};

// Array methods
const numbers = [1, 2, 3, 4, 5];
numbers.map(n => n * 2);           // [2, 4, 6, 8, 10]
numbers.filter(n => n > 2);        // [3, 4, 5]
numbers.reduce((a, b) => a + b);   // 15
```

### Key Takeaways
- Dot notation for known keys, bracket notation for dynamic keys
- Array methods (map, filter, reduce) are powerful
- `this` refers to the object in methods
- Avoid modifying arrays while looping

---

## Phase 4: Asynchronous JavaScript

**Goal:** Master callbacks, Promises, and async/await.

### 📖 Concepts

| # | Concept | File | Time |
|---|---------|------|------|
| 1 | Callbacks & Event Loop | [Read lesson](../curriculum/04-asynchronous-javascript/01_callbacks_and_event_loop.md) | 20 min |
| 2 | Promises | [Read lesson](../curriculum/04-asynchronous-javascript/02_promises.md) | 25 min |
| 3 | async/await | [Read lesson](../curriculum/04-asynchronous-javascript/03_async_await.md) | 20 min |

### Quick Summary

```javascript
// Callbacks
setTimeout(() => console.log("Later"), 1000);

// Promises
Promise.resolve(5)
  .then(x => x * 2)
  .then(x => console.log(x));

// async/await (modern)
async function main() {
  try {
    let data = await fetch("/api/data").then(r => r.json());
    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}
```

### Key Takeaways
- Event loop: Call Stack → Microtask Queue → Task Queue
- Promises avoid "callback hell"
- async/await makes async code look synchronous
- Always handle errors with try/catch or .catch()
- Use Promise.all() to run multiple requests in parallel

---

## Phase 5: DOM & Browser APIs

**Goal:** Master DOM manipulation and browser APIs.

### 📖 Concepts

| # | Concept | File | Time |
|---|---------|------|------|
| 1 | DOM Basics & Selecting Elements | [Read lesson](../curriculum/05-dom-and-browser/01_dom_basics.md) | 20 min |
| 2 | Events & Fetch API | [Read lesson](../curriculum/05-dom-and-browser/02_events_and_fetch.md) | 25 min |

### Quick Summary

```javascript
// Select elements
const elem = document.querySelector("#myId");
const elems = document.querySelectorAll(".myClass");

// Modify content and styles
elem.textContent = "Hello";
elem.classList.add("active");
elem.style.color = "blue";

// Events
elem.addEventListener("click", (e) => {
  console.log("Clicked");
});

// Fetch API
const data = await fetch("/api/users")
  .then(r => r.json());
```

### Key Takeaways
- Use `querySelector` and `querySelectorAll` to select elements
- Modify content with `textContent`, HTML with `innerHTML`
- Use `classList` for class manipulation
- Add event listeners with `addEventListener`
- Use `async/await` with fetch for cleaner code

---

## Phase 6: Code Quality & Debugging

**Goal:** Debug effectively and avoid common pitfalls.

### 📖 Concepts

| # | Concept | File | Time |
|---|---------|------|------|
| 1 | Debugging & Console Methods | [Read lesson](../curriculum/06-modules-and-quality/01_debugging.md) | 15 min |
| 2 | Common Pitfalls | [Read lesson](../curriculum/06-modules-and-quality/02_common_pitfalls.md) | 20 min |

### Quick Summary

```javascript
// Debugging
console.log("Value:", value);
console.table(data);
console.time("operation");
// ... code ...
console.timeEnd("operation");

// Common pitfalls to avoid
5 === "5";           // false (correct)
5 == "5";            // true (wrong, avoid)
[] == true;          // true (confusing)
const x = [1, 2];
const y = [1, 2];
x === y;             // false (compare values not reference)
```

### Key Takeaways
- Use `console.log()`, `console.table()`, breakpoints
- Use DevTools Sources tab to add breakpoints
- Step through code line by line
- Always use `===` not `==`
- Check API response status
- Handle errors with try/catch

---

## Project Ideas by Phase

### After Phase 1
- Simple calculator (add, subtract, multiply, divide)
- Number guessing game
- Temperature converter

### After Phase 2
- Counter with increment/decrement
- Timer or stopwatch
- TODO list with add/remove functions

### After Phase 3
- Contact list (add, edit, delete contacts)
- Student grades tracker
- Personal diary app

### After Phase 4
- Weather app (fetch data from API)
- Quote generator (fetch random quotes)
- TODO app with fetch backend

### After Phase 5
- Multi-page SPA (Single Page Application)
- Interactive dashboard
- Real-time chat interface

### After Phase 6
- Full-stack todo app
- E-commerce product listing
- Social media feed simulator

---

## Best Practices Checklist

### Variables & Scope
- [ ] Use `const` by default
- [ ] Use `let` for variables that change
- [ ] Never use `var`
- [ ] Understand scope and closures

### Functions
- [ ] Use arrow functions for callbacks
- [ ] Use function expressions/declarations for named functions
- [ ] Keep functions small and focused
- [ ] Use meaningful names

### Objects & Arrays
- [ ] Use const for objects/arrays
- [ ] Use array methods (map, filter, reduce) instead of loops
- [ ] Don't mutate when you can create new values
- [ ] Clone objects/arrays when passing to functions

### Async Code
- [ ] Use async/await instead of .then() chains
- [ ] Always handle errors with try/catch
- [ ] Use Promise.all() for parallel operations
- [ ] Don't forget await keyword

### DOM
- [ ] Use querySelector() for selection
- [ ] Use classList for class manipulation
- [ ] Use addEventListener for events
- [ ] Always check if element exists before using

### Debugging
- [ ] Use console.log() to trace execution
- [ ] Use DevTools breakpoints for complex bugs
- [ ] Use console.error() for errors
- [ ] Remove logs before production

### Error Handling
- [ ] Always use try/catch with async code
- [ ] Check API response status
- [ ] Never ignore errors silently
- [ ] Provide helpful error messages

---

## Resources for Further Learning

### Official Documentation
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [JavaScript.info](https://javascript.info/)
- [ECMAScript Standard](https://tc39.es/ecma262/)

### Practice Sites
- [Codewars](https://www.codewars.com/)
- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)

### Browser DevTools
- Chrome/Edge: F12 → Sources/Console tabs
- Firefox: F12 → Debugger/Console tabs
- Safari: Cmd+Option+I → Resources/Console tabs

---

## Tips for Success

1. **Read the code, don't just skim** - Every line matters
2. **Run every example** - See it work with your own eyes
3. **Modify examples** - Change values and observe results
4. **Break things intentionally** - Understand what breaks and why
5. **Write your own code** - Don't just copy-paste
6. **Build projects** - Apply concepts in real applications
7. **Read other code** - Learn from GitHub projects
8. **Ask questions** - Stack Overflow, forums, documentation
9. **Review basics regularly** - Solid foundations matter
10. **Be patient** - Learning takes time, consistency matters

---

## Your Learning Schedule (Suggested)

**Fast Track (2 weeks):**
- Phase 0: 1 day
- Phase 1: 2 days
- Phase 2: 2 days
- Phase 3: 2 days
- Phase 4: 2 days
- Phase 5: 2 days
- Phase 6: 1 day
- Build small projects: 4 days

**Regular Track (4-6 weeks):**
- Phase 0: 2 days
- Phase 1: 4 days
- Phase 2: 4 days
- Phase 3: 4 days
- Phase 4: 4 days
- Phase 5: 4 days
- Phase 6: 2 days
- Build projects: 2 weeks

**Thorough Track (8-12 weeks):**
- Take 1-2 weeks per phase
- Spend extra time on closures (Phase 2.3) and async (Phase 4)
- Build multiple projects after each phase
- Review and refactor previous projects

---

## Assessment: How to Know You're Ready

**After Phase 0:** You can explain where JavaScript runs and how the engine executes code.

**After Phase 1:** You can write loops, conditionals, and use variables correctly.

**After Phase 2:** You can write functions with proper scope and understand closures.

**After Phase 3:** You can work with objects, arrays, and use array methods fluently.

**After Phase 4:** You can write async code using async/await and handle errors.

**After Phase 5:** You can select DOM elements, handle events, and make API requests.

**After Phase 6:** You can debug code and avoid common pitfalls.

---

## Final Words

You've just walked through the **entire foundation** of JavaScript. These concepts aren't just for beginners—professional developers use them daily.

The key differences between junior and senior developers isn't more knowledge—it's **deeper understanding and better instincts**.

**Keep these files handy.** You'll reference them regularly. Concepts that seem complex now will become second nature with practice.

**Now build something.** The best way to learn is to code. Take one of the project ideas and build it. Then build the next one. Each project teaches you something new.

Good luck! 🚀

---

## Quick Navigation

- [Main learning path](../README.md)
- [Curriculum and chapter guides](../curriculum/README.md)
- [Practice](../practice/README.md)
- [Projects](../projects/README.md)
- [Reference shelf](README.md)
- [Optional UI5 track](../tracks/ui5/README.md)

---

**Happy learning! Start with Phase 0 and progress sequentially.**
