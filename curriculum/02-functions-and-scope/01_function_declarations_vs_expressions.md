# Phase 2, Concept 1: Function Declarations vs Expressions

## Why This Matters

Functions are reusable blocks of code. There are different ways to create them:
- **Function declarations**: Hoisted, can be called before declaration
- **Function expressions**: Not hoisted, must be defined before use
- **Arrow functions**: Modern syntax, different `this` binding

Understanding the differences is critical because:
- Each has different hoisting behavior
- They behave differently with `this`
- Arrow functions can't be used as constructors
- Each is better for different situations

---

## Function Declarations

A function declaration creates a function that's **hoisted** (available before declaration).

```javascript
// Call the function BEFORE declaring it (works!)
sayHello();  // Output: Hello!

function sayHello() {
  console.log("Hello!");
}

// Why works? Function declaration is hoisted to the top
```

### How Function Declaration Hoisting Works

```javascript
// What you write:
sayHello();
function sayHello() {
  console.log("Hello!");
}

// What the engine sees (after hoisting):
function sayHello() {
  console.log("Hello!");
}
sayHello();
```

The entire function (name and body) is hoisted to the top of its scope.

### Function Declaration Syntax

```javascript
function functionName(parameter1, parameter2) {
  // Function body
  return result;
}

// Example
function add(a, b) {
  return a + b;
}

console.log(add(5, 3));  // 8
```

---

## Function Expressions

A function expression assigns a function to a variable. It's **not hoisted**.

```javascript
// ❌ Error! Can't call before defining
greet();

const greet = function() {
  console.log("Hi!");
};

// Error: Cannot access 'greet' before initialization (Temporal Dead Zone)
```

### How Function Expression Hoisting Works

```javascript
// What you write:
greet();
const greet = function() {
  console.log("Hi!");
};

// What the engine sees (after hoisting):
const greet;  // Hoisted, but value is undefined
greet();      // Error: greet is not a function (it's undefined)
greet = function() { ... };  // Assignment here
```

Only the variable is hoisted, not the function.

### Function Expression Syntax

```javascript
const functionName = function(parameter1, parameter2) {
  // Function body
  return result;
};

// Example
const subtract = function(a, b) {
  return a - b;
};

console.log(subtract(10, 3));  // 7
```

### Named Function Expressions

The function can have a name (used only inside the function):

```javascript
const sayName = function greet(name) {
  console.log("Hello, " + name);
  // Inside the function, you can use 'greet' (the function name)
};

sayName("Alice");  // Output: Hello, Alice

// But outside, you use the variable name
console.log(typeof greet);  // "undefined" (not accessible outside)
```

---

## Arrow Functions

Modern syntax that's more concise. Created with `=>` (fat arrow).

```javascript
// Basic arrow function
const multiply = (a, b) => {
  return a * b;
};

console.log(multiply(5, 3));  // 15
```

### Arrow Function Variations

```javascript
// One parameter: parentheses optional
const square = x => {
  return x * x;
};

// No parameters: parentheses required
const random = () => {
  return Math.random();
};

// Multiple parameters: parentheses required
const divide = (a, b) => {
  return a / b;
};

// Single expression: can omit braces and return
const add = (a, b) => a + b;  // Returns a + b automatically

const greet = name => `Hello, ${name}`;  // Returns the template string

// No parameters, single expression
const getTime = () => new Date();
```

### Arrow Functions Are NOT Hoisted

```javascript
// ❌ Error! Arrow functions are not hoisted
console.log(multiply(5, 3));  // Error: multiply is not defined

const multiply = (a, b) => a * b;
```

Arrow functions are function expressions, so they have the same hoisting rules.

---

## Key Difference: this Binding

The biggest difference between regular functions and arrow functions is how `this` works:

### Regular Functions: Dynamic this

```javascript
const person = {
  name: "Alice",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

person.greet();  // Output: Hello, Alice
// 'this' is the object (person)
```

### Arrow Functions: Lexical this

```javascript
const person = {
  name: "Alice",
  greet: () => {
    console.log("Hello, " + this.name);
  }
};

person.greet();  // Output: Hello, undefined
// 'this' is NOT the object
// Arrow functions use 'this' from the surrounding scope
```

**Important:** You'll learn more about `this` in the next concept.

---

## Code Example: All Function Types

```javascript
// ========================================
// FUNCTION DECLARATIONS VS EXPRESSIONS
// ========================================

console.log("=== FUNCTION DECLARATIONS ===");

// Called BEFORE declaration (hoisting)
console.log(declaredAdd(5, 3));  // 8

function declaredAdd(a, b) {
  return a + b;
}

console.log("\n=== FUNCTION EXPRESSIONS ===");

// Must define BEFORE calling
const expressionAdd = function(a, b) {
  return a + b;
};

console.log(expressionAdd(5, 3));  // 8

// Named function expression
const multiply = function mult(a, b) {
  console.log("Multiplying...");
  return a * b;
};

console.log(multiply(4, 5));  // 20

console.log("\n=== ARROW FUNCTIONS ===");

// Basic arrow function
const subtract = (a, b) => {
  return a - b;
};

console.log(subtract(10, 3));  // 7

// Concise arrow function (implicit return)
const divide = (a, b) => a / b;

console.log(divide(20, 4));  // 5

// Single parameter (parentheses optional)
const square = x => x * x;

console.log(square(4));  // 16

// No parameters
const random = () => Math.random();

console.log("Random:", random());

console.log("\n=== THIS BINDING ===");

const user = {
  name: "Bob",

  // Regular function: 'this' is the object
  regularGreet: function() {
    return "Hello from " + this.name;
  },

  // Arrow function: 'this' is from outer scope (global)
  arrowGreet: () => {
    return "Hello from " + this.name;
  }
};

console.log(user.regularGreet());  // Hello from Bob
console.log(user.arrowGreet());    // Hello from undefined (global this.name)
```

---

## When to Use Each

### Use Function Declarations When:
- You want hoisting (can call before declaring)
- Writing traditional code
- Creating standalone functions

```javascript
function sayHello(name) {
  return "Hello, " + name;
}
```

### Use Function Expressions When:
- You need the function to be evaluated at a specific point
- You want to assign the function to a variable
- You need a named function expression for recursion

```javascript
const greet = function(name) {
  return "Hello, " + name;
};
```

### Use Arrow Functions When:
- You want concise syntax
- You don't need your own `this`
- Writing modern, functional code

```javascript
const add = (a, b) => a + b;
```

---

## Common Mistakes

### Mistake 1: Expecting function expressions to be hoisted

```javascript
// ❌ WRONG
add(5, 3);  // Error: add is not a function

const add = function(a, b) {
  return a + b;
};

// ✅ CORRECT
const add = function(a, b) {
  return a + b;
};

add(5, 3);  // 8
```

### Mistake 2: Using arrow function in object method and expecting 'this'

```javascript
// ❌ WRONG
const person = {
  name: "Alice",
  greet: () => {
    console.log(this.name);  // undefined (this is global)
  }
};

// ✅ CORRECT
const person = {
  name: "Alice",
  greet: function() {
    console.log(this.name);  // "Alice"
  }
};
```

### Mistake 3: Trying to use constructor with arrow function

```javascript
// ❌ WRONG
const Person = (name) => {
  this.name = name;
};
const p = new Person("Alice");  // Error: arrow functions can't be constructors

// ✅ CORRECT
function Person(name) {
  this.name = name;
}
const p = new Person("Alice");  // Works
```

### Mistake 4: Unnecessary complexity in arrow functions

```javascript
// ❌ WRONG (over-complicated)
const add = (a, b) => {
  const result = a + b;
  return result;
};

// ✅ CORRECT (concise)
const add = (a, b) => a + b;
```

---

## Next Steps

1. Write functions using all three methods
2. Test hoisting behavior
3. Observe `this` differences
4. Move to: **02_execution_context_and_call_stack.md**
