# Phase 4, Concept 2: Promises

## Why This Matters

Promises solve the "callback hell" problem and provide a cleaner way to handle asynchronous code.

Understanding Promises is critical because:
- Modern JavaScript uses Promises everywhere (fetch API, etc.)
- Promises are more readable than nested callbacks
- They provide better error handling with `.catch()`
- Async/await is built on Promises

---

## What Is a Promise?

A **Promise** is an object representing a future value that may not be available yet.

Think of it like ordering food at a restaurant:
- You place an order (create a Promise)
- The kitchen works on it (Promise is pending)
- Eventually they bring your food (Promise resolves) OR say "we're out" (Promise rejects)
- You do something with the result (`.then()` or `.catch()`)

---

## Promise States

A Promise has three states:

1. **Pending**: Waiting for the result
2. **Fulfilled (Resolved)**: Operation succeeded, has a value
3. **Rejected**: Operation failed, has a reason

```
          ┌─────────────────┐
          │ Pending         │
          │ (waiting)       │
          └────────┬────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
    ┌────▼────┐          ┌───▼────┐
    │ Resolved │          │ Rejected│
    │ (success)│          │ (error) │
    └──────────┘          └─────────┘
```

Once a Promise moves from Pending to Resolved or Rejected, it **cannot change**.

---

## Creating a Promise

```javascript
// Create a new Promise
let promise = new Promise(function(resolve, reject) {
  // This function runs immediately

  if (someCondition) {
    resolve(value);   // Promise succeeds
  } else {
    reject(reason);   // Promise fails
  }
});

// Example: Simulate a 1-second operation
let delayedPromise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve("Done!");  // Resolve after 1 second
  }, 1000);
});
```

---

## Using Promises: .then()

`.then()` runs when a Promise resolves:

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve("Success!");
  }, 1000);
});

// Handle the resolved value
promise.then(function(value) {
  console.log(value);  // "Success!"
});

// With arrow function
promise.then(value => {
  console.log(value);
});
```

---

## Using Promises: .catch()

`.catch()` runs when a Promise rejects:

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    reject("Something went wrong");
  }, 1000);
});

// Handle the rejection
promise.catch(function(error) {
  console.log(error);  // "Something went wrong"
});

// With arrow function
promise.catch(error => {
  console.log("Error:", error);
});
```

---

## Chaining Promises

`.then()` returns a new Promise, so you can chain them:

```javascript
let promise = Promise.resolve(5);

promise
  .then(value => {
    console.log("Step 1:", value);  // 5
    return value * 2;  // Return new value
  })
  .then(value => {
    console.log("Step 2:", value);  // 10
    return value * 2;  // Return new value
  })
  .then(value => {
    console.log("Step 3:", value);  // 20
  });

// Output:
// Step 1: 5
// Step 2: 10
// Step 3: 20
```

---

## Promise Error Handling

If an error occurs in a `.then()`, it goes to `.catch()`:

```javascript
Promise.resolve(10)
  .then(value => {
    console.log("Value:", value);
    throw new Error("Something went wrong");  // Throws error
  })
  .then(value => {
    console.log("This doesn't run");  // Skipped due to error
  })
  .catch(error => {
    console.log("Caught error:", error.message);  // Handles the error
  });

// Output:
// Value: 10
// Caught error: Something went wrong
```

---

## Promise.resolve() and Promise.reject()

Quick ways to create already-resolved or rejected Promises:

```javascript
// Already resolved
Promise.resolve(42)
  .then(value => console.log(value));  // 42

// Already rejected
Promise.reject("Error!")
  .catch(error => console.log(error));  // "Error!"
```

---

## Promise.all()

Wait for multiple Promises to resolve:

```javascript
let promise1 = Promise.resolve(1);
let promise2 = Promise.resolve(2);
let promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values);  // [1, 2, 3]
  });

// If any rejects, the whole thing rejects:
let p1 = Promise.resolve(1);
let p2 = Promise.reject("Error");
let p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .catch(error => console.log(error));  // "Error"
```

---

## Promise.race()

Return the result of whichever Promise resolves/rejects first:

```javascript
let promise1 = new Promise(resolve => {
  setTimeout(() => resolve("First"), 500);
});

let promise2 = new Promise(resolve => {
  setTimeout(() => resolve("Second"), 1000);
});

Promise.race([promise1, promise2])
  .then(value => {
    console.log(value);  // "First" (resolves first)
  });
```

---

## Code Example: Promises in Action

```javascript
// ========================================
// PROMISES DEMONSTRATION
// ========================================

console.log("=== CREATING PROMISES ===\n");

let successPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Operation succeeded!");
  }, 1000);
});

let failPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Operation failed!");
  }, 1000);
});

console.log("=== HANDLING SUCCESS ===\n");

successPromise
  .then(result => {
    console.log("Result:", result);
  });

console.log("Request sent, waiting for response...");

console.log("\n=== HANDLING FAILURE ===\n");

failPromise
  .catch(error => {
    console.log("Error:", error);
  });

console.log("\n=== CHAINING ===\n");

function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: id, name: "Alice" });
    }, 500);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "Hello" },
        { id: 2, text: "World" }
      ]);
    }, 500);
  });
}

fetchUser(1)
  .then(user => {
    console.log("User:", user.name);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts.length);
  });

console.log("\n=== ERROR HANDLING ===\n");

new Promise((resolve, reject) => {
  reject("Something went wrong");
})
  .then(value => {
    console.log("Success:", value);
  })
  .catch(error => {
    console.log("Caught error:", error);
  })
  .then(() => {
    console.log("Always runs (after catch)");
  });

console.log("\n=== PROMISE.ALL ===\n");

Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
])
  .then(values => {
    console.log("All values:", values);
  });
```

---

## Common Mistakes

### Mistake 1: Forgetting to return from .then()

```javascript
// ❌ WRONG: Second then doesn't get the value
Promise.resolve(5)
  .then(value => {
    console.log(value);
    value * 2;  // Returns nothing (undefined)
  })
  .then(value => {
    console.log(value);  // undefined (not 10)
  });

// ✅ CORRECT: Return the value
Promise.resolve(5)
  .then(value => {
    console.log(value);
    return value * 2;  // Return the new value
  })
  .then(value => {
    console.log(value);  // 10
  });
```

### Mistake 2: Not handling rejection

```javascript
// ❌ WRONG: Rejection is unhandled
Promise.reject("Error")
  .then(value => console.log(value));

// ✅ CORRECT: Handle rejection
Promise.reject("Error")
  .then(value => console.log(value))
  .catch(error => console.log("Error:", error));
```

### Mistake 3: Creating Promise inside .then() without returning

```javascript
// ❌ WRONG: Second then runs immediately
Promise.resolve(1)
  .then(value => {
    new Promise(resolve => {
      setTimeout(() => {
        console.log("Delayed operation");
        resolve();
      }, 1000);
    });
  })
  .then(() => {
    console.log("This runs immediately");  // Doesn't wait for delay
  });

// ✅ CORRECT: Return the Promise
Promise.resolve(1)
  .then(value => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("Delayed operation");
        resolve();
      }, 1000);
    });
  })
  .then(() => {
    console.log("This waits for the delay");
  });
```

### Mistake 4: Promise.all() failing if any rejects

```javascript
// ❌ PROBLEM: All fails if one fails
Promise.all([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3)
])
  .then(values => console.log(values))
  .catch(error => console.log("Failed:", error));

// ✅ SOLUTION: Use Promise.allSettled() (modern)
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3)
])
  .then(results => {
    console.log(results);
    // Each result is { status, value } or { status, reason }
  });
```

---

## Next Steps

1. Create and resolve Promises
2. Chain multiple Promises
3. Handle errors with .catch()
4. Use Promise.all() with multiple requests
5. Move to: **03_async_await.md**
