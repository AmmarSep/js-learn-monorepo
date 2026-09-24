# Phase 3, Concept 2: Arrays and Array Methods

## Why This Matters

Arrays are ordered collections of values. Most JavaScript code works with arrays:
- Processing lists of data
- API responses are arrays
- Array methods (map, filter, reduce) are essential for functional programming

Understanding arrays is critical because:
- You use arrays constantly
- Array methods are more powerful than loops
- They enable functional programming patterns
- Modern JavaScript relies heavily on array methods

---

## Creating Arrays

```javascript
// Array literal (most common)
let fruits = ["apple", "banana", "orange"];

// Array constructor
let numbers = new Array(1, 2, 3);

// Empty array
let empty = [];

// Mixed types
let mixed = [1, "hello", true, { name: "Alice" }];
```

---

## Accessing Array Elements

Arrays use **index numbers** starting from 0:

```javascript
let fruits = ["apple", "banana", "orange"];

console.log(fruits[0]);   // "apple" (first element)
console.log(fruits[1]);   // "banana" (second element)
console.log(fruits[2]);   // "orange" (third element)
console.log(fruits.length);  // 3

// Access last element
console.log(fruits[fruits.length - 1]);  // "orange"
```

---

## Modifying Arrays

```javascript
let colors = ["red", "green", "blue"];

// Modify element
colors[0] = "yellow";  // ["yellow", "green", "blue"]

// Add element
colors[3] = "purple";  // ["yellow", "green", "blue", "purple"]

// Extend array
colors.length = 5;  // ["yellow", "green", "blue", "purple", undefined]
```

---

## Array Methods: Adding/Removing Elements

### push() - Add to end

```javascript
let arr = [1, 2];
arr.push(3, 4);
console.log(arr);  // [1, 2, 3, 4]
```

### pop() - Remove from end

```javascript
let arr = [1, 2, 3];
let last = arr.pop();
console.log(last);  // 3
console.log(arr);   // [1, 2]
```

### unshift() - Add to beginning

```javascript
let arr = [2, 3];
arr.unshift(1);
console.log(arr);  // [1, 2, 3]
```

### shift() - Remove from beginning

```javascript
let arr = [1, 2, 3];
let first = arr.shift();
console.log(first);  // 1
console.log(arr);    // [2, 3]
```

---

## Array Methods: Transformation

### map() - Transform each element

```javascript
let numbers = [1, 2, 3, 4];
let doubled = numbers.map(function(num) {
  return num * 2;
});
console.log(doubled);  // [2, 4, 6, 8]

// With arrow function
let tripled = numbers.map(num => num * 3);
console.log(tripled);  // [3, 6, 9, 12]
```

### filter() - Keep elements that match condition

```javascript
let numbers = [1, 2, 3, 4, 5];
let evens = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log(evens);  // [2, 4]

// With arrow function
let odds = numbers.filter(num => num % 2 !== 0);
console.log(odds);  // [1, 3, 5]
```

### reduce() - Combine all elements into one value

```javascript
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce(function(total, num) {
  return total + num;
}, 0);  // 0 is the initial value
console.log(sum);  // 10

// With arrow function
let product = numbers.reduce((acc, num) => acc * num, 1);
console.log(product);  // 24
```

---

## Array Methods: Searching

### indexOf() - Find first occurrence

```javascript
let fruits = ["apple", "banana", "orange", "banana"];
console.log(fruits.indexOf("banana"));  // 1
console.log(fruits.indexOf("grape"));   // -1 (not found)
```

### includes() - Check if contains

```javascript
let fruits = ["apple", "banana", "orange"];
console.log(fruits.includes("banana"));  // true
console.log(fruits.includes("grape"));   // false
```

### find() - Find first element matching condition

```javascript
let users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

let bob = users.find(user => user.name === "Bob");
console.log(bob);  // { name: "Bob", age: 30 }
```

### findIndex() - Find index matching condition

```javascript
let numbers = [10, 20, 30, 40];
let index = numbers.findIndex(num => num > 25);
console.log(index);  // 2 (30 is at index 2)
```

---

## Array Methods: Iteration

### forEach() - Run function for each element (no return)

```javascript
let fruits = ["apple", "banana", "orange"];
fruits.forEach(function(fruit, index) {
  console.log(index + ": " + fruit);
});
// 0: apple
// 1: banana
// 2: orange

// With arrow function
fruits.forEach((fruit, index) => {
  console.log(index + ": " + fruit);
});
```

---

## Array Methods: Other Useful Methods

### slice() - Create a new array from part of existing array

```javascript
let arr = [1, 2, 3, 4, 5];
let part = arr.slice(1, 3);  // From index 1, up to (not including) index 3
console.log(part);  // [2, 3]
console.log(arr);   // [1, 2, 3, 4, 5] (unchanged)
```

### splice() - Remove and insert elements (modifies original)

```javascript
let arr = [1, 2, 3, 4, 5];
let removed = arr.splice(2, 1, "three");  // At index 2, remove 1, insert "three"
console.log(removed);  // [3] (what was removed)
console.log(arr);      // [1, 2, "three", 4, 5]
```

### join() - Combine elements into a string

```javascript
let fruits = ["apple", "banana", "orange"];
let str = fruits.join(", ");
console.log(str);  // "apple, banana, orange"
```

### reverse() - Reverse order (modifies original)

```javascript
let arr = [1, 2, 3];
arr.reverse();
console.log(arr);  // [3, 2, 1]
```

### sort() - Sort elements (modifies original)

```javascript
let numbers = [3, 1, 4, 1, 5, 9];
numbers.sort();
console.log(numbers);  // [1, 1, 3, 4, 5, 9]

// Custom sort
let numbers2 = [3, 1, 4, 1, 5, 9];
numbers2.sort((a, b) => b - a);  // Descending
console.log(numbers2);  // [9, 5, 4, 3, 1, 1]
```

---

## Code Example: Array Methods in Action

```javascript
// ========================================
// ARRAY METHODS DEMONSTRATION
// ========================================

console.log("=== ARRAY BASICS ===\n");

let numbers = [1, 2, 3, 4, 5];
console.log("Original array:", numbers);
console.log("Length:", numbers.length);
console.log("First element:", numbers[0]);
console.log("Last element:", numbers[numbers.length - 1]);

console.log("\n=== MODIFYING ARRAYS ===\n");

let arr = [1, 2, 3];
arr.push(4);
console.log("After push(4):", arr);

arr.pop();
console.log("After pop():", arr);

arr.unshift(0);
console.log("After unshift(0):", arr);

console.log("\n=== MAP - TRANSFORM ===\n");

let values = [1, 2, 3, 4, 5];
let squared = values.map(n => n * n);
console.log("Original:", values);
console.log("Squared:", squared);

console.log("\n=== FILTER - SELECT ===\n");

let filtered = values.filter(n => n > 2);
console.log("Values > 2:", filtered);

console.log("\n=== REDUCE - COMBINE ===\n");

let sum = values.reduce((total, n) => total + n, 0);
console.log("Sum:", sum);

let product = values.reduce((total, n) => total * n, 1);
console.log("Product:", product);

console.log("\n=== FIND - SEARCH ===\n");

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

let user = users.find(u => u.name === "Bob");
console.log("Found user:", user);

console.log("\n=== FOREACH - ITERATE ===\n");

users.forEach((user, index) => {
  console.log(index + ": " + user.name);
});

console.log("\n=== CHAINING METHODS ===\n");

let result = numbers
  .filter(n => n > 2)
  .map(n => n * 2)
  .reduce((total, n) => total + n, 0);

console.log("Chain result (filter > map > reduce):", result);
// Filter: [3, 4, 5]
// Map: [6, 8, 10]
// Reduce: 24
```

---

## Array Methods: When to Use Each

| Method | Purpose | Returns | Modifies Original |
|--------|---------|---------|------------------|
| map() | Transform each element | New array | No |
| filter() | Select elements | New array | No |
| reduce() | Combine into one value | Any type | No |
| forEach() | Run function on each | undefined | No |
| find() | Find first match | Element or undefined | No |
| includes() | Check if contains | true/false | No |
| push() | Add to end | New length | Yes |
| pop() | Remove from end | Removed element | Yes |
| slice() | Copy part of array | New array | No |
| splice() | Remove/insert | Removed elements | Yes |
| sort() | Sort elements | Sorted array | Yes |
| reverse() | Reverse order | Reversed array | Yes |

---

## Common Mistakes

### Mistake 1: Mutating array in loop

```javascript
// ❌ WRONG: Modifying array while looping
let arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 2) {
    arr.splice(i, 1);  // Removes element, skips next
  }
}

// ✅ CORRECT: Use filter
let arr = [1, 2, 3, 4, 5];
arr = arr.filter(n => n <= 2);
```

### Mistake 2: Forgetting that map/filter return new arrays

```javascript
// ❌ WRONG
let numbers = [1, 2, 3];
numbers.map(n => n * 2);
console.log(numbers);  // [1, 2, 3] (unchanged!)

// ✅ CORRECT
let numbers = [1, 2, 3];
let doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6]
```

### Mistake 3: Comparing arrays with ===

```javascript
// ❌ WRONG
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log(arr1 === arr2);  // false (different arrays)

// ✅ CORRECT
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];
console.log(arr1.toString() === arr2.toString());  // true
// Or use JSON for complex objects
console.log(JSON.stringify(arr1) === JSON.stringify(arr2));  // true
```

### Mistake 4: Using sort() on numbers without custom function

```javascript
// ❌ WRONG: Sorts as strings
let numbers = [3, 1, 10, 2];
numbers.sort();
console.log(numbers);  // [1, 10, 2, 3] (wrong!)

// ✅ CORRECT: Use custom compare function
let numbers = [3, 1, 10, 2];
numbers.sort((a, b) => a - b);
console.log(numbers);  // [1, 2, 3, 10]
```

---

## Next Steps

1. Practice map, filter, and reduce
2. Chain multiple array methods
3. Use find() to search objects in arrays
4. Move to: **Phase 4 - Asynchronous JavaScript**
