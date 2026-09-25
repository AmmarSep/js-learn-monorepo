# Phase 2, Concept 3: Closures

## Why This Matters

A **closure** is when a function has access to variables from its outer scope, even after that outer function has finished executing.

Closures are critical because:
- They enable **data privacy** (hidden variables)
- They're used in **callbacks** and **event handlers**
- They're essential for **functional programming** patterns
- Many advanced JavaScript patterns depend on closures
- Understanding closures helps debug scope-related bugs

---

## Understanding Closures

### What Is a Closure?

A closure is created when:
1. A function is defined inside another function
2. The inner function uses variables from the outer function
3. The inner function is returned or stored somewhere

The inner function "closes over" (captures) those variables.

### Simple Closure Example

```javascript
function outer() {
  let count = 0;  // Outer variable

  function inner() {
    count++;  // Inner function uses outer variable
    return count;
  }

  return inner;  // Return the function
}

const counter = outer();  // outer() has finished executing!

console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3

// The 'count' variable still exists because of the closure!
```

**Key insight**: Even though `outer()` has finished executing, the `count` variable is still accessible because `inner()` has a closure over it.

### How Memory Works with Closures

```
When outer() is called:
┌─────────────────┐
│ count = 0       │  ← Created on the heap
└─────────────────┘

When outer() returns inner:
The 'inner' function keeps a reference to 'count'
┌─────────────────┐
│ count = 0       │  ← Still exists on the heap
└─────────────────┘
↑
References from: inner() function

When outer() execution ends:
'count' is NOT garbage collected because 'inner' still references it
```

---

## Closure: Data Privacy

Closures enable **private variables** that can't be accessed directly:

```javascript
function createUser(name) {
  let password = "secret";  // Private variable

  return {
    getName: function() {
      return name;
    },
    checkPassword: function(guess) {
      return guess === password;  // Closure access
    },
    setPassword: function(newPassword) {
      password = newPassword;
    }
  };
}

const user = createUser("Alice");

console.log(user.getName());        // "Alice"
console.log(user.checkPassword("secret"));  // true
console.log(user.password);         // undefined (private!)

// Can't access password directly
// But can access through methods (closures)
```

The `password` variable is private—you can only access it through the methods that have closures over it.

---

## Closure: Counter Pattern

```javascript
function createCounter(start = 0) {
  let count = start;

  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter(10);

console.log(counter.increment());  // 11
console.log(counter.increment());  // 12
console.log(counter.decrement());  // 11
console.log(counter.getCount());   // 11

// Each counter has its own private 'count'
const counter2 = createCounter(0);
console.log(counter2.getCount());  // 0 (different closure)
```

---

## Closure: Function Factory

```javascript
function makeAdder(x) {
  return function(y) {
    return x + y;  // Closure: x is captured
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(3));   // 8 (5 + 3)
console.log(add5(7));   // 12 (5 + 7)
console.log(add10(3));  // 13 (10 + 3)

// Each returned function has its own closure over different x values
```

---

## Closure: Common Real-World Use Cases

### 1. Event Listeners with Data

```javascript
// Without closures, you'd lose the index
const buttons = document.querySelectorAll('button');

buttons.forEach(function(button, index) {
  button.addEventListener('click', function() {
    console.log('Button ' + index + ' clicked');  // Closure captures index
  });
});

// Each listener has its own closure with its own index
```

### 2. Callbacks with Context

```javascript
function getUserData(id, onSuccess, onError) {
  // Simulate API call
  setTimeout(function() {
    if (id > 0) {
      onSuccess({ id: id, name: "User " + id });  // Closure
    } else {
      onError("Invalid ID");  // Closure
    }
  }, 1000);
}

getUserData(1,
  function(data) {
    console.log("Success:", data);  // Closure over onSuccess
  },
  function(error) {
    console.log("Error:", error);   // Closure over onError
  }
);
```

### 3. Partial Application

```javascript
function multiply(a, b) {
  return a * b;
}

function partial(fn, a) {
  return function(b) {
    return fn(a, b);  // Closure: fn and a are captured
  };
}

const double = partial(multiply, 2);
console.log(double(5));   // 10
console.log(double(10));  // 20
```

---

## Code Example: Closures in Action

```javascript
// ========================================
// CLOSURES DEMONSTRATION
// ========================================

console.log("=== BASIC CLOSURE ===\n");

function createGreeter(greeting) {
  return function(name) {
    console.log(greeting + ", " + name);  // Closure: greeting captured
  };
}

const sayHello = createGreeter("Hello");
const sayGoodbye = createGreeter("Goodbye");

sayHello("Alice");     // Hello, Alice
sayGoodbye("Bob");     // Goodbye, Bob

console.log("\n=== DATA PRIVACY ===\n");

function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: function(amount) {
      balance += amount;
      return "New balance: " + balance;
    },
    withdraw: function(amount) {
      if (amount > balance) {
        return "Insufficient funds";
      }
      balance -= amount;
      return "New balance: " + balance;
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500));   // New balance: 1500
console.log(account.withdraw(200));  // New balance: 1300
console.log(account.getBalance());   // 1300
console.log(account.balance);        // undefined (private!)

console.log("\n=== COUNTER PATTERN ===\n");

function createCounter() {
  let count = 0;

  return {
    increment: () => ++count,
    decrement: () => --count,
    reset: () => count = 0,
    get: () => count
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.decrement());  // 1
console.log(counter.reset());      // 0

console.log("\n=== FUNCTION FACTORY ===\n");

function makeMultiplier(factor) {
  return function(number) {
    return number * factor;  // Closure: factor captured
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);
const quadruple = makeMultiplier(4);

console.log(double(5));      // 10
console.log(triple(5));      // 15
console.log(quadruple(5));   // 20

console.log("\n=== COMMON MISTAKE: LOOP WITH CLOSURE ===\n");

// ❌ WRONG: All functions reference the same 'i'
var wrongFunctions = [];
for (var i = 0; i < 3; i++) {
  wrongFunctions.push(function() {
    return i;
  });
}

console.log("Wrong (var):");
console.log(wrongFunctions[0]());  // 3 (not 0!)
console.log(wrongFunctions[1]());  // 3 (not 1!)
console.log(wrongFunctions[2]());  // 3 (not 2!)

// ✅ CORRECT: Each function has its own 'i'
let correctFunctions = [];
for (let i = 0; i < 3; i++) {
  correctFunctions.push(function() {
    return i;
  });
}

console.log("\nCorrect (let):");
console.log(correctFunctions[0]());  // 0
console.log(correctFunctions[1]());  // 1
console.log(correctFunctions[2]());  // 2
```

---

## Common Closure Mistakes

### Mistake 1: Closure in Loops with var

```javascript
// ❌ WRONG
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // Prints 3, 3, 3
  }, 100);
}

// ✅ CORRECT (option 1: use let)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);  // Prints 0, 1, 2
  }, 100);
}

// ✅ CORRECT (option 2: create a closure)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);  // Prints 0, 1, 2
    }, 100);
  })(i);
}
```

### Mistake 2: Unintended Closures Keeping Memory

```javascript
// ❌ PROBLEM: Closure keeps large data in memory
function processData(largeData) {
  return function() {
    console.log("Processing...");
    // largeData is still in memory due to closure!
  };
}

const callback = processData(hugeArray);
// hugeArray can't be garbage collected

// ✅ BETTER: Explicitly release when done
let largeData = null;
function processData() {
  return function() {
    console.log("Processing...");
  };
}

const callback = processData();
largeData = null;  // Now can be garbage collected
```

### Mistake 3: Thinking closures always create new copies

```javascript
// Important: Closures share references, not copies
function makeObj() {
  let obj = { value: 0 };

  return {
    getRef1: () => obj,
    getRef2: () => obj
  };
}

const container = makeObj();
const ref1 = container.getRef1();
const ref2 = container.getRef2();

ref1.value = 100;
console.log(ref2.value);  // 100 (same object!)

// Both functions have closures over the SAME obj
```

---

## Memory and Garbage Collection

Closures affect garbage collection:

```javascript
function leakExample() {
  let largeData = new Array(1000000).fill("data");

  return function() {
    // largeData is captured in closure
    // Even if we never use it, it stays in memory!
    console.log("Doing something else");
  };
}

const func = leakExample();
// largeData is still in memory because of closure
```

**Best practice**: Only capture what you need

```javascript
function goodExample() {
  let largeData = new Array(1000000).fill("data");
  let needed = largeData[0];  // Extract what you need

  return function() {
    // Only 'needed' is captured, not the whole array
    console.log(needed);
  };
}
```

---

## Next Steps

1. Create closures for data privacy
2. Build a counter using closures
3. Create function factories
4. Observe which variables are captured
5. Move to: **Phase 3 - Objects, Arrays & Prototypes**
