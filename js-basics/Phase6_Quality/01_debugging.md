# Phase 6, Concept 1: Debugging and Console Methods

## Why This Matters

Debugging is how you find and fix bugs. Every developer spends time debugging.

Understanding debugging is critical because:
- You'll spend more time debugging than writing code
- Good debugging skills save hours of frustration
- Different tools are available for different situations
- Logging helps understand code flow

---

## Console Methods

### console.log()

The most basic method—prints values:

```javascript
console.log("Hello");
console.log(42);
console.log({ name: "Alice", age: 30 });
console.log([1, 2, 3]);
```

### console.error()

Print error messages (often red in DevTools):

```javascript
try {
  riskyOperation();
} catch (error) {
  console.error("Operation failed:", error);
}
```

### console.warn()

Print warnings (often yellow in DevTools):

```javascript
if (userInput.length > 100) {
  console.warn("Input is very long");
}
```

### console.info() and console.debug()

```javascript
console.info("Information: server connected");
console.debug("Debug: variable x =", x);
```

### console.table()

Display data as a table (great for arrays of objects):

```javascript
let users = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 35 }
];

console.table(users);
// Displays as a nice table in DevTools
```

### console.group()

Group related log messages:

```javascript
console.group("User Info");
console.log("Name: Alice");
console.log("Age: 30");
console.log("Email: alice@example.com");
console.groupEnd();

// Displays grouped and collapsible in DevTools
```

### console.time()

Measure how long code takes:

```javascript
console.time("MyTimer");

// Some code...
let sum = 0;
for (let i = 0; i < 1000000; i++) {
  sum += i;
}

console.timeEnd("MyTimer");
// Output: MyTimer: 5.25ms
```

### console.assert()

Only log if condition is false:

```javascript
let x = 5;
console.assert(x > 0, "x should be positive");  // No output
console.assert(x < 0, "x should be negative");  // Logs error
```

### console.trace()

Show the call stack (shows where code was called from):

```javascript
function a() {
  b();
}

function b() {
  console.trace("Call stack:");
}

a();
// Shows: b() was called from a() was called from global scope
```

---

## DevTools Debugging

### Breakpoints

In Chrome DevTools:
1. Open DevTools (F12)
2. Go to **Sources** tab
3. Click on line number to add a breakpoint
4. Code stops at that line when it runs
5. Use Step buttons to run line by line

### Conditional Breakpoints

Right-click on line number, add a condition:

```javascript
// Breakpoint only if i === 5
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

### Watch Expressions

In DevTools, add a "watch" to track variable changes:

```javascript
let x = 0;
for (let i = 0; i < 100; i++) {
  x += i;  // Watch 'x' to see it change
}
```

### Call Stack Inspection

When code is paused at a breakpoint, the Call Stack pane shows:
- Which functions are running
- What line each function is on
- Local variables in each scope

---

## Common Debugging Patterns

### Debugging Variables

```javascript
let data = fetchData();
console.log("data type:", typeof data);
console.log("data value:", data);
console.log("data keys:", Object.keys(data));
```

### Debugging Functions

```javascript
function processUser(user) {
  console.log("Input:", user);

  let result = user.name.toUpperCase();
  console.log("Processed:", result);

  return result;
}

processUser({ name: "alice" });
```

### Debugging Loops

```javascript
let numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index) => {
  console.log(`[${index}] = ${num}`);

  if (num === 3) {
    console.log("Found target!");
  }
});
```

### Debugging Async Code

```javascript
async function fetchData() {
  console.time("fetch");

  try {
    let response = await fetch("/api/data");
    console.log("Response status:", response.status);

    let data = await response.json();
    console.log("Data received:", data);

    console.timeEnd("fetch");
    return data;

  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
```

---

## Code Example: Debugging Techniques

```javascript
// ========================================
// DEBUGGING DEMONSTRATION
// ========================================

console.log("=== BASIC LOGGING ===\n");

let user = { name: "Alice", age: 30 };
console.log("User:", user);
console.log(user);

console.log("\n=== LOGGING TYPES ===\n");

console.info("Information: App started");
console.warn("Warning: Deprecated API");
console.error("Error: Failed to load data");
console.debug("Debug: x = 42");

console.log("\n=== CONSOLE.TABLE ===\n");

let users = [
  { name: "Alice", age: 30, role: "admin" },
  { name: "Bob", age: 25, role: "user" },
  { name: "Charlie", age: 35, role: "user" }
];

console.table(users);

console.log("\n=== CONSOLE.TIME ===\n");

console.time("loop");
for (let i = 0; i < 1000000; i++) {
  let x = Math.sqrt(i);
}
console.timeEnd("loop");

console.log("\n=== CONSOLE.GROUP ===\n");

console.group("Data Processing");
console.log("Step 1: Fetch data");
console.log("Step 2: Parse data");
console.log("Step 3: Display data");
console.groupEnd();

console.log("\n=== CONSOLE.ASSERT ===\n");

let value = 10;
console.assert(value > 0, "Value should be positive");
console.assert(value < 100, "Value should be less than 100");
console.assert(value > 100, "Value should be greater than 100");

console.log("\n=== CONSOLE.TRACE ===\n");

function level1() {
  level2();
}

function level2() {
  level3();
}

function level3() {
  console.trace("Call stack trace");
}

level1();
```

---

## Debugging Checklist

When your code doesn't work:

1. **Verify the code runs**
   - Add `console.log()` at the start
   - Check for JavaScript errors in DevTools console

2. **Check variable values**
   - Log variables before and after operations
   - Check data types with `typeof`

3. **Verify function calls**
   - Log when functions start and end
   - Check if functions are actually being called

4. **Check event listeners**
   - Log when events fire
   - Verify event listeners are attached

5. **Verify API/Fetch**
   - Check Network tab in DevTools
   - Log the response status and data

6. **Use breakpoints**
   - Pause code execution at specific lines
   - Step through line by line
   - Watch variables change

---

## Common Mistakes

### Mistake 1: Forgetting console.log is asynchronous

```javascript
// In some browsers, objects logged may show their later state
let obj = { x: 1 };
console.log(obj);
obj.x = 2;
// In some DevTools, console.log might show x: 2
// Best practice: Log explicitly what you want
console.log("x value:", obj.x);
```

### Mistake 2: Logging in loops (performance hit)

```javascript
// ❌ SLOW: Logs 1000000 times
for (let i = 0; i < 1000000; i++) {
  console.log(i);
}

// ✅ BETTER: Sample logging
for (let i = 0; i < 1000000; i++) {
  if (i % 100000 === 0) {
    console.log("Progress:", i);
  }
}
```

### Mistake 3: Leaving console logs in production

```javascript
// ❌ WRONG: Don't leave debug logs in production code
console.log("DEBUG: Processing user", user);

// ✅ CORRECT: Remove logs or use a logging level
if (DEBUG_MODE) {
  console.log("DEBUG: Processing user", user);
}
```

### Mistake 4: Not using console.error for errors

```javascript
// ❌ WRONG: Uses regular log for errors
console.log("Error: invalid input");

// ✅ CORRECT: Use console.error for errors
console.error("Error: invalid input");

// Errors show in red and are easier to spot
```

---

## Next Steps

1. Use console.log to understand code flow
2. Use console.table for objects and arrays
3. Use breakpoints in DevTools
4. Step through code line by line
5. Move to: **02_common_pitfalls.md**
