# Phase 1, Concept 1: var, let, const (Scope and Hoisting)

## Why This Matters

In JavaScript, there are three ways to declare variables:
- `var` (old way, avoid in modern code)
- `let` (modern way)
- `const` (modern way, immutable)

The **difference between them** is critical because:
- They have different **scopes** (where they're accessible)
- They behave differently with **hoisting** (how the engine treats them)
- `const` prevents accidental reassignment
- Using the wrong one causes bugs

---

## Understanding Scope

**Scope** means: "Where is this variable accessible?"

JavaScript has different levels of scope:
- **Global scope**: accessible everywhere
- **Function scope**: only accessible inside a function
- **Block scope**: only accessible inside a block `{ }`

### Scope Hierarchy (from broadest to narrowest):
```
Global Scope
  └── Function Scope
        └── Block Scope (if, for, while, { })
```

A variable in a narrower scope can access variables in a broader scope, but not the reverse.

---

## var: Function-Scoped (Avoid in Modern Code)

### How var Works

`var` creates a variable that is:
- **Function-scoped** (only function boundaries matter)
- **Hoisted** (defined at the top of its function)
- **Re-declarable** (can declare the same name twice)
- **Reassignable** (can change the value)

### Code Example: var Scope

```javascript
// EXAMPLE 1: var ignores block scope
if (true) {
  var x = 5;
}
console.log(x);  // Output: 5
// x is accessible OUTSIDE the if block!
// Because var is function-scoped, not block-scoped

// EXAMPLE 2: var is function-scoped
function myFunction() {
  var y = 10;
}
console.log(y);  // Error: y is not defined
// y is NOT accessible outside the function
// This is the only boundary var respects

// EXAMPLE 3: var can be re-declared
var z = 1;
var z = 2;  // No error! z is just reassigned
console.log(z);  // Output: 2

// EXAMPLE 4: var in a loop
for (var i = 0; i < 3; i++) {
  console.log(i);  // 0, 1, 2
}
console.log(i);  // Output: 3
// i is still accessible after the loop!
// This is a common source of bugs
```

### Why var Is Problematic

```javascript
// ❌ PROBLEM: var ignores block scope
if (true) {
  var message = "Hello";
}
console.log(message);  // Accessible! (shouldn't be)

// ❌ PROBLEM: var in loops causes unexpected behavior
var array = [];
for (var i = 0; i < 3; i++) {
  array.push(function() {
    return i;
  });
}
console.log(array[0]());  // Output: 3 (not 0!)
// Why? Because all functions reference the same 'i'
// By the time you call them, i = 3

// ❌ PROBLEM: var can be re-declared
var name = "Alice";
var name = "Bob";  // No error, but confusing
console.log(name);  // "Bob"
```

---

## let: Block-Scoped (Use This)

### How let Works

`let` creates a variable that is:
- **Block-scoped** (respects block boundaries)
- **Hoisted but unusable before declaration** (Temporal Dead Zone)
- **NOT re-declarable** (can't declare the same name twice in same scope)
- **Reassignable** (can change the value)

### Code Example: let Scope

```javascript
// EXAMPLE 1: let respects block scope
if (true) {
  let x = 5;
}
console.log(x);  // Error: x is not defined
// x is NOT accessible outside the if block

// EXAMPLE 2: let in a loop (fixed!)
let array = [];
for (let i = 0; i < 3; i++) {
  array.push(function() {
    return i;
  });
}
console.log(array[0]());  // Output: 0 (correct!)
// Each iteration has its own 'i'
// This is the behavior you usually want

// EXAMPLE 3: let cannot be re-declared in same scope
let name = "Alice";
let name = "Bob";  // Error: Identifier 'name' has already been declared

// EXAMPLE 4: let can be re-declared in different scope
let y = 1;
if (true) {
  let y = 2;  // Different scope, allowed
  console.log(y);  // Output: 2
}
console.log(y);  // Output: 1 (outer y unchanged)

// EXAMPLE 5: Temporal Dead Zone
console.log(z);  // Error: Cannot access 'z' before initialization
let z = 10;
// You can't use 'z' before the line where it's declared
// This is a "safe" behavior - prevents bugs
```

### Why let Is Better

```javascript
// ✅ GOOD: let respects block boundaries
if (true) {
  let message = "Hello";
}
// message is NOT accessible here (as expected)

// ✅ GOOD: let in loops works correctly
let array = [];
for (let i = 0; i < 3; i++) {
  array.push(() => i);
}
console.log(array[0]());  // 0 (each closure has its own i)
console.log(array[1]());  // 1
console.log(array[2]());  // 2

// ✅ GOOD: let prevents accidental re-declaration
let name = "Alice";
// let name = "Bob";  // Error caught immediately
```

---

## const: Block-Scoped, Immutable (Use This for Values That Don't Change)

### How const Works

`const` creates a variable that is:
- **Block-scoped** (same as let)
- **NOT reassignable** (can't change the value)
- **NOT re-declarable** (can't declare twice in same scope)
- **Immutable reference** (for objects/arrays, the reference doesn't change, but contents can)

### Important: const Is Not Truly Immutable

**Critical distinction:**
- `const` prevents **reassignment** of the variable
- `const` does NOT prevent **mutation** of objects/arrays

```javascript
// EXAMPLE 1: const prevents reassignment
const x = 5;
x = 10;  // Error: Assignment to constant variable

// EXAMPLE 2: const does NOT prevent mutation
const person = { name: "Alice", age: 30 };
person.name = "Bob";  // NO ERROR - mutation is allowed
person.age = 31;      // NO ERROR - mutation is allowed
console.log(person);  // { name: "Bob", age: 31 }

// EXAMPLE 3: const does NOT prevent array mutation
const numbers = [1, 2, 3];
numbers.push(4);      // NO ERROR - mutation is allowed
numbers[0] = 10;      // NO ERROR - mutation is allowed
console.log(numbers); // [10, 2, 3, 4]

// EXAMPLE 4: const PREVENTS reassignment of objects
const person2 = { name: "Charlie" };
person2 = { name: "David" };  // Error: Assignment to constant variable
// Can't reassign the variable, but you can change its contents

// EXAMPLE 5: const respects block scope
if (true) {
  const y = 5;
}
console.log(y);  // Error: y is not defined
```

### Code: Demonstrating const vs Reassignment vs Mutation

```javascript
// REASSIGNMENT = changing what the variable points to
const arr = [1, 2, 3];
arr = [4, 5, 6];  // Error: can't reassign

// MUTATION = changing the contents of an object/array
const arr2 = [1, 2, 3];
arr2.push(4);     // OK: mutation allowed
arr2[0] = 10;     // OK: mutation allowed
console.log(arr2); // [10, 2, 3, 4]

// For numbers/strings, mutation isn't possible anyway
const num = 5;
num = 10;  // Error: reassignment not allowed
```

---

## Hoisting: How the Engine Treats Declarations

**Hoisting** is when the JavaScript engine moves variable and function declarations to the top of their scope during compilation.

### How Hoisting Works for var

```javascript
// Code you write:
console.log(x);
var x = 5;

// What the engine sees (after hoisting):
var x;           // Declaration hoisted to top (value is undefined)
console.log(x);  // Output: undefined (x exists but has no value yet)
x = 5;           // Assignment stays where it was
```

`var` is hoisted and initialized as `undefined`. You can access it before the line where it's declared.

### How Hoisting Works for let and const

```javascript
// Code you write:
console.log(y);
let y = 5;

// What the engine sees (after hoisting):
// y is hoisted but NOT initialized
console.log(y);  // Error: Cannot access 'y' before initialization
y = 5;
```

`let` and `const` are hoisted but not initialized. The area between the top of the scope and the declaration is called the **Temporal Dead Zone**.

**Temporal Dead Zone (TDZ)**: The period where a variable is hoisted but not yet initialized. Accessing it throws an error.

### Code Example: Hoisting Behavior

```javascript
// EXAMPLE 1: var hoisting
console.log("var example:");
console.log(a);  // Output: undefined (hoisted, initialized as undefined)
var a = 1;
console.log(a);  // Output: 1

// EXAMPLE 2: let hoisting (Temporal Dead Zone)
console.log("let example:");
console.log(b);  // Error: Cannot access 'b' before initialization
let b = 2;

// EXAMPLE 3: function hoisting (declared functions)
sayHello();      // Output: Hello! (function hoisted completely)
function sayHello() {
  console.log("Hello!");
}

// EXAMPLE 4: function expression hoisting (with var)
sayGoodbye();    // Error: sayGoodbye is not a function
var sayGoodbye = function() {
  console.log("Goodbye!");
};
// Why error? Because 'var sayGoodbye' is hoisted as undefined
// The function assignment happens after the call
```

---

## Summary: var vs let vs const

| Feature | var | let | const |
|---------|-----|-----|-------|
| **Scope** | Function | Block | Block |
| **Hoisting** | Yes, initialized as undefined | Yes, TDZ | Yes, TDZ |
| **Re-declare** | Yes | No | No |
| **Reassign** | Yes | Yes | No |
| **Use in modern code** | ❌ Avoid | ✅ Use | ✅ Use |

### When to Use Each

**Use `const` by default:**
```javascript
const name = "Alice";     // Value won't change
const age = 30;           // Value won't change
const config = { ... };   // Reference won't change
```

**Use `let` when you need to reassign:**
```javascript
let counter = 0;
counter++;                // Need to change the value
counter++;

let name = "Alice";
name = "Bob";             // Need to change the value
```

**Never use `var`:**
```javascript
// ❌ Don't do this
var oldStyle = 5;

// ✅ Do this instead
const modernStyle = 5;
```

---

## Common Mistakes

### Mistake 1: Using var in modern code

```javascript
// ❌ WRONG
var message = "Hello";

// ✅ CORRECT
const message = "Hello";
```

### Mistake 2: Thinking const makes objects immutable

```javascript
// ❌ WRONG ASSUMPTION
const person = { name: "Alice" };
person.name = "Bob";  // This works! const is not truly immutable

// ✅ CORRECT understanding
// const prevents reassignment, not mutation
const person = { name: "Alice" };
person.name = "Bob";       // OK - mutation
person = { name: "David" }; // Error - reassignment
```

### Mistake 3: Trying to use variables before declaration with let

```javascript
// ❌ WRONG
console.log(x);
let x = 5;
// Error: Cannot access 'x' before initialization

// ✅ CORRECT
let x = 5;
console.log(x);  // Output: 5
```

### Mistake 4: Re-declaring with let in the same scope

```javascript
// ❌ WRONG
let name = "Alice";
let name = "Bob";
// Error: Identifier 'name' has already been declared

// ✅ CORRECT
let name = "Alice";
name = "Bob";  // Reassign instead of re-declare
```

### Mistake 5: Forgetting const prevents only reassignment

```javascript
// ❌ WRONG EXPECTATION
const arr = [1, 2, 3];
arr.push(4);  // "This should fail because arr is const"
console.log(arr); // [1, 2, 3, 4] - but it doesn't fail!

// ✅ CORRECT UNDERSTANDING
const arr = [1, 2, 3];
arr.push(4);      // OK - mutation is allowed
arr = [];         // Error - reassignment is not allowed
```

---

## Next Steps

1. Try creating variables with var, let, and const
2. Test what happens when you try to access them outside their scope
3. Observe the hoisting behavior
4. Move to: **02_data_types.md**
