# Phase 4, Concept 3: async/await

## Why This Matters

`async/await` is **syntactic sugar** over Promises that makes asynchronous code look synchronous.

Understanding async/await is critical because:
- It's the modern way to write async code (instead of `.then()` chains)
- Most modern JavaScript code uses async/await
- It makes code more readable and easier to debug
- Error handling is simpler with try/catch
- It's still built on Promises underneath

---

## What Is async/await?

`async/await` provides two keywords:
- **`async`**: Marks a function as asynchronous
- **`await`**: Pauses execution until a Promise resolves

### Before async/await (Promise chains):

```javascript
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json())
    .then(data => data);
}

fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.log("Error:", error));
```

### After async/await (looks synchronous):

```javascript
async function fetchUser(id) {
  let response = await fetch(`/api/users/${id}`);
  let data = await response.json();
  return data;
}

// No need for .then(), looks like regular code!
let user = await fetchUser(1);
console.log(user);
```

---

## async Functions

An `async` function always returns a **Promise**:

```javascript
async function greet() {
  return "Hello";
}

greet();  // Returns a Promise
greet().then(msg => console.log(msg));  // "Hello"
```

Even if you return a simple value, it's wrapped in a Promise:

```javascript
async function getNumber() {
  return 42;
}

let result = await getNumber();
console.log(result);  // 42 (the Promise is automatically unwrapped)
```

---

## await Keyword

`await` pauses execution until a Promise resolves:

```javascript
async function demo() {
  console.log("Before");

  let value = await Promise.resolve(5);  // Wait here
  console.log("Value:", value);  // Runs after Promise resolves

  console.log("After");
}

demo();

// Output:
// Before
// Value: 5
// After
```

**Important**: `await` can only be used inside an `async` function.

---

## async/await with Delays

```javascript
async function delayedGreeting() {
  console.log("Waiting...");

  // Create a Promise that resolves after 2 seconds
  await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  console.log("Done waiting!");
}

delayedGreeting();

// Output:
// Waiting...
// (wait 2 seconds)
// Done waiting!
```

---

## Error Handling: try/catch

With async/await, use `try/catch` instead of `.catch()`:

```javascript
async function fetchData() {
  try {
    let response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error("API error");
    }

    let data = await response.json();
    return data;

  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
}

// Usage
let data = await fetchData();
```

---

## Chaining Async Operations

```javascript
async function getUser() {
  let response = await fetch("/api/user/1");
  return response.json();
}

async function getPosts(userId) {
  let response = await fetch(`/api/posts/${userId}`);
  return response.json();
}

async function main() {
  try {
    let user = await getUser();
    console.log("User:", user.name);

    let posts = await getPosts(user.id);
    console.log("Posts:", posts.length);

  } catch (error) {
    console.log("Error:", error);
  }
}

main();
```

---

## Parallel async Operations

Running multiple async operations in parallel (not sequential):

```javascript
async function fetchMultiple() {
  // ❌ SLOW: Sequential (waits for each one)
  let user = await getUser();
  let posts = await getPosts(user.id);
  let comments = await getComments();
  // Total time: sum of all requests

  // ✅ FAST: Parallel (all at once)
  let [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(1),
    getComments()
  ]);
  // Total time: longest request only
}
```

---

## Comparison: Promises vs async/await

### Promise Chains:
```javascript
function fetchUser() {
  return fetch("/api/user")
    .then(r => r.json())
    .then(user => {
      console.log(user);
      return fetch(`/api/posts/${user.id}`);
    })
    .then(r => r.json())
    .then(posts => console.log(posts))
    .catch(error => console.log("Error:", error));
}
```

### async/await:
```javascript
async function fetchUser() {
  try {
    let user = await fetch("/api/user").then(r => r.json());
    console.log(user);

    let posts = await fetch(`/api/posts/${user.id}`).then(r => r.json());
    console.log(posts);

  } catch (error) {
    console.log("Error:", error);
  }
}
```

The async/await version is much more readable!

---

## Code Example: async/await in Action

```javascript
// ========================================
// ASYNC/AWAIT DEMONSTRATION
// ========================================

console.log("=== BASIC ASYNC FUNCTION ===\n");

async function greet(name) {
  return "Hello, " + name;
}

greet("Alice").then(msg => console.log(msg));
// Hello, Alice

console.log("\n=== AWAIT WITH DELAY ===\n");

async function delayedTask() {
  console.log("Starting task...");

  await new Promise(resolve => {
    setTimeout(() => resolve(), 2000);
  });

  console.log("Task completed!");
}

delayedTask();

console.log("\n=== ERROR HANDLING ===\n");

async function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
}

safeDivide(10, 2).then(result => console.log("Result:", result));
safeDivide(10, 0).then(result => console.log("Result:", result));

console.log("\n=== CHAINING OPERATIONS ===\n");

async function getUserInfo(id) {
  // Simulate API calls
  let user = await new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: id, name: "Alice" });
    }, 500);
  });

  let posts = await new Promise(resolve => {
    setTimeout(() => {
      resolve([{ id: 1, title: "Post 1" }]);
    }, 500);
  });

  return { user, posts };
}

async function main() {
  try {
    let result = await getUserInfo(1);
    console.log("User:", result.user.name);
    console.log("Posts:", result.posts.length);
  } catch (error) {
    console.log("Error:", error);
  }
}

main();

console.log("\n=== PARALLEL OPERATIONS ===\n");

async function parallelTasks() {
  // Run all at once
  let [result1, result2, result3] = await Promise.all([
    new Promise(resolve => setTimeout(() => resolve("Task 1"), 1000)),
    new Promise(resolve => setTimeout(() => resolve("Task 2"), 1000)),
    new Promise(resolve => setTimeout(() => resolve("Task 3"), 1000))
  ]);

  console.log(result1, result2, result3);
}

parallelTasks();
// Takes ~1 second, not 3 seconds!
```

---

## Common Mistakes

### Mistake 1: Using await outside async function

```javascript
// ❌ WRONG: await outside async function
let value = await Promise.resolve(5);
// SyntaxError: await is only valid in async functions

// ✅ CORRECT: Use async function
async function test() {
  let value = await Promise.resolve(5);
  return value;
}
```

### Mistake 2: Forgetting try/catch

```javascript
// ❌ WRONG: Unhandled rejection
async function fetchData() {
  let data = await fetch("/api/data").then(r => r.json());
  return data;
}

// If fetch fails, the error is unhandled

// ✅ CORRECT: Handle errors
async function fetchData() {
  try {
    let data = await fetch("/api/data").then(r => r.json());
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}
```

### Mistake 3: Sequential when you want parallel

```javascript
// ❌ SLOW: Sequential (waits 2 seconds total)
async function slowFetch() {
  let user = await fetch("/api/user").then(r => r.json());
  let posts = await fetch("/api/posts").then(r => r.json());
  // Total: 1 second + 1 second = 2 seconds
}

// ✅ FAST: Parallel (waits 1 second total)
async function fastFetch() {
  let [user, posts] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json())
  ]);
  // Total: max(1 second, 1 second) = 1 second
}
```

### Mistake 4: Not returning the Promise from async function

```javascript
// ❌ WRONG: Caller can't wait for result
async function getData() {
  console.log("Getting data...");
  // Missing return
}

// Caller has no way to wait for the operation

// ✅ CORRECT: Return a value
async function getData() {
  return "Important data";
}

let data = await getData();
console.log(data);
```

---

## async/await vs Promises

| Feature | Promise | async/await |
|---------|---------|------------|
| Syntax | `.then().catch()` | `await` in try/catch |
| Readability | Good | Better |
| Error handling | `.catch()` | try/catch |
| Chaining | `.then()` | Sequential |
| Learning curve | Medium | Lower |

Use async/await for new code—it's the modern standard.

---

## IIFE (Immediately Invoked Function Expression)

Since `await` requires an async function, you often see this pattern:

```javascript
// Run async code at top level
(async () => {
  let data = await fetch("/api/data").then(r => r.json());
  console.log(data);
})();

// This creates and immediately calls an async function
```

---

## Next Steps

1. Convert a Promise chain to async/await
2. Use try/catch for error handling
3. Run multiple async operations in parallel with Promise.all()
4. Move to: **Phase 5 - DOM & Browser APIs**
