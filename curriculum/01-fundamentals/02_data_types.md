# Phase 1, Concept 2: Data Types (Primitive vs Reference)

## Why This Matters

JavaScript values come in two categories: **primitives** and **references**.

Understanding the difference is critical because:
- Primitives are **copied by value** (independent copies)
- References are **copied by reference** (same object, multiple pointers)
- This affects how variables behave when assigned or passed to functions
- Debugging becomes much easier when you understand what's really happening

---

## Primitives: Simple, Immutable Values

### What Are Primitives?

Primitives are the **simplest data types** in JavaScript:
1. **Number** (5, 3.14, -10, Infinity)
2. **String** ("hello", 'world', `template`)
3. **Boolean** (true, false)
4. **Undefined** (no value assigned)
5. **Null** (intentional absence of value)
6. **Symbol** (unique identifier, advanced)
7. **BigInt** (very large integers, advanced)

**Key characteristics of primitives:**
- Stored directly on the **call stack**
- **Immutable** (can't change them)
- **Copied by value** (assignments create independent copies)
- Compared **by value** (two numbers are equal if their values are equal)

### Immutability: Primitives Can't Change

```javascript
// Numbers are immutable
let num = 5;
num = num + 1;  // Don't change 5, create a new value (6)
// The engine creates 6, then points 'num' to it

// Strings are immutable
let message = "hello";
message = message + " world";  // Don't change "hello", create new string
// Creates "hello world", then points 'message' to it

// Can't modify a primitive in place
let str = "abc";
str[0] = "x";  // This does nothing
console.log(str);  // Still "abc" (immutable)

// To "change" a string, you must create a new one
let str2 = "abc";
str2 = "x" + str2.slice(1);  // Create "xbc", reassign str2
console.log(str2);  // "xbc"
```

### Copy by Value: Primitives Are Independent

```javascript
let x = 5;
let y = x;  // y is a COPY of x's value
y = 10;

console.log(x);  // 5 (unchanged)
console.log(y);  // 10

// Why? x and y are independent. y = x copied the value 5
// When you change y, it doesn't affect x
```

**Visual representation:**

```
Initial:
x: [5]    (5 stored on stack)
y: [5]    (copy of 5 stored on stack)

After y = 10:
x: [5]    (still 5)
y: [10]   (now 10, completely separate)
```

### Compared by Value

```javascript
5 === 5           // true (same value)
"hello" === "hello"  // true (same value)
true === true     // true (same value)

let str1 = "hello";
let str2 = "hello";
str1 === str2     // true (same value, even though different strings)
```

---

## Reference Types: Complex, Mutable Objects

### What Are Reference Types?

Reference types are complex data structures:
1. **Object** ({key: value})
2. **Array** ([1, 2, 3])
3. **Function** (function() {})
4. **Date** (new Date())
5. **RegExp** (pattern matching)
6. ... and others

**Key characteristics:**
- Stored on the **heap** (large memory area)
- Variable on stack stores an **address/reference** to the heap
- **Mutable** (can change contents)
- **Copied by reference** (assignments share the same object)
- Compared **by reference** (two objects are equal only if they're the same object)

### Understanding References

When you create an object, here's what happens:

```javascript
let person = { name: "Alice", age: 30 };

// Stack: person = [0x1000]  (address 0x1000)
// Heap at 0x1000: { name: "Alice", age: 30 }

// The variable stores the ADDRESS, not the object itself
```

### Mutable: Objects Can Be Changed

```javascript
// Objects are mutable (can be changed)
let person = { name: "Alice" };
person.name = "Bob";  // Change a property
person.age = 30;      // Add a new property
console.log(person);  // { name: "Bob", age: 30 }

// Arrays are mutable
let numbers = [1, 2, 3];
numbers[0] = 10;  // Change a value
numbers.push(4);  // Add a value
console.log(numbers);  // [10, 2, 3, 4]

// Functions are mutable (can have properties added)
function greet() {
  return "Hello";
}
greet.count = 0;  // Add a property to function
greet.increment = function() { this.count++; };
console.log(greet.count);  // 0
```

### Copy by Reference: Objects Are Shared

```javascript
let obj1 = { name: "Alice" };
let obj2 = obj1;  // obj2 points to THE SAME object

obj2.name = "Bob";  // Change through obj2
console.log(obj1.name);  // "Bob" (obj1 sees the change!)

// Why? obj1 and obj2 are both pointing to the same object on the heap
```

**Visual representation:**

```
Initial:
obj1: [0x1000]  (address of object on heap)
obj2: [0x1000]  (same address)

Heap at 0x1000: { name: "Alice" }

After obj2.name = "Bob":
obj1: [0x1000]  (still pointing to same address)
obj2: [0x1000]  (still pointing to same address)

Heap at 0x1000: { name: "Bob" }  (changed through either variable)
```

### Compared by Reference

```javascript
let obj1 = { name: "Alice" };
let obj2 = { name: "Alice" };
obj1 === obj2  // false (different objects on heap)

let obj3 = obj1;
obj1 === obj3  // true (same object on heap)

let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
arr1 === arr2  // false (different arrays)

let arr3 = arr1;
arr1 === arr3  // true (same array)
```

---

## Code Example: Primitives vs References

```javascript
// ========================================
// PRIMITIVES (Copy by Value)
// ========================================

console.log("=== PRIMITIVES ===\n");

// Numbers
let a = 5;
let b = a;
b = 10;
console.log("Primitives - Numbers:");
console.log("a:", a);  // 5 (unchanged)
console.log("b:", b);  // 10 (independent)

// Strings
let str1 = "hello";
let str2 = str1;
str2 = "goodbye";
console.log("\nPrimitives - Strings:");
console.log("str1:", str1);  // "hello"
console.log("str2:", str2);  // "goodbye"

// ========================================
// REFERENCES (Copy by Reference)
// ========================================

console.log("\n=== REFERENCES ===\n");

// Objects
let obj1 = { name: "Alice", age: 30 };
let obj2 = obj1;  // Both point to same object
obj2.name = "Bob";
console.log("References - Objects:");
console.log("obj1:", obj1);  // { name: "Bob", age: 30 } (changed!)
console.log("obj2:", obj2);  // { name: "Bob", age: 30 } (same object)

// Arrays
let arr1 = [1, 2, 3];
let arr2 = arr1;  // Both point to same array
arr2.push(4);
console.log("\nReferences - Arrays:");
console.log("arr1:", arr1);  // [1, 2, 3, 4] (changed!)
console.log("arr2:", arr2);  // [1, 2, 3, 4] (same array)

// ========================================
// COMPARISON: Primitives vs References
// ========================================

console.log("\n=== COMPARISON ===\n");

// Primitives compared by value
console.log("5 === 5:", 5 === 5);  // true (same value)

// References compared by reference
let obj3 = { value: 5 };
let obj4 = { value: 5 };
console.log("obj3 === obj4:", obj3 === obj4);  // false (different objects)

let obj5 = obj3;
console.log("obj3 === obj5:", obj3 === obj5);  // true (same object)

// ========================================
// PRACTICAL EXAMPLE: Function Arguments
// ========================================

console.log("\n=== FUNCTION ARGUMENTS ===\n");

function changePrimitive(num) {
  num = 100;  // Change the parameter
}

function changeReference(obj) {
  obj.value = 100;  // Change a property of the object
}

// With primitives
let myNum = 5;
changePrimitive(myNum);
console.log("myNum after function:", myNum);  // 5 (unchanged)

// With references
let myObj = { value: 5 };
changeReference(myObj);
console.log("myObj after function:", myObj);  // { value: 100 } (changed!)
```

---

## Understanding typeof

The `typeof` operator tells you what type a value is:

```javascript
// Primitives
typeof 5              // "number"
typeof "hello"        // "string"
typeof true           // "boolean"
typeof undefined      // "undefined"
typeof Symbol("id")   // "symbol"
typeof 123n           // "bigint"

// References (tricky!)
typeof {}             // "object"
typeof []             // "object" (arrays are objects!)
typeof function() {}  // "function" (functions are special objects)
typeof null           // "object" (historical bug - null is actually a primitive)

// Note: typeof null returns "object" but null is a primitive!
// This is a famous bug in JavaScript, but it's kept for compatibility
```

---

## Null vs Undefined

Both represent "no value" but are used differently:

```javascript
// undefined: no value assigned
let x;
console.log(x);  // undefined

function test() {
  // no return statement
}
console.log(test());  // undefined

// null: intentional absence of value
let person = null;  // Explicitly set to "no value"
let data = fetchData();  // Returns null if no data

if (person === null) {
  console.log("No person assigned");
}
```

---

## Shallow vs Deep Copy

Understanding copying is crucial when working with references:

### Shallow Copy: Only First Level

```javascript
// Shallow copy
let original = { name: "Alice", address: { city: "NYC" } };
let shallow = { ...original };  // Create shallow copy

shallow.name = "Bob";           // Doesn't affect original
console.log(original.name);     // "Alice"

shallow.address.city = "LA";    // Affects original! (shared reference)
console.log(original.address.city);  // "LA"
```

### Deep Copy: All Levels

```javascript
// Deep copy
let original = { name: "Alice", address: { city: "NYC" } };
let deep = JSON.parse(JSON.stringify(original));  // Deep copy

deep.name = "Bob";              // Doesn't affect original
deep.address.city = "LA";       // Doesn't affect original
console.log(original);          // { name: "Alice", address: { city: "NYC" } }
console.log(deep);              // { name: "Bob", address: { city: "LA" } }
```

---

## Common Mistakes

### Mistake 1: Thinking objects can be compared with ===

```javascript
// ❌ WRONG
let obj1 = { name: "Alice" };
let obj2 = { name: "Alice" };
if (obj1 === obj2) {  // Always false!
  console.log("Same object");
}

// ✅ CORRECT
if (obj1 === obj2) {  // Still false (different objects)
  console.log("Same object");
} else {
  console.log("Different objects");  // This runs
}

// ✅ CORRECT (compare by reference)
let obj3 = obj1;
if (obj1 === obj3) {  // true (same object)
  console.log("Same object");
}
```

### Mistake 2: Unintentionally sharing objects

```javascript
// ❌ WRONG
let user = { name: "Alice", scores: [10, 20, 30] };
let userCopy = user;  // Shallow copy, shares scores array

userCopy.scores.push(40);
console.log(user.scores);  // [10, 20, 30, 40] (affected!)

// ✅ CORRECT
let userCopy2 = {
  ...user,  // Shallow copy of user
  scores: [...user.scores]  // Deep copy of scores array
};
userCopy2.scores.push(40);
console.log(user.scores);  // [10, 20, 30] (not affected)
```

### Mistake 3: Modifying array through function

```javascript
// ❌ WRONG (unintended side effect)
let numbers = [1, 2, 3];

function addNumber(arr) {
  arr.push(4);  // Modifies the original array!
}

addNumber(numbers);
console.log(numbers);  // [1, 2, 3, 4] (original changed)

// ✅ CORRECT (return new array)
function addNumber2(arr) {
  return [...arr, 4];  // Create new array, don't modify original
}

let result = addNumber2(numbers);
console.log(numbers);  // [1, 2, 3] (unchanged)
console.log(result);   // [1, 2, 3, 4]
```

### Mistake 4: Assuming strings can be modified

```javascript
// ❌ WRONG
let message = "hello";
message[0] = "H";  // Doesn't work (strings immutable)
console.log(message);  // Still "hello"

// ✅ CORRECT
let message2 = "hello";
message2 = message2.charAt(0).toUpperCase() + message2.slice(1);
console.log(message2);  // "Hello"
```

### Mistake 5: Not understanding "copy" creates shallow copy

```javascript
// ❌ WRONG ASSUMPTION
let original = { user: { name: "Alice" } };
let copy = { ...original };  // Shallow copy
copy.user.name = "Bob";
console.log(original.user.name);  // "Bob" (affected!)
// Spread operator only copies top level

// ✅ CORRECT
let copy2 = {
  user: { ...original.user }  // Also copy nested object
};
copy2.user.name = "Bob";
console.log(original.user.name);  // "Alice" (not affected)
```

---

## Next Steps

1. Create variables with different data types
2. Test copying primitives vs references
3. Try modifying objects and observe shared references
4. Move to: **03_operators_and_expressions.md**
