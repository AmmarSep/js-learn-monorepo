# Phase 4, Concept 1: Callbacks and the Event Loop

## Why This Matters

JavaScript runs on a single thread, but much of the real world involves:
- Waiting for network requests
- Reading files
- Timers
- User interactions

Understanding the event loop is critical because:
- You can't block the thread waiting for I/O
- Callbacks are how JavaScript handles asynchronous operations
- The event loop determines execution order
- Many bugs come from misunderstanding async behavior

---

## Synchronous vs Asynchronous

### Synchronous: Code Runs Line by Line

```javascript
console.log("1");
console.log("2");
console.log("3");

// Output:
// 1
// 2
// 3
// Each line waits for the previous to complete
```

### Asynchronous: Code Doesn't Wait

```javascript
console.log("1");

setTimeout(function() {
  console.log("2");
}, 1000);  // Wait 1 second, then run function

console.log("3");

// Output:
// 1
// 3
// 2 (appears after 1 second)

// Line 3 runs BEFORE the timeout completes
```

---

## Understanding setTimeout()

`setTimeout()` schedules code to run later:

```javascript
setTimeout(function() {
  console.log("Hello after 2 seconds");
}, 2000);  // 2000 milliseconds = 2 seconds

console.log("This runs first");

// Output:
// This runs first
// (wait 2 seconds)
// Hello after 2 seconds
```

**Important**: The delay is minimum, not exact. Other code might delay it further.

---

## Callbacks: Functions Passed as Arguments

A **callback** is a function you pass to another function, to be called later:

```javascript
function greet(name, callback) {
  console.log("Hello, " + name);
  callback();  // Call the callback function
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alice", sayGoodbye);

// Output:
// Hello, Alice
// Goodbye!
```

### Callbacks with Parameters

```javascript
function fetchUser(id, callback) {
  // Simulate API call
  setTimeout(function() {
    let user = { id: id, name: "Alice" };
    callback(user);  // Pass data to callback
  }, 1000);
}

function displayUser(user) {
  console.log("User:", user.name);
}

fetchUser(1, displayUser);
// (waits 1 second)
// User: Alice
```

---

## Callback Hell (Pyramid of Doom)

Callbacks nested deeply become hard to read:

```javascript
// ❌ HARD TO READ: Callback hell
getUser(1, function(user) {
  getProfile(user.id, function(profile) {
    getSettings(profile.id, function(settings) {
      displayInfo(user, profile, settings);
    });
  });
});

// Code goes deeper and deeper (pyramid shape)
```

This is why Promises and async/await were created.

---

## The Event Loop

The **event loop** determines when asynchronous code runs. It has three main parts:

1. **Call Stack**: Function execution (synchronous code)
2. **Task Queue**: Callbacks waiting to run (from setTimeout, etc.)
3. **Microtask Queue**: Special callbacks (from Promises)

### How the Event Loop Works

```
┌──────────────────────────────────────────────────┐
│                  JAVASCRIPT ENGINE                │
├──────────────────────────────────────────────────┤
│                                                   │
│  Call Stack     Task Queue   Microtask Queue      │
│  ┌──────────┐   ┌────────┐  ┌───────────────┐   │
│  │ function │   │ timer  │  │ Promise then  │   │
│  │ running  │   │ done   │  │ callback      │   │
│  └──────────┘   └────────┘  └───────────────┘   │
│                                                   │
└──────────────────────────────────────────────────┘

1. Call Stack: Execute current function
2. When empty: Check Microtask Queue (Promises)
3. When empty: Check Task Queue (setTimeout, events)
4. Repeat
```

### Event Loop Execution Order

```javascript
console.log("1");

setTimeout(function() {
  console.log("2");
}, 0);  // 0 delay, but still goes to Task Queue

Promise.resolve()
  .then(function() {
    console.log("3");
  });

console.log("4");

// Output:
// 1
// 4
// 3
// 2

// Why?
// 1. Print "1" (synchronous)
// 2. setTimeout callback goes to Task Queue
// 3. Promise callback goes to Microtask Queue
// 4. Print "4" (synchronous)
// 5. Call Stack empty, check Microtask Queue - print "3"
// 6. Call Stack empty, check Task Queue - print "2"
```

**Important**: Microtask Queue runs BEFORE Task Queue!

---

## Code Example: Callbacks and Event Loop

```javascript
// ========================================
// CALLBACKS AND EVENT LOOP
// ========================================

console.log("=== BASIC CALLBACK ===\n");

function fetchData(callback) {
  console.log("Fetching data...");

  setTimeout(function() {
    let data = { id: 1, name: "Alice" };
    console.log("Data received");
    callback(data);
  }, 1000);
}

function displayData(data) {
  console.log("Displaying:", data.name);
}

fetchData(displayData);
console.log("Request sent");

// Output:
// Fetching data...
// Request sent
// (wait 1 second)
// Data received
// Displaying: Alice

console.log("\n=== EVENT LOOP ORDER ===\n");

console.log("Start");

setTimeout(function() {
  console.log("setTimeout 1");
}, 0);

Promise.resolve()
  .then(function() {
    console.log("Promise 1");

    setTimeout(function() {
      console.log("setTimeout in Promise");
    }, 0);
  })
  .then(function() {
    console.log("Promise 2");
  });

setTimeout(function() {
  console.log("setTimeout 2");
}, 0);

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 2
// setTimeout 1
// setTimeout 2
// setTimeout in Promise

console.log("\n=== CALLBACK WITH ERROR ===\n");

function divide(a, b, callback, errorCallback) {
  if (b === 0) {
    errorCallback("Cannot divide by zero");
  } else {
    callback(a / b);
  }
}

divide(10, 2,
  function(result) {
    console.log("Result:", result);
  },
  function(error) {
    console.log("Error:", error);
  }
);

divide(10, 0,
  function(result) {
    console.log("Result:", result);
  },
  function(error) {
    console.log("Error:", error);
  }
);

// Output:
// Result: 5
// Error: Cannot divide by zero
```

---

## Common Mistakes

### Mistake 1: Thinking setTimeout(0) runs immediately

```javascript
// ❌ WRONG EXPECTATION
setTimeout(function() {
  console.log("Runs immediately");
}, 0);

console.log("This runs first");

// Output:
// This runs first
// Runs immediately

// setTimeout(0) still goes to Task Queue, not immediately
```

### Mistake 2: Forgetting callback is asynchronous

```javascript
// ❌ WRONG
let result;

setTimeout(function() {
  result = 42;
}, 1000);

console.log(result);  // undefined (not set yet!)

// ✅ CORRECT
let result;

setTimeout(function() {
  result = 42;
  console.log(result);  // 42
}, 1000);
```

### Mistake 3: Callback hell (too many nested callbacks)

```javascript
// ❌ HARD TO READ
getUser(function(user) {
  getProfile(user.id, function(profile) {
    getSettings(profile.id, function(settings) {
      displayInfo(user, profile, settings);
    });
  });
});

// ✅ BETTER: Use Promises or async/await (see next concepts)
getUser()
  .then(user => getProfile(user.id))
  .then(profile => getSettings(profile.id))
  .then(settings => displayInfo(settings))
  .catch(error => console.log("Error:", error));
```

### Mistake 4: Not passing a callback (passing a function call instead)

```javascript
// ❌ WRONG: Calls function immediately
setTimeout(console.log("Hello"), 1000);
// Output: "Hello" appears immediately!

// ✅ CORRECT: Pass the function, not its result
setTimeout(function() {
  console.log("Hello");
}, 1000);

// ✅ CORRECT: Arrow function syntax
setTimeout(() => console.log("Hello"), 1000);
```

---

## Understanding "Blocking" Code

JavaScript runs on a single thread. If you block it, nothing else runs:

```javascript
// ❌ BLOCKING: Freezes the entire application
function heavyComputation() {
  let sum = 0;
  for (let i = 0; i < 10000000000; i++) {
    sum += i;
  }
  return sum;
}

console.log("Start");
let result = heavyComputation();  // Takes several seconds
console.log("Done:", result);

// During computation, the browser can't respond to clicks or other events

// ✅ NON-BLOCKING: Use setTimeout to yield control
function heavyComputationAsync() {
  let sum = 0;
  let i = 0;

  function compute() {
    let endTime = Date.now() + 10;  // Do work for 10ms

    while (i < 10000000000 && Date.now() < endTime) {
      sum += i;
      i++;
    }

    if (i < 10000000000) {
      setTimeout(compute, 0);  // Yield control
    } else {
      console.log("Done:", sum);
    }
  }

  compute();
}
```

---

## Next Steps

1. Write functions that accept callbacks
2. Use setTimeout with callbacks
3. Observe the event loop order
4. Move to: **02_promises.md**
