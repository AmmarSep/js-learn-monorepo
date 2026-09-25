# Phase 1, Concept 3: Operators and Expressions

## Why This Matters

Operators are symbols that perform actions on values. They're the building blocks of all JavaScript logic.

Understanding operators is critical because:
- You use them in every line of code
- Operator precedence (which one runs first) affects results
- Some operators have unexpected behavior (loose vs strict equality)
- Knowing all available operators makes you write more concise code

---

## Operator Categories

JavaScript has many types of operators:

1. **Arithmetic** (+, -, *, /, %, **)
2. **Comparison** (===, !==, <, >, <=, >=)
3. **Logical** (&&, ||, !)
4. **Assignment** (=, +=, -=, etc.)
5. **Unary** (!, ++, --, typeof, void)
6. **Ternary** (condition ? true : false)
7. **Bitwise** (&, |, ^, ~, <<, >>, >>>)

We'll focus on the most important ones.

---

## Arithmetic Operators

These perform mathematical operations:

```javascript
// Addition
5 + 3          // 8
"hello" + " world"  // "hello world" (string concatenation)

// Subtraction
10 - 3         // 7
5 - 8          // -3

// Multiplication
4 * 3          // 12
0 * 100        // 0

// Division
10 / 2         // 5
10 / 3         // 3.3333...

// Modulo (remainder)
10 % 3         // 1 (10 divided by 3 is 3 remainder 1)
7 % 2          // 1 (7 divided by 2 is 3 remainder 1)
8 % 2          // 0 (8 divided by 2 is 4 remainder 0)

// Exponentiation (power)
2 ** 3         // 8 (2 to the power of 3)
5 ** 2         // 25 (5 squared)

// Unary negation
let x = 5;
-x             // -5 (negative of 5)
```

### String Concatenation

Important: When you `+` with a string, JavaScript converts to string:

```javascript
"5" + 3        // "53" (not 8!)
// Why? When one operand is a string, + does concatenation

5 + 3          // 8 (both numbers, so addition)

"5" + "3"      // "53" (both strings, so concatenation)

"The answer is " + 42  // "The answer is 42"
```

---

## Comparison Operators

These compare two values and return true or false:

### Loose Equality (==)

```javascript
5 == 5         // true
5 == "5"       // true (converts to same type first)
5 == 5.0       // true
null == undefined  // true (special case)
```

**⚠️ Warning: Loose equality has weird rules, avoid it!**

### Strict Equality (===)

```javascript
5 === 5        // true
5 === "5"      // false (different types)
5 === 5.0      // true (same value and type)
null === undefined  // false (different types)
```

**Always use === instead of ==**

### Other Comparisons

```javascript
5 > 3          // true
5 < 3          // false
5 >= 5         // true
5 <= 3         // false

5 !== "5"      // true (strict not equal)
5 != "5"       // false (loose not equal - avoid!)
```

---

## Logical Operators

These combine boolean values:

### AND (&&)

`a && b` returns true only if BOTH a and b are true:

```javascript
true && true    // true
true && false   // false
false && true   // false
false && false  // false

5 > 3 && 10 < 20  // true && true = true
5 > 3 && 10 > 20  // true && false = false
```

### OR (||)

`a || b` returns true if EITHER a or b is true:

```javascript
true || true    // true
true || false   // true
false || true   // true
false || false  // false

5 > 3 || 10 > 20  // true || false = true
5 < 3 || 10 > 20  // false || false = false
```

### NOT (!)

`!a` returns the opposite:

```javascript
!true          // false
!false         // true
!(5 > 3)       // false
!(5 < 3)       // true
```

### Short-Circuit Evaluation

The engines stops evaluating once the result is determined:

```javascript
// AND short-circuit
false && expensiveFunction();  // expensiveFunction() never called!
// Because if first is false, the result is always false

// OR short-circuit
true || expensiveFunction();   // expensiveFunction() never called!
// Because if first is true, the result is always true
```

### Using && for conditional execution

```javascript
let user = { name: "Alice" };
// Only call displayName if user exists
user && console.log(user.name);

// Why work? If user is falsy, the && stops
// If user is truthy, it evaluates the second part
```

---

## Assignment Operators

These assign values to variables:

```javascript
let x = 5;     // Basic assignment

x += 3;        // x = x + 3, so x is 8
x -= 2;        // x = x - 2, so x is 6
x *= 2;        // x = x * 2, so x is 12
x /= 3;        // x = x / 3, so x is 4
x %= 3;        // x = x % 3, so x is 1
x **= 2;       // x = x ** 2, so x is 1

let str = "Hello";
str += " world";  // str = str + " world", so str is "Hello world"
```

---

## Increment and Decrement

```javascript
let x = 5;

x++;          // x becomes 6 (post-increment)
++x;          // x becomes 7 (pre-increment)

let y = x++;  // y gets 7, then x becomes 8 (post-increment returns old value)
let z = ++x;  // x becomes 9, then z gets 9 (pre-increment returns new value)

x--;          // x becomes 8 (post-decrement)
--x;          // x becomes 7 (pre-decrement)
```

---

## Ternary Operator

The only operator with three parts:

```javascript
condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status);  // "adult"

let x = 5;
let result = x > 10 ? "big" : "small";
console.log(result);  // "small"
```

**Can be nested (but becomes hard to read):**

```javascript
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade);  // "B"
```

---

## Operator Precedence

Some operators run before others:

```javascript
2 + 3 * 4      // 14 (not 20)
// Why? * has higher precedence than +
// Runs as: 2 + (3 * 4) = 2 + 12 = 14

(2 + 3) * 4    // 20
// Parentheses have highest precedence, so + runs first
```

**Common precedence order (high to low):**
1. `()` Parentheses
2. `**` Exponentiation
3. `* / %` Multiplication, Division, Modulo
4. `+ -` Addition, Subtraction
5. `< > <= >=` Comparisons
6. `=== !==` Strict equality
7. `&&` AND
8. `||` OR
9. `=` Assignment

```javascript
// Complex example
5 + 3 * 2 === 11 && 10 > 5
// 1. 3 * 2 = 6
// 2. 5 + 6 = 11
// 3. 11 === 11 = true
// 4. 10 > 5 = true
// 5. true && true = true
```

---

## Truthy and Falsy Values

Every value in JavaScript is either **truthy** or **falsy**:

### Falsy Values (only these are falsy):
```javascript
false          // Obviously false
0              // Zero
-0             // Negative zero
0n             // BigInt zero
""             // Empty string
null           // No value
undefined      // Not assigned
NaN            // Not a Number
```

### Everything Else Is Truthy:
```javascript
true           // Obviously true
1              // Any non-zero number
"hello"        // Any non-empty string
"0"            // Even the string "0"!
[]             // Arrays (even empty!)
{}             // Objects (even empty!)
function() {}  // Functions
```

### Using Truthy/Falsy

```javascript
let name = "Alice";
if (name) {  // name is truthy
  console.log("Name exists");
}

let count = 0;
if (count) {  // count is falsy
  console.log("This doesn't run");
} else {
  console.log("count is 0 or falsy");  // This runs
}

let user = {};
if (user) {  // user is truthy (even though empty!)
  console.log("user exists");  // This runs
}
```

---

## typeof Operator

Returns the type of a value as a string:

```javascript
typeof 5                  // "number"
typeof "hello"            // "string"
typeof true               // "boolean"
typeof undefined          // "undefined"
typeof Symbol("id")       // "symbol"
typeof 123n               // "bigint"
typeof {}                 // "object"
typeof []                 // "object"
typeof function() {}      // "function"
typeof null               // "object" (historical bug!)
```

---

## Code Example: All Operators Together

```javascript
// ========================================
// OPERATORS DEMONSTRATION
// ========================================

console.log("=== ARITHMETIC ===");
console.log(10 + 5);      // 15
console.log(10 - 5);      // 5
console.log(10 * 5);      // 50
console.log(10 / 5);      // 2
console.log(10 % 3);      // 1
console.log(2 ** 3);      // 8

console.log("\n=== COMPARISON ===");
console.log(5 > 3);       // true
console.log(5 < 3);       // false
console.log(5 === 5);     // true
console.log(5 === "5");   // false
console.log(5 !== 3);     // true

console.log("\n=== LOGICAL ===");
console.log(true && true);    // true
console.log(true && false);   // false
console.log(true || false);   // true
console.log(!true);           // false

console.log("\n=== ASSIGNMENT ===");
let x = 10;
x += 5;  // x = 15
console.log("x += 5:", x);
x -= 3;  // x = 12
console.log("x -= 3:", x);
x *= 2;  // x = 24
console.log("x *= 2:", x);

console.log("\n=== TERNARY ===");
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log("Status:", status);

console.log("\n=== TRUTHY/FALSY ===");
console.log("Truthy values:");
console.log(Boolean(1));        // true
console.log(Boolean("hello"));  // true
console.log(Boolean([]));       // true

console.log("Falsy values:");
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean(null));     // false
console.log(Boolean(undefined));// false

console.log("\n=== TYPE CHECKING ===");
console.log(typeof 5);          // "number"
console.log(typeof "hello");    // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof {});         // "object"
console.log(typeof []);         // "object"
```

---

## Common Mistakes

### Mistake 1: Using == instead of ===

```javascript
// ❌ WRONG
if (value == 5) {  // Loose equality - weird rules
  // ...
}

// ✅ CORRECT
if (value === 5) {  // Strict equality - predictable
  // ...
}
```

### Mistake 2: Confusing && and ||

```javascript
// ❌ WRONG
if (age > 18 || age < 65) {
  console.log("Cannot retire");  // This runs for almost everyone!
}

// ✅ CORRECT
if (age >= 18 && age < 65) {
  console.log("In working age");
}
```

### Mistake 3: Expecting true && "hello" to be true

```javascript
// IMPORTANT: && and || return the actual values, not booleans
let result1 = true && "hello";
console.log(result1);  // "hello" (not true!)
console.log(typeof result1);  // "string"

let result2 = false || 42;
console.log(result2);  // 42 (not true!)
console.log(typeof result2);  // "number"

// They return boolean only if BOTH operands are booleans
```

### Mistake 4: Thinking empty arrays/objects are falsy

```javascript
// ❌ WRONG
let arr = [];
if (arr) {
  console.log("Array is empty");
}

// This runs! Empty arrays are TRUTHY
// To check if array is empty, check arr.length

// ✅ CORRECT
if (arr.length === 0) {
  console.log("Array is empty");
}
```

### Mistake 5: Not understanding operator precedence

```javascript
// ❌ WRONG (unexpected result)
let result = 2 + 3 * 4;  // 14 (not 20)
// Multiplication runs before addition

// ✅ CORRECT (explicit with parentheses)
let result = (2 + 3) * 4;  // 20
// Parentheses run first
```

---

## Next Steps

1. Try different operator combinations
2. Test truthy/falsy values with `Boolean()`
3. Observe operator precedence with complex expressions
4. Move to: **04_control_flow.md**
