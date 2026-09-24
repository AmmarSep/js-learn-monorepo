# Phase 1, Concept 4: Control Flow (if, for, while)

## Why This Matters

Control flow statements determine **which code runs and when**:
- `if/else` runs code based on conditions
- `for/while` repeats code multiple times
- `switch` selects from multiple options

Understanding control flow is critical because:
- Most real-world code uses conditional logic
- Loops are essential for processing multiple items
- Incorrect control flow causes logic bugs
- Many coding patterns depend on loops

---

## if/else Statements

`if` runs code only when a condition is true.

### Basic if

```javascript
if (condition) {
  // Code runs if condition is true
}

// Example
let age = 20;
if (age >= 18) {
  console.log("You can vote");  // Runs
}

if (age < 18) {
  console.log("You are too young");  // Doesn't run
}
```

### if/else

```javascript
if (condition) {
  // Code runs if condition is true
} else {
  // Code runs if condition is false
}

// Example
let score = 45;
if (score >= 60) {
  console.log("Pass");
} else {
  console.log("Fail");  // Runs
}
```

### if/else if/else

```javascript
if (condition1) {
  // Runs if condition1 is true
} else if (condition2) {
  // Runs if condition1 is false AND condition2 is true
} else if (condition3) {
  // Runs if condition1 and condition2 are false AND condition3 is true
} else {
  // Runs if all conditions are false
}

// Example
let grade = 75;
if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else if (grade >= 70) {
  console.log("C");  // Runs
} else {
  console.log("F");
}
```

---

## switch Statement

Use `switch` when you have many specific values to check:

```javascript
switch (value) {
  case 1:
    console.log("One");
    break;  // Important! Stops here
  case 2:
    console.log("Two");
    break;
  case 3:
    console.log("Three");
    break;
  default:
    console.log("Other");
}

// Example
let day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");  // Runs
    break;
  default:
    console.log("Unknown day");
}
```

**Important: Don't forget `break`!**

```javascript
// ❌ WRONG (fall-through)
switch (2) {
  case 1:
    console.log("One");
  case 2:
    console.log("Two");  // Runs
  case 3:
    console.log("Three");  // Also runs! (unwanted)
  default:
    console.log("Other");  // Also runs! (unwanted)
}
// Without break, execution "falls through" to the next case

// ✅ CORRECT (with break)
switch (2) {
  case 1:
    console.log("One");
    break;
  case 2:
    console.log("Two");  // Runs
    break;  // Stop here
  case 3:
    console.log("Three");  // Doesn't run
    break;
}
```

---

## for Loop

Repeats code a specific number of times:

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
// Output:
// 0
// 1
// 2
```

### Breaking Down the for Loop

```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// let i = 0;     Initialize: Create variable i, set to 0
// i < 3;         Condition: Check if i < 3 (true, run loop body)
// i++;           Increment: Add 1 to i after each iteration
```

### Loop Execution Flow

```javascript
// Detailed step-by-step:
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// Step 1: let i = 0 (setup)
// Step 2: Check i < 3 (0 < 3, true)
// Step 3: Run console.log(0)
// Step 4: i++ (i becomes 1)
// Step 5: Check i < 3 (1 < 3, true)
// Step 6: Run console.log(1)
// Step 7: i++ (i becomes 2)
// Step 8: Check i < 3 (2 < 3, true)
// Step 9: Run console.log(2)
// Step 10: i++ (i becomes 3)
// Step 11: Check i < 3 (3 < 3, false)
// Step 12: Exit loop
```

### Common Loop Patterns

```javascript
// Count from 0 to n-1
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

// Count from 1 to n
for (let i = 1; i <= 5; i++) {
  console.log(i);  // 1, 2, 3, 4, 5
}

// Count backwards
for (let i = 5; i > 0; i--) {
  console.log(i);  // 5, 4, 3, 2, 1
}

// Count by steps (skip 2)
for (let i = 0; i < 10; i += 2) {
  console.log(i);  // 0, 2, 4, 6, 8
}
```

### Loop Over Arrays

```javascript
let fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// Output:
// apple
// banana
// orange
```

### break and continue

```javascript
// break: Exit the loop completely
for (let i = 0; i < 5; i++) {
  if (i === 3) {
    break;  // Exit loop when i is 3
  }
  console.log(i);  // 0, 1, 2
}

// continue: Skip to next iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;  // Skip when i is 2
  }
  console.log(i);  // 0, 1, 3, 4
}
```

---

## while Loop

Repeats code while a condition is true:

```javascript
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
// Output:
// 0
// 1
// 2
```

### Comparison: for vs while

```javascript
// for loop (when you know how many iterations)
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// while loop (when you don't know in advance)
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}

// Both produce the same output
```

### do...while Loop

Runs the code at least once, then checks the condition:

```javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 3);
// Output:
// 0
// 1
// 2

// Even if condition is false, do...while runs once:
let j = 10;
do {
  console.log(j);  // Runs once
  j++;
} while (j < 3);
// Output:
// 10
```

---

## for...in Loop

Iterates over object properties:

```javascript
let person = { name: "Alice", age: 30, city: "NYC" };
for (let key in person) {
  console.log(key, person[key]);
}
// Output:
// name Alice
// age 30
// city NYC
```

**Note: Use for...of for arrays, for...in for objects**

---

## for...of Loop

Iterates over array values (not indices):

```javascript
let fruits = ["apple", "banana", "orange"];
for (let fruit of fruits) {
  console.log(fruit);
}
// Output:
// apple
// banana
// orange

// This is cleaner than:
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
```

---

## Code Example: All Control Flow Together

```javascript
// ========================================
// CONTROL FLOW DEMONSTRATION
// ========================================

console.log("=== IF/ELSE ===");
let age = 25;
if (age < 13) {
  console.log("Child");
} else if (age < 18) {
  console.log("Teen");
} else if (age < 65) {
  console.log("Adult");  // Runs
} else {
  console.log("Senior");
}

console.log("\n=== SWITCH ===");
let day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");  // Runs
    break;
  default:
    console.log("Unknown");
}

console.log("\n=== FOR LOOP ===");
for (let i = 0; i < 3; i++) {
  console.log("Iteration " + i);
}

console.log("\n=== WHILE LOOP ===");
let count = 0;
while (count < 3) {
  console.log("Count: " + count);
  count++;
}

console.log("\n=== FOR...OF LOOP ===");
let colors = ["red", "green", "blue"];
for (let color of colors) {
  console.log(color);
}

console.log("\n=== BREAK AND CONTINUE ===");
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    console.log("Skipping 2 with continue");
    continue;
  }
  if (i === 4) {
    console.log("Breaking at 4");
    break;
  }
  console.log(i);
}

console.log("\n=== NESTED LOOPS ===");
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 2; j++) {
    console.log(i + "-" + j);
  }
}
// Output: 1-1, 1-2, 2-1, 2-2, 3-1, 3-2
```

---

## Common Mistakes

### Mistake 1: Forgetting break in switch

```javascript
// ❌ WRONG
switch (value) {
  case 1:
    console.log("One");
  case 2:
    console.log("Two");  // Runs even if value !== 2!
}

// ✅ CORRECT
switch (value) {
  case 1:
    console.log("One");
    break;
  case 2:
    console.log("Two");
    break;
}
```

### Mistake 2: Infinite loop

```javascript
// ❌ WRONG
while (true) {
  console.log("Forever");
  // No exit condition! Will run forever
}

// ✅ CORRECT
let i = 0;
while (i < 5) {
  console.log(i);
  i++;  // Must change the condition eventually
}
```

### Mistake 3: Off-by-one error

```javascript
// ❌ WRONG
let arr = [1, 2, 3];
for (let i = 0; i <= arr.length; i++) {
  console.log(arr[i]);
}
// Last iteration: arr[3] is undefined!

// ✅ CORRECT
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

### Mistake 4: Modifying loop variable unexpectedly

```javascript
// ❌ WRONG
for (let i = 0; i < 5; i++) {
  i++;  // Loop increments, you also increment
  console.log(i);  // Skips values: 1, 3 (not 0, 1, 2, 3, 4)
}

// ✅ CORRECT
for (let i = 0; i < 5; i++) {
  console.log(i);  // Let the loop handle the increment
}
```

### Mistake 5: Using for...in on arrays

```javascript
// ❌ WRONG
let arr = [10, 20, 30];
for (let i in arr) {
  console.log(i);  // Prints indices: "0", "1", "2" (as strings!)
}

// ✅ CORRECT
for (let value of arr) {
  console.log(value);  // Prints values: 10, 20, 30
}
```

---

## Summary

- **if/else**: Run code based on conditions
- **switch**: Select from multiple specific values
- **for**: Loop a specific number of times
- **while**: Loop while a condition is true
- **for...in**: Loop over object properties
- **for...of**: Loop over array values
- **break**: Exit the loop
- **continue**: Skip to next iteration

---

## Next Steps

1. Practice writing different types of loops
2. Try nested loops
3. Use break and continue
4. Move to: **Phase 2 - Functions & Scope**

