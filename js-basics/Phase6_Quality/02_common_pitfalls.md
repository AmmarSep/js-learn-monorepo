# Phase 6, Concept 2: Common JavaScript Pitfalls

## Critical Pitfalls to Avoid

### 1. Loose Equality (==) vs Strict Equality (===)

```javascript
// ❌ WRONG: Loose equality has weird rules
5 == "5"        // true (converts to same type)
0 == false      // true
null == undefined  // true (special case)

// ✅ CORRECT: Use strict equality
5 === "5"       // false (different types)
0 === false     // false
null === undefined  // false
```

**Rule: Always use ===**

---

### 2. Truthy and Falsy Values

```javascript
// ❌ WRONG: Empty arrays and objects are truthy!
if ([]) {
  console.log("Empty array is truthy");  // Runs!
}

if ({}) {
  console.log("Empty object is truthy");  // Runs!
}

// ✅ CORRECT: Check length or size
if ([].length > 0) {
  console.log("Array has items");
}

if (Object.keys({}).length > 0) {
  console.log("Object has properties");
}
```

---

### 3. Modifying Arrays While Looping

```javascript
// ❌ WRONG: Changes index, skips elements
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 2) {
    arr.splice(i, 1);  // Skips next element
  }
}

// ✅ CORRECT: Use filter
let arr = [1, 2, 3, 4, 5];
arr = arr.filter(num => num <= 2);
```

---

### 4. var Scope Issues

```javascript
// ❌ WRONG: var ignores block scope
for (var i = 0; i < 3; i++) {
  // i is accessible after loop
}
console.log(i);  // 3 (still exists!)

// ✅ CORRECT: Use let for block scope
for (let i = 0; i < 3; i++) {
  // i is only accessible inside loop
}
console.log(i);  // Error: i is not defined
```

---

### 5. Callback in Loops

```javascript
// ❌ WRONG: All callbacks reference same variable
var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(function() {
    return i;  // All reference same i
  });
}
console.log(funcs[0]());  // 3 (not 0!)

// ✅ CORRECT: Use let for block scope
let funcs = [];
for (let i = 0; i < 3; i++) {
  funcs.push(function() {
    return i;  // Each has its own i
  });
}
console.log(funcs[0]());  // 0
```

---

### 6. this Binding in Methods

```javascript
// ❌ WRONG: Arrow function loses this binding
let user = {
  name: "Alice",
  greet: () => {
    console.log(this.name);  // undefined
  }
};

// ✅ CORRECT: Use regular function
let user = {
  name: "Alice",
  greet: function() {
    console.log(this.name);  // "Alice"
  }
};
```

---

### 7. Comparing Objects and Arrays

```javascript
// ❌ WRONG: Objects compared by reference
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log(arr1 === arr2);  // false

let obj1 = { x: 1 };
let obj2 = { x: 1 };
console.log(obj1 === obj2);  // false

// ✅ CORRECT: Compare by value when needed
console.log(JSON.stringify(arr1) === JSON.stringify(arr2));  // true

// Better: Use a comparison function
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, idx) => val === b[idx]);
}
```

---

### 8. NaN (Not a Number)

```javascript
// ❌ WRONG: NaN is not equal to itself
let result = 0 / 0;  // NaN
console.log(result === NaN);  // false!

// ✅ CORRECT: Use Number.isNaN()
console.log(Number.isNaN(result));  // true
console.log(isNaN("hello"));  // true (coerces to number)
console.log(Number.isNaN("hello"));  // false (no coercion)
```

---

### 9. Asynchronous Race Conditions

```javascript
// ❌ WRONG: Race condition (data might not be set)
let data;

async function fetchData() {
  data = await fetch("/api/data").then(r => r.json());
}

fetchData();
console.log(data);  // undefined (not set yet!)

// ✅ CORRECT: Wait for async operation
async function main() {
  let data = await fetchData();
  console.log(data);  // Now it's set
}

main();
```

---

### 10. Not Checking API Responses

```javascript
// ❌ WRONG: Assumes all responses are successful
fetch("/api/data")
  .then(response => response.json())
  .then(data => console.log(data));
// If server returns 404 or 500, still tries to parse JSON!

// ✅ CORRECT: Check response status
fetch("/api/data")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log("Error:", error));
```

---

### 11. Forgetting preventDefault()

```javascript
// ❌ WRONG: Form still submits to server
form.addEventListener("submit", function(event) {
  let name = form.querySelector("input").value;
  sendData(name);
  // Form still submits, page reloads
});

// ✅ CORRECT: Prevent default behavior
form.addEventListener("submit", function(event) {
  event.preventDefault();  // Stop form submission
  let name = form.querySelector("input").value;
  sendData(name);
});
```

---

### 12. Mutating Shared Objects

```javascript
// ❌ WRONG: Unintended side effects
let original = [1, 2, 3];
let copy = original;  // Not a copy, same reference!

copy.push(4);
console.log(original);  // [1, 2, 3, 4] (affected!)

// ✅ CORRECT: Create a real copy
let copy = [...original];  // Spread operator creates new array
copy.push(4);
console.log(original);  // [1, 2, 3] (unchanged)
```

---

### 13. Silent Failures

```javascript
// ❌ WRONG: No error, but something's wrong
let obj = {};
obj.deeply.nested.property = "value";
// No error, but creates undefined references!

// ✅ CORRECT: Check existence first
if (obj && obj.deeply && obj.deeply.nested) {
  obj.deeply.nested.property = "value";
}

// ✅ MODERN: Use optional chaining
obj?.deeply?.nested?.property = "value";
```

---

### 14. Memory Leaks with Closures

```javascript
// ❌ WRONG: Closure keeps large data in memory
function processData(largeArray) {
  return function() {
    console.log("Processing...");
    // largeArray is captured and can't be garbage collected
  };
}

let callback = processData(hugeDataSet);

// ✅ CORRECT: Only capture what you need
function processData(largeArray) {
  let firstItem = largeArray[0];  // Extract what you need
  return function() {
    console.log("First item:", firstItem);
    // Only firstItem is captured
  };
}
```

---

### 15. Type Coercion Confusion

```javascript
// ❌ WRONG: Unexpected type coercion
"5" - 2        // 3 (coerces to number)
"5" + 2        // "52" (coerces to string)
"5" * 2        // 10 (coerces to number)
null + 1       // 1 (null coerced to 0)
undefined + 1  // NaN (undefined coerced to NaN)

// ✅ CORRECT: Be explicit about types
Number("5") - 2     // 3
"5" + String(2)     // "52"
Number("5") * 2     // 10
parseInt("5", 10) - 2  // 3
```

---

## Code Example: Pitfall Prevention

```javascript
// ========================================
// COMMON PITFALLS AND HOW TO AVOID THEM
// ========================================

console.log("=== EQUALITY ===\n");

// Pitfall: loose equality
console.log("5 == '5':", 5 == "5");   // true (unexpected!)
console.log("5 === '5':", 5 === "5"); // false (safe)

console.log("\n=== TRUTHY/FALSY ===\n");

// Pitfall: empty arrays are truthy
if ([]) {
  console.log("Empty array is truthy");
} else {
  console.log("Empty array is falsy");
}

console.log("\n=== SCOPE ===\n");

// Pitfall: var doesn't respect block scope
for (var i = 0; i < 3; i++) { }
console.log("After var loop, i =", i);  // 3

for (let j = 0; j < 3; j++) { }
// console.log(j);  // Error: j is not defined

console.log("\n=== CLOSURES IN LOOPS ===\n");

// Pitfall: all closures reference same variable
var funcs = [];
for (var k = 0; k < 3; k++) {
  funcs.push(function() {
    return k;
  });
}
console.log("funcs[0]():", funcs[0]());  // 3 (not 0!)

// Fixed with let
let funcs2 = [];
for (let m = 0; m < 3; m++) {
  funcs2.push(function() {
    return m;
  });
}
console.log("funcs2[0]():", funcs2[0]());  // 0

console.log("\n=== OBJECT COMPARISON ===\n");

let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log("arr1 === arr2:", arr1 === arr2);  // false
console.log("Same values:", JSON.stringify(arr1) === JSON.stringify(arr2));  // true

console.log("\n=== NaN ===\n");

let invalid = 0 / 0;
console.log("invalid === NaN:", invalid === NaN);  // false (pitfall!)
console.log("Number.isNaN(invalid):", Number.isNaN(invalid));  // true

console.log("\n=== TYPE COERCION ===\n");

console.log("'5' - 2:", "5" - 2);    // 3
console.log("'5' + 2:", "5" + 2);    // "52"
console.log("'5' * 2:", "5" * 2);    // 10
```

---

## Pitfall Checklist

Before deploying code, check:

1. [ ] Using === instead of ==
2. [ ] Properly handling async operations (await, .then())
3. [ ] No unintended mutations of shared objects
4. [ ] Correct scope (let/const, not var)
5. [ ] Event handlers prevent default when needed
6. [ ] API responses checked for status
7. [ ] Proper error handling with try/catch
8. [ ] No infinite loops or recursion
9. [ ] No memory leaks from closures
10. [ ] Edge cases handled (null, undefined, empty arrays)

---

## Summary

JavaScript has quirks that catch beginners:
- Always use `===`
- Understand truthy/falsy
- Use `let`/`const`, not `var`
- Be careful with object references
- Handle async operations properly
- Check API responses
- Use try/catch for errors
- Prevent default behavior when needed
- Understand closures and scope
- Test edge cases

The more you code, the more these pitfalls become habits to avoid.

---

## Final Steps

1. Review all phases 1-6
2. Practice writing small projects
3. Use the browser DevTools to debug
4. Build larger applications using these fundamentals
5. Read other people's JavaScript code
6. Continue learning modern JavaScript features
