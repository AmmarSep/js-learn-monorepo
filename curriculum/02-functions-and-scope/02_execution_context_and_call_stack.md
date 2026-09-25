# Phase 2, Concept 2: Execution Context and Call Stack

## Why This Matters

When a function runs, JavaScript creates an **execution context**. Understanding this is critical because:
- You need to understand variable scope and where variables exist
- `this` binding depends on execution context
- Debugging errors requires understanding the call stack
- Memory management depends on context lifetime

---

## What Is Execution Context?

An **execution context** is an environment where JavaScript code runs. It contains:
- **Variables**: All local variables accessible in that scope
- **Functions**: Any functions declared in that scope
- **`this`**: The current object context
- **Scope chain**: Access to variables in outer scopes

Every time a function is called, a new execution context is created.

---

## The Call Stack

The **call stack** keeps track of which execution contexts are currently running.

### How the Call Stack Works

```
Stack (LIFO: Last In, First Out)
┌──────────────────┐
│ functionC()      │  ← Currently running
├──────────────────┤
│ functionB()      │  ← Waiting for functionC to finish
├──────────────────┤
│ functionA()      │  ← Waiting for functionB to finish
├──────────────────┤
│ Global scope     │  ← Always at the bottom
└──────────────────┘
```

### Call Stack Example

```javascript
function a() {
  console.log("a: start");
  b();
  console.log("a: end");
}

function b() {
  console.log("b: start");
  c();
  console.log("b: end");
}

function c() {
  console.log("c: start");
  console.log("c: end");
}

a();  // Call a

// Output:
// a: start
// b: start
// c: start
// c: end
// b: end
// a: end
```

**Call stack progression:**

```
Step 1: a() is called
┌──────────────┐
│ a()          │  ← Currently running
├──────────────┤
│ Global       │
└──────────────┘

Step 2: Inside a(), b() is called
┌──────────────┐
│ b()          │  ← Currently running
├──────────────┤
│ a()          │  ← Waiting
├──────────────┤
│ Global       │
└──────────────┘

Step 3: Inside b(), c() is called
┌──────────────┐
│ c()          │  ← Currently running
├──────────────┤
│ b()          │  ← Waiting
├──────────────┤
│ a()          │  ← Waiting
├──────────────┤
│ Global       │
└──────────────┘

Step 4: c() returns
┌──────────────┐
│ b()          │  ← Currently running again
├──────────────┤
│ a()          │  ← Waiting
├──────────────┤
│ Global       │
└──────────────┘

Step 5: b() returns
┌──────────────┐
│ a()          │  ← Currently running again
├──────────────┤
│ Global       │
└──────────────┘

Step 6: a() returns
┌──────────────┐
│ Global       │  ← Only global scope
└──────────────┘
```

---

## Execution Context: Variables and Scope

Each execution context has its own variables:

```javascript
let globalVariable = "I'm global";

function myFunction() {
  let localVariable = "I'm local";
  console.log(localVariable);      // "I'm local" (found locally)
  console.log(globalVariable);     // "I'm global" (found in global scope)
}

myFunction();
console.log(localVariable);  // Error: localVariable is not defined
```

### Scope Chain

When looking for a variable, JavaScript searches:
1. **Current scope**: Local variables
2. **Parent scope**: Variables in enclosing function
3. **Global scope**: Global variables
4. If not found: ReferenceError

```javascript
let global = "global";

function outer() {
  let outerVar = "outer";

  function inner() {
    let innerVar = "inner";

    // Can access:
    console.log(innerVar);   // "inner" (local)
    console.log(outerVar);   // "outer" (parent scope)
    console.log(global);     // "global" (global scope)
  }

  inner();

  // Can access:
  console.log(outerVar);     // "outer" (local)
  console.log(global);       // "global" (global scope)
  console.log(innerVar);     // Error: innerVar is not defined
}

outer();
```

---

## this in Different Contexts

The value of `this` depends on **how** a function is called:

### 1. Regular Function Call: this is global

```javascript
function sayName() {
  console.log(this.name);
}

// Calling directly
sayName();  // this is global object (window in browser, global in Node)
// Output: undefined (global.name doesn't exist)
```

### 2. Method Call: this is the object

```javascript
const person = {
  name: "Alice",
  sayName: function() {
    console.log(this.name);
  }
};

person.sayName();  // this is person
// Output: Alice
```

### 3. Constructor Call: this is the new object

```javascript
function Person(name) {
  this.name = name;
}

const p = new Person("Bob");
console.log(p.name);  // "Bob"
// this was the new object created
```

### 4. Arrow Function: this is from outer scope

```javascript
const person = {
  name: "Charlie",
  sayName: () => {
    console.log(this.name);  // this is from outer scope (global)
  }
};

person.sayName();  // Output: undefined
// this is global, not person
```

---

## Code Example: Execution Context and Call Stack

```javascript
// ========================================
// EXECUTION CONTEXT AND CALL STACK
// ========================================

console.log("=== CALL STACK VISUALIZATION ===\n");

function level3() {
  console.log("Inside level3");
  console.trace();  // Shows the call stack
}

function level2() {
  console.log("Inside level2");
  level3();
}

function level1() {
  console.log("Inside level1");
  level2();
}

console.log("Starting...");
level1();
console.log("Finished!\n");

console.log("=== VARIABLE SCOPE ===\n");

let global = "GLOBAL";

function outer() {
  let outerVar = "OUTER";

  function inner() {
    let innerVar = "INNER";

    console.log("From inner():");
    console.log("  innerVar:", innerVar);   // Local
    console.log("  outerVar:", outerVar);   // Parent scope
    console.log("  global:", global);       // Global scope
  }

  inner();

  console.log("\nFrom outer():");
  console.log("  outerVar:", outerVar);     // Local
  console.log("  global:", global);         // Global scope
  // console.log("  innerVar:", innerVar);  // Error!
}

outer();

console.log("\n=== THIS BINDING ===\n");

const user = {
  name: "David",
  age: 30,
  describe: function() {
    console.log("User:", this.name, "Age:", this.age);
  }
};

user.describe();  // this is user

const func = user.describe;
// func();  // this would be global, showing undefined

console.log("\n=== EXECUTION CONTEXT CREATION ===\n");

function greet(greeting) {
  let message = greeting + " " + this.name;
  console.log(message);
}

const person = { name: "Eve" };
greet.call(person, "Hello");  // "Hello Eve"
// We'll learn about .call() later, but this shows this binding
```

---

## Stack Overflow Error

If functions call each other too deeply, you hit the stack limit:

```javascript
// ❌ WRONG: Infinite recursion causes stack overflow
function infinite() {
  infinite();  // Calls itself forever
}

infinite();
// Error: RangeError: Maximum call stack size exceeded
// Each call adds to the stack until it runs out of memory

// ✅ CORRECT: Recursion with base case
function countdown(n) {
  if (n === 0) {
    console.log("Done!");
    return;  // Base case - stops recursion
  }
  console.log(n);
  countdown(n - 1);
}

countdown(3);
// Output:
// 3
// 2
// 1
// Done!
```

---

## Using console.trace() to See Call Stack

```javascript
function a() {
  console.trace();  // Shows call stack at this point
}

function b() {
  a();
}

b();

// Output shows:
// - a() was called from b()
// - b() was called from global scope
```

---

## Common Mistakes

### Mistake 1: Accessing variables outside their scope

```javascript
// ❌ WRONG
function test() {
  let localVar = 5;
}

test();
console.log(localVar);  // Error: localVar is not defined

// ✅ CORRECT
let localVar;

function test() {
  localVar = 5;
}

test();
console.log(localVar);  // 5
```

### Mistake 2: Expecting this in nested function

```javascript
// ❌ WRONG
const user = {
  name: "Alice",
  greet: function() {
    function inner() {
      console.log(this.name);  // undefined (this is global)
    }
    inner();
  }
};

user.greet();

// ✅ CORRECT (save this in variable)
const user = {
  name: "Alice",
  greet: function() {
    const self = this;  // Save the context
    function inner() {
      console.log(self.name);  // Use saved reference
    }
    inner();
  }
};

user.greet();  // "Alice"
```

### Mistake 3: Not understanding function scope in loops

```javascript
// ❌ WRONG
var array = [];
for (var i = 0; i < 3; i++) {
  array.push(function() {
    return i;  // All reference the same i
  });
}

console.log(array[0]());  // 3 (not 0!)

// ✅ CORRECT (use let for block scope)
let array = [];
for (let i = 0; i < 3; i++) {
  array.push(function() {
    return i;  // Each has its own i
  });
}

console.log(array[0]());  // 0
console.log(array[1]());  // 1
console.log(array[2]());  // 2
```

---

## Next Steps

1. Use `console.trace()` to visualize call stacks
2. Test variable scope with nested functions
3. Experiment with `this` in different contexts
4. Move to: **03_closures.md**
