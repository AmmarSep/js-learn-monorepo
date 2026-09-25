# JavaScript From Absolute Zero — A Slow, Patient, Symbol‑by‑Symbol Tutorial

**Optional companion:** follow the [main learning path](../README.md) and use the lesson links in each chapter when you want a slower explanation. You do not need to study two curricula in parallel. [Reference index](README.md).

> Welcome! This tutorial assumes you know **nothing** about programming.
> We will go slowly. We will explain **every** dot, comma, bracket, and quote.
> Each lesson follows the same structure:
>
> 1. **Lesson title**
> 2. **Simple explanation** (plain English)
> 3. **Tiny code example**
> 4. **Symbol‑by‑symbol breakdown**
> 5. **Common beginner mistakes**
> 6. **Mini practice exercise**
> 7. **Answer key**
> 8. **Short quiz** before moving on
>
> Read one lesson at a time. Don’t rush. Re‑read if needed.

---

## How to use this tutorial

- Open your browser (Chrome, Firefox, Edge, Safari — any modern one).
- Press **F12** (or right‑click the page and choose **Inspect**).
- Click the tab labeled **Console**.
- That’s where you can type JavaScript and press **Enter** to run it.

That’s it. You don’t need to install anything yet.

---

## Table of Contents

1. [What programming is](#lesson-1--what-programming-is)
2. [What JavaScript is](#lesson-2--what-javascript-is)
3. [How to run JavaScript](#lesson-3--how-to-run-javascript)
4. [Statements](#lesson-4--statements)
5. [Values](#lesson-5--values)
6. [Strings](#lesson-6--strings)
7. [Numbers](#lesson-7--numbers)
8. [Booleans](#lesson-8--booleans)
9. [Variables: `let`, `const`, `var`](#lesson-9--variables-let-const-var)
10. [Operators](#lesson-10--operators)
11. [Comments](#lesson-11--comments)
12. [`console.log`](#lesson-12--consolelog)
13. [Errors](#lesson-13--errors)
14. [Conditionals: `if`, `else if`, `else`](#lesson-14--conditionals)
15. [Comparisons](#lesson-15--comparisons)
16. [Logical operators](#lesson-16--logical-operators)
17. [Arrays](#lesson-17--arrays)
18. [Objects](#lesson-18--objects)
19. [Dot notation](#lesson-19--dot-notation)
20. [Bracket notation](#lesson-20--bracket-notation)
21. [Functions](#lesson-21--functions)
22. [Parameters and arguments](#lesson-22--parameters-and-arguments)
23. [Return values](#lesson-23--return-values)
24. [Scope](#lesson-24--scope)
25. [Loops](#lesson-25--loops)
26. [Array methods](#lesson-26--array-methods)
27. [Callbacks](#lesson-27--callbacks)
28. [Objects and methods](#lesson-28--objects-and-methods)
29. [`this`](#lesson-29--this)
30. [Destructuring](#lesson-30--destructuring)
31. [Spread and rest `...`](#lesson-31--spread-and-rest)
32. [Template literals](#lesson-32--template-literals)
33. [DOM basics](#lesson-33--dom-basics)
34. [Events](#lesson-34--events)
35. [JSON](#lesson-35--json)
36. [Fetch](#lesson-36--fetch)
37. [Promises](#lesson-37--promises)
38. [Async/await](#lesson-38--asyncawait)
39. [Modules](#lesson-39--modules)
40. [Classes](#lesson-40--classes)
41. [Debugging](#lesson-41--debugging)
42. [Small beginner projects](#lesson-42--small-beginner-projects)


---

## Lesson 1 — What programming is

### Simple explanation
Programming is the act of writing **instructions** for a computer.
Imagine you are giving a recipe to someone who has never cooked. You must:

- Use exact words.
- Put steps in the right order.
- Not skip anything.

Computers are very fast, but they are **not smart**. They only do exactly what you tell them, in the exact order you tell them.

### Tiny code example
We don’t need real code yet. Here is a “recipe” written like a program:

```
1. Take two slices of bread.
2. Spread butter on one side of each slice.
3. Put cheese between them.
4. Eat.
```

### Symbol‑by‑symbol breakdown
- The numbers `1.`, `2.`, `3.`, `4.` mean **the order** of steps.
- Each line is **one instruction**.
- The period `.` at the end is just punctuation in English; it is not part of the instruction itself.

### Common beginner mistakes
- Thinking the computer will “figure out” missing steps. It won’t.
- Writing instructions out of order.

### Mini practice
Write 3 plain‑English steps that describe brushing your teeth.

### Answer key
Example:

```
1. Pick up the toothbrush.
2. Put toothpaste on the brush.
3. Move the brush in small circles on the teeth for two minutes.
```

### Quiz
1. True or false: A computer can guess what you mean.
2. What does “programming” mean in one sentence?

**Answers:** 1) False. 2) Writing exact instructions for a computer to follow.

---

## Lesson 2 — What JavaScript is

### Simple explanation
**JavaScript** (JS) is a **programming language**. It is the language of the **web**. Almost every interactive thing you see in a browser — buttons that respond, animations, forms, games — uses JavaScript.

JavaScript also runs **outside** the browser, using a tool called **Node.js** (so you can build servers, scripts, etc.).

### Tiny code example
```javascript
alert("Hello!");
```
If you paste this into a browser console and press Enter, a popup appears.

### Symbol‑by‑symbol breakdown
- `alert` is a built‑in **function** (a pre‑made instruction) that shows a popup box.
- `(` opens the list of inputs we send to the function.
- `"Hello!"` is a **string** (text). The double quotes `" "` mean: “this is text, not a name.”
- `)` closes the list of inputs.
- `;` says: “this instruction ends here.” (It is mostly optional, but recommended.)

### Common beginner mistakes
- Confusing **JavaScript** with **Java**. They are different languages with similar names.
- Forgetting that JavaScript is **case‑sensitive**: `Alert` is not the same as `alert`.

### Mini practice
What language would you use to make a button do something on a webpage?

### Answer key
JavaScript.

### Quiz
1. Where does JavaScript usually run?
2. Is JavaScript the same as Java?

**Answers:** 1) In web browsers (and also Node.js). 2) No.

---

## Lesson 3 — How to run JavaScript

### Simple explanation
You have three easy ways:

1. **Browser console** (fastest): F12 → Console tab.
2. **An HTML file** with a `<script>` tag.
3. **Node.js** in a terminal: `node file.js`.

### Tiny code example (HTML file)
Create a file `index.html`:

```html
<!doctype html>
<html>
  <body>
    <script>
      console.log("Hi from JS");
    </script>
  </body>
</html>
```

Open the file in a browser, press F12 → Console. You will see: `Hi from JS`.

### Symbol‑by‑symbol breakdown
- `<!doctype html>` tells the browser “this is HTML5.”
- `<html>` and `</html>` open and close the HTML document.
- `<body>` and `</body>` open and close the visible part of the page.
- `<script>` tells the browser: “JavaScript starts here.”
- `</script>` says: “JavaScript ends here.”
- Inside the `<script>` we wrote one JavaScript instruction.
- `console` is an object. The dot `.` means “go inside it.” `log` is a function inside it.
- `(` opens inputs, `"Hi from JS"` is the text, `)` closes inputs, `;` ends the line.

### Common beginner mistakes
- Forgetting the closing `</script>`.
- Looking at the page instead of the **Console** for `console.log` output.

### Mini practice
Write the smallest HTML page that prints `2 + 2` to the console.

### Answer key
```html
<!doctype html>
<html><body><script>console.log(2 + 2);</script></body></html>
```

### Quiz
1. Where does `console.log` output appear?
2. What tag wraps JavaScript inside HTML?

**Answers:** 1) The browser console. 2) `<script>...</script>`.

---

## Lesson 4 — Statements

### Simple explanation
A **statement** is a single instruction. JavaScript runs statements one after another, top to bottom.
We end a statement with a **semicolon** `;` to be clear where it ends.

### Tiny code example
```javascript
console.log("A");
console.log("B");
```

### Symbol‑by‑symbol breakdown
- Line 1 is one statement: print the string `"A"`.
- Line 2 is another statement: print `"B"`.
- Each `;` clearly ends a statement.
- Output:
  ```
  A
  B
  ```

### Common beginner mistakes
- Putting many statements on one line **without** semicolons. JavaScript usually adds them automatically (called ASI), but it can guess wrong. **Be explicit: always end with `;`.**

### Mini practice
Write three statements that print `1`, `2`, `3` on separate lines.

### Answer key
```javascript
console.log(1);
console.log(2);
console.log(3);
```

### Quiz
1. What symbol typically ends a statement?
2. In what order are statements executed?

**Answers:** 1) `;` 2) Top to bottom.

---

## Lesson 5 — Values

### Simple explanation
A **value** is a piece of data. The simplest categories are:

- **Strings** — text, e.g. `"hello"`.
- **Numbers** — e.g. `42`, `3.14`.
- **Booleans** — `true` or `false`.
- **null** — “intentionally nothing.”
- **undefined** — “no value yet.”

### Tiny code example
```javascript
console.log("hello");
console.log(42);
console.log(true);
console.log(null);
console.log(undefined);
```

### Symbol‑by‑symbol breakdown
- `"hello"` — quotes mean it is text (a string).
- `42` — no quotes, so it is a number.
- `true` — a special word; not in quotes; it is a boolean.
- `null` — special word: “empty on purpose.”
- `undefined` — special word: “not set.”

### Common beginner mistakes
- Writing `"42"` (a string of digits) when you mean `42` (a number). They behave differently.

### Mini practice
Identify the type: `"true"`, `true`, `0`, `null`.

### Answer key
- `"true"` → string (it has quotes).
- `true` → boolean.
- `0` → number.
- `null` → null.

### Quiz
1. Is `"123"` a number or a string?
2. What is the difference between `null` and `undefined`?

**Answers:** 1) String. 2) `null` = empty on purpose; `undefined` = not given a value yet.

---

## Lesson 6 — Strings

### Simple explanation
A **string** is text. You put it in quotes. JavaScript accepts:

- single quotes `'...'`
- double quotes `"..."`
- backticks `` `...` `` (special, allow `${}` inside; covered later)

### Tiny code example
```javascript
let greeting = "Hello, world!";
console.log(greeting);
```

### Symbol‑by‑symbol breakdown
- `let` — keyword that **creates a variable** (a labeled box for a value).
- `greeting` — the **name** we chose for the box.
- `=` — assignment: “put the value on the right into the box on the left.”
- `"Hello, world!"` — the string value. Quotes mark it as text.
- `;` — end of the statement.
- `console.log(greeting)` — print whatever is in the `greeting` box. (No quotes — we want the **value**, not the literal name.)

### Joining strings
```javascript
let a = "Hello";
let b = "World";
console.log(a + ", " + b + "!");
```
- `+` between strings means **glue them together** (concatenation).
- `", "` is just a string with a comma and a space.

### Escape characters
Inside a string you sometimes need special things:
- `\"` → a literal double quote inside `"..."`.
- `\'` → a literal single quote inside `'...'`.
- `\\` → a literal backslash.
- `\n` → a new line.

```javascript
console.log("She said: \"hi\"");
```

### Common beginner mistakes
- Mixing quote types: `"hello'` (open with `"`, close with `'`) → error.
- Forgetting to close the quote.

### Mini practice
Make a variable `name` equal to your name, and print: `Hello, <your name>!`

### Answer key
```javascript
let name = "Alex";
console.log("Hello, " + name + "!");
```

### Quiz
1. Are `'cat'` and `"cat"` the same?
2. How do you put a `"` inside a string written with `"..."`?

**Answers:** 1) Yes. 2) `\"`.

---

## Lesson 7 — Numbers

### Simple explanation
JavaScript has **one** number type. It handles whole numbers (`1`, `2`) and decimals (`1.5`) the same way.

### Tiny code example
```javascript
console.log(2 + 3);    // 5
console.log(10 - 4);   // 6
console.log(6 * 7);    // 42
console.log(20 / 5);   // 4
console.log(10 % 3);   // 1   (remainder)
console.log(2 ** 3);   // 8   (2 to the power 3)
```

### Symbol‑by‑symbol breakdown
- `+`, `-`, `*`, `/` — add, subtract, multiply, divide.
- `%` — **modulo**: the remainder after division.
- `**` — exponent (power).
- `//` starts a single‑line **comment** — text JavaScript ignores; it is for humans.

### Special numeric values
- `Infinity`, `-Infinity` — bigger/smaller than any finite number.
- `NaN` — “Not a Number.” You see it when math fails: `"abc" * 2` → `NaN`.

### Common beginner mistakes
- Mixing strings and numbers: `"5" + 1` → `"51"` (string concatenation), but `"5" - 1` → `4` (math). Be careful.

### Mini practice
Compute the area of a rectangle of width 7 and height 4, and print it.

### Answer key
```javascript
let width = 7;
let height = 4;
console.log(width * height);  // 28
```

### Quiz
1. What does `13 % 5` give?
2. What is `"3" + 2`?

**Answers:** 1) `3`. 2) `"32"`.

---

## Lesson 8 — Booleans

### Simple explanation
A **boolean** is yes/no, true/false. Only two values: `true` or `false`. They drive decisions in code.

### Tiny code example
```javascript
let isRaining = true;
let isSunny = false;
console.log(isRaining);
console.log(isSunny);
```

### Symbol‑by‑symbol breakdown
- `true` and `false` are **keywords**, not strings. No quotes.
- Variable names like `isRaining` are conventionally written in **camelCase** (first word lowercase, next words capitalized).

### Truthy and falsy
JavaScript treats some non‑boolean values as if they were booleans:
- **Falsy:** `false`, `0`, `""`, `null`, `undefined`, `NaN`.
- **Truthy:** everything else (including `"false"` — it’s a non‑empty string!).

### Common beginner mistakes
- Writing `"true"` (string) when you mean `true` (boolean).

### Mini practice
Create a variable `isLoggedIn` and set it to `false`. Print it.

### Answer key
```javascript
let isLoggedIn = false;
console.log(isLoggedIn);
```

### Quiz
1. Is `0` truthy or falsy?
2. Is `"false"` truthy or falsy?

**Answers:** 1) Falsy. 2) Truthy (non‑empty string).

---

## Lesson 9 — Variables: `let`, `const`, `var`

### Simple explanation
A **variable** is a labeled box that holds a value.

- `let` — a box whose value can change.
- `const` — a box whose value **must not** be reassigned.
- `var` — the old way (avoid in new code).

### Tiny code example
```javascript
let age = 20;
age = 21;          // OK with let

const pi = 3.14;
// pi = 3.15;      // ❌ Error: cannot reassign a const
```

### Symbol‑by‑symbol breakdown
- `let age = 20;` — create a `let` variable named `age`, put `20` in it.
- `age = 21;` — change the contents (no `let` again — we already created it).
- `const pi = 3.14;` — `pi` is locked. You **cannot** do `pi = ...` later.
- `//` starts a comment. JavaScript ignores everything after it on that line.

### Naming rules
- Must start with a letter, `_`, or `$`. Cannot start with a digit.
- Case‑sensitive: `myAge` ≠ `myage`.
- Use **camelCase**: `userName`, `totalCount`.

### Common beginner mistakes
- Re‑declaring with `let` twice in the same scope: `let x = 1; let x = 2;` → error.
- Trying to reassign `const`.
- Using `var` — leads to surprising bugs. Stick to `let` and `const`.

### Mini practice
Create a `const` named `birthYear` (the year you were born) and a `let` named `currentYear`. Print the difference.

### Answer key
```javascript
const birthYear = 2000;
let currentYear = 2026;
console.log(currentYear - birthYear);
```

### Quiz
1. Which keyword should you use if a value never changes?
2. Can you reassign a `let`?

**Answers:** 1) `const`. 2) Yes.

---

## Lesson 10 — Operators

### Simple explanation
**Operators** are symbols that do something with values.

- **Arithmetic:** `+ - * / % **`
- **Assignment:** `= += -= *= /=`
- **Comparison:** `=== !== > < >= <=`
- **Logical:** `&& || !`

### Tiny code example
```javascript
let x = 10;
x += 5;        // x = x + 5  → 15
x *= 2;        // x = x * 2  → 30
console.log(x);
console.log(x > 20);          // true
console.log(x === 30);        // true
console.log(!(x === 30));     // false
```

### Symbol‑by‑symbol breakdown
- `=` puts a value into a variable.
- `+=` is shorthand for “add to and store back.”
- `===` checks **strict equality** (same value AND same type).
- `!==` is the opposite of `===`.
- `!` flips a boolean: `!true === false`.
- The parentheses `(...)` group an expression so it’s evaluated first (like in math).

### `==` vs `===`
- `==` allows type changes: `"5" == 5` → `true`. Surprising. Avoid.
- `===` is strict: `"5" === 5` → `false`. **Always prefer `===`.**

### Common beginner mistakes
- Using `=` instead of `===` in a comparison: `if (x = 5)` accidentally **assigns** 5 to x.

### Mini practice
What is `x` after this?
```javascript
let x = 4;
x += 6;
x /= 2;
```

### Answer key
`x = 5`.

### Quiz
1. What does `===` mean?
2. What does `x += 3` do?

**Answers:** 1) Same value and same type. 2) Adds 3 to `x` and stores it back.

---

## Lesson 11 — Comments

### Simple explanation
Comments are notes for humans. JavaScript ignores them.

```javascript
// This is a single-line comment.

/*
  This is a multi-line comment.
  Useful for longer notes.
*/
```

### Symbol‑by‑symbol breakdown
- `//` — starts a comment until the end of the line.
- `/*` — starts a multi‑line comment.
- `*/` — ends a multi‑line comment.

### Common beginner mistakes
- Forgetting `*/` at the end of a multi‑line comment. The rest of your file becomes a comment.

### Mini practice
Add a comment above any line of code that explains what the line does.

### Answer key
```javascript
// Print a greeting to the console
console.log("Hi");
```

### Quiz
1. Does `//` comment one line or many?
2. How do you write a multi‑line comment?

**Answers:** 1) One line. 2) `/* ... */`.

---

## Lesson 12 — `console.log`

### Simple explanation
`console.log` prints things to the developer console. Use it constantly while learning.

### Tiny code example
```javascript
console.log("Hello");
console.log(1 + 2, "items", true);
```

### Symbol‑by‑symbol breakdown
- `console` — a **built‑in object** provided by the JS environment.
- `.` — “access something inside this object.”
- `log` — a **method** (a function attached to an object).
- `(` — start of the inputs.
- `"Hello"` — the input (a string).
- `,` — a comma separates multiple inputs.
- `1 + 2` is computed first (`3`), then printed alongside `"items"` and `true`.
- `)` — end of inputs.
- `;` — end of statement.

### Other console helpers
- `console.error("X")` — red error message.
- `console.warn("X")` — yellow warning.
- `console.table([...])` — pretty table for arrays/objects.

### Common beginner mistakes
- Typing `Console.log` (capital C) — JavaScript is case‑sensitive.
- Forgetting `()`.

### Mini practice
Print your favorite color, your age, and `true`.

### Answer key
```javascript
console.log("blue", 30, true);
```

### Quiz
1. Why must we type `console` with a lowercase `c`?
2. What does `,` do inside `console.log(a, b)`?

**Answers:** 1) JavaScript is case‑sensitive. 2) Separates multiple values to print.

---

## Lesson 13 — Errors

### Simple explanation
When JavaScript can’t run something, it throws an **error** and stops that piece of code. Errors are not bad — they tell you exactly what is wrong.

### Common error types
- **SyntaxError** — you wrote something JavaScript can’t parse (typo, missing bracket).
- **ReferenceError** — you used a name that doesn’t exist.
- **TypeError** — you used a value the wrong way.

### Tiny code example
```javascript
console.log(hello);   // ReferenceError: hello is not defined
```

### Symbol‑by‑symbol breakdown
- `hello` (no quotes) is treated as a **variable name**. We never created `hello`, so JavaScript doesn’t know it.

### Try / catch
You can catch errors so the program continues:

```javascript
try {
  null.foo;
} catch (err) {
  console.log("Caught:", err.message);
}
```
- `try { ... }` — try this code.
- `catch (err) { ... }` — if it throws, run this; `err` is the error object.
- `err.message` — a short description.

### Common beginner mistakes
- Ignoring errors. **Always read the error message and the line number.**

### Mini practice
What error does `JSON.parse("oops")` throw?

### Answer key
A `SyntaxError` (it’s not valid JSON).

### Quiz
1. What does `ReferenceError` usually mean?
2. What does `try/catch` do?

**Answers:** 1) You used a name that doesn’t exist. 2) Lets you handle errors without crashing.

---

## Lesson 14 — Conditionals

### Simple explanation
Conditionals let your program **make decisions**.

```
If it is raining, take an umbrella.
Otherwise if it is sunny, take sunglasses.
Otherwise, take nothing.
```

### Tiny code example
```javascript
let temp = 25;

if (temp > 30) {
  console.log("Hot");
} else if (temp > 20) {
  console.log("Warm");
} else {
  console.log("Cold");
}
```

### Symbol‑by‑symbol breakdown
- `if` — keyword.
- `(` — start of the **condition**.
- `temp > 30` — a comparison; gives `true` or `false`.
- `)` — end of condition.
- `{` — start of a **block** (a group of statements).
- `console.log("Hot");` — runs if condition was `true`.
- `}` — end of the block.
- `else if (...)` — try another condition only if the previous ones were `false`.
- `else { ... }` — runs if **all** previous conditions were `false`.

### Common beginner mistakes
- Using `=` (assignment) where `===` (comparison) is needed.
- Forgetting `{}`. Without them, only the first statement is part of the `if`.

### Mini practice
Write code that prints `"Even"` or `"Odd"` depending on a number `n`.

### Answer key
```javascript
let n = 7;
if (n % 2 === 0) {
  console.log("Even");
} else {
  console.log("Odd");
}
```

### Quiz
1. What goes inside the `()` of an `if`?
2. Do you need `{}`? Why?

**Answers:** 1) A condition that evaluates to `true`/`false`. 2) Yes (recommended) — it groups the statements that belong to the `if`.

---

## Lesson 15 — Comparisons

### Simple explanation
Comparisons compare two values and return a boolean.

| Operator | Meaning |
|----------|---------|
| `===` | strictly equal |
| `!==` | strictly not equal |
| `>`   | greater than |
| `<`   | less than |
| `>=`  | greater than or equal |
| `<=`  | less than or equal |

### Tiny code example
```javascript
console.log(5 === 5);     // true
console.log(5 === "5");   // false (different types)
console.log(7 > 3);       // true
console.log(7 <= 7);      // true
```

### Symbol-by-symbol
- `===` is three equal signs. Two equals `==` is **loose** equality (avoid).
- `!==` is `!` (not) + `==`.

### Mini practice
What is `"3" === 3`?

### Answer key
`false` — string vs number.

### Quiz
1. Difference between `==` and `===`?

**Answer:** `===` also checks the type.

---

## Lesson 16 — Logical operators

### Simple explanation
- `&&` AND — both sides must be truthy.
- `||` OR — at least one side truthy.
- `!`  NOT — flips a boolean.

### Tiny code example
```javascript
let age = 20;
let hasTicket = true;
if (age >= 18 && hasTicket) {
  console.log("Welcome");
}
```

### Symbol-by-symbol
- `&&` two ampersands. Reads left → right and **short-circuits**: if left is false, right is not even checked.
- `||` two pipes. Short-circuits if left is true.
- `!` placed before a value: `!true === false`.

### Mini practice
Write a condition that is true if `x` is between 1 and 10 (inclusive).

### Answer key
```javascript
if (x >= 1 && x <= 10) { /* ... */ }
```

### Quiz
1. What does `true || false` give? 2. What does `!false` give?

**Answers:** 1) `true`. 2) `true`.

---

## Lesson 17 — Arrays

### Simple explanation
An **array** is an ordered list of values. Written with square brackets `[ ]`.

### Tiny code example
```javascript
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]);      // "apple"
console.log(fruits.length);  // 3
fruits.push("date");         // add to end
```

### Symbol-by-symbol
- `[` starts the array.
- Each item is separated by `,` (comma).
- `]` ends the array.
- `fruits[0]` — square brackets here mean **index access**. Indexes start at `0`.
- `.length` — a property: how many items.
- `.push(x)` — a method that adds `x` to the end.

### Common mistakes
- Thinking the first index is `1`. It is `0`.

### Mini practice
Make an array of 3 numbers and print the second one.

### Answer key
```javascript
let nums = [10, 20, 30];
console.log(nums[1]); // 20
```

### Quiz
1. What index is the first item? 2. How do you add to the end?

**Answers:** 1) `0`. 2) `.push(...)`.

---

## Lesson 18 — Objects

### Simple explanation
An **object** stores values by **name** (key). Written with curly braces `{ }`.

### Tiny code example
```javascript
let person = {
  name: "Alex",
  age: 30,
  isAdmin: false
};
console.log(person.name);
```

### Symbol-by-symbol
- `{` starts the object.
- `name: "Alex"` — a **key** `name`, a colon `:`, and a **value** `"Alex"`.
- `,` separates pairs.
- `}` ends the object.
- `person.name` — dot to access the value of key `name`.

### Common mistakes
- Forgetting commas between pairs.
- Using `=` instead of `:` inside the object.

### Mini practice
Create an object `book` with `title` and `pages`.

### Answer key
```javascript
let book = { title: "JS", pages: 200 };
```

### Quiz
1. What separates a key and value? 2. What separates pairs?

**Answers:** 1) `:`. 2) `,`.

---

## Lesson 19 — Dot notation

### Simple explanation
Use `object.key` to read or write a property when the key is a valid identifier.

### Tiny code example
```javascript
let user = { name: "Sam" };
console.log(user.name);   // read
user.age = 25;            // create/write
```

### Symbol-by-symbol
- `.` means "go inside this object."
- `user.age = 25;` creates the property if it didn't exist.

### Mini practice
Add a property `city` to `user` and print it.

### Answer key
```javascript
user.city = "Paris";
console.log(user.city);
```

### Quiz
1. Can you use dot notation if the key has a space (e.g. `"first name"`)?

**Answer:** No — use bracket notation.

---

## Lesson 20 — Bracket notation

### Simple explanation
`object["key"]` works for **any** key, including ones with spaces or stored in a variable.

### Tiny code example
```javascript
let user = { "first name": "Sam" };
console.log(user["first name"]);

let key = "first name";
console.log(user[key]);
```

### Symbol-by-symbol
- `[` starts the key expression.
- `"first name"` — the key as a string.
- `]` ends it.
- When using a variable inside `[ ]`, **no quotes** — it's a variable, not text.

### Mini practice
Given `let k = "age"; let p = { age: 9 };`, print the age using `k`.

### Answer key
```javascript
console.log(p[k]);
```

### Quiz
1. When must you use bracket notation?

**Answer:** When the key is dynamic or not a valid identifier.

---

## Lesson 21 — Functions

### Simple explanation
A **function** is a named, reusable block of code.

### Tiny code example
```javascript
function greet() {
  console.log("Hi!");
}
greet();
```

### Symbol-by-symbol
- `function` — keyword.
- `greet` — name.
- `()` — parameter list (empty here).
- `{` … `}` — the function body.
- `greet();` — the parentheses **call** (run) the function.

### Arrow function (modern shorthand)
```javascript
const greet = () => console.log("Hi!");
```
- `=>` is the arrow. Reads "of these inputs, do this."

### Mini practice
Write a function `sayBye` that prints `"Bye"`. Call it twice.

### Answer key
```javascript
function sayBye() { console.log("Bye"); }
sayBye();
sayBye();
```

### Quiz
1. What do `()` after a function name do?

**Answer:** They **call** the function.

---

## Lesson 22 — Parameters and arguments

### Simple explanation
**Parameters** are placeholders in the function definition.
**Arguments** are the actual values you pass when calling.

### Tiny code example
```javascript
function greet(name) {
  console.log("Hello, " + name);
}
greet("Alex");   // "Alex" is the argument
```

### Symbol-by-symbol
- `name` inside `()` is the parameter.
- When you call `greet("Alex")`, JavaScript sets `name = "Alex"` for that call.

### Default values
```javascript
function greet(name = "friend") { console.log("Hi " + name); }
greet();          // "Hi friend"
```

### Mini practice
Write `add(a, b)` that prints `a + b`.

### Answer key
```javascript
function add(a, b) { console.log(a + b); }
add(2, 3); // 5
```

### Quiz
1. What's the difference between a parameter and an argument?

**Answer:** Parameter = placeholder in the definition; argument = real value passed in.

---

## Lesson 23 — Return values

### Simple explanation
`return` sends a value **out** of the function so the caller can use it.

### Tiny code example
```javascript
function add(a, b) {
  return a + b;
}
let sum = add(2, 3);
console.log(sum); // 5
```

### Symbol-by-symbol
- `return` — keyword.
- The value after it is what comes out.
- After `return`, the function ends immediately.
- If no `return`, the function returns `undefined`.

### Mini practice
Write `square(n)` that returns `n * n`.

### Answer key
```javascript
function square(n) { return n * n; }
```

### Quiz
1. What does a function return if you don't write `return`?

**Answer:** `undefined`.

---

## Lesson 24 — Scope

### Simple explanation
**Scope** is where a variable is visible.
- Variables made with `let`/`const` inside `{ }` exist only inside those braces (block scope).
- Variables outside any function/block are **global**.

### Tiny code example
```javascript
let x = 10;
function f() {
  let y = 20;
  console.log(x); // 10 — outer is visible
}
f();
console.log(y);   // ❌ ReferenceError: y is not defined
```

### Symbol-by-symbol
- The `{` `}` of the function form a new scope.
- `y` lives only inside `f`.

### Common mistakes
- Forgetting `let`/`const`, which can create accidental globals.

### Mini practice
What does this print?
```javascript
let a = 1;
{ let a = 2; console.log(a); }
console.log(a);
```

### Answer key
`2` then `1`.

### Quiz
1. What is "block scope"?

**Answer:** Visibility limited to the `{ }` where the variable was declared.

---

## Lesson 25 — Loops

### Simple explanation
Loops repeat code.

### `for` loop
```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```
- `for` — keyword.
- `(` start of three parts separated by `;`:
  1. **init**: `let i = 0` runs once.
  2. **condition**: `i < 3` checked before each loop; if false, stop.
  3. **step**: `i++` runs after each loop (`i++` means `i = i + 1`).
- `)` end of header.
- `{ ... }` body.

### `while` loop
```javascript
let n = 0;
while (n < 3) {
  console.log(n);
  n++;
}
```

### `for...of` (loop over array values)
```javascript
for (let f of ["a", "b"]) console.log(f);
```

### Mini practice
Print numbers 1 to 5.

### Answer key
```javascript
for (let i = 1; i <= 5; i++) console.log(i);
```

### Quiz
1. What does `i++` do?

**Answer:** Increases `i` by 1.

---

## Lesson 26 — Array methods

### Simple explanation
Built-in methods that operate on arrays.

### Tiny code example
```javascript
let nums = [1, 2, 3, 4];

let doubled = nums.map(n => n * 2);     // [2,4,6,8]
let evens   = nums.filter(n => n % 2 === 0); // [2,4]
let total   = nums.reduce((a, b) => a + b, 0); // 10
nums.forEach(n => console.log(n));
```

### Symbol-by-symbol
- `.map(fn)` — make a new array by transforming each item.
- `.filter(fn)` — keep items where `fn` returns truthy.
- `.reduce(fn, start)` — combine all items into one value.
- `.forEach(fn)` — run `fn` for each item; returns nothing.
- `n => n * 2` is an **arrow function** taking one parameter `n` and returning `n * 2`.

### Mini practice
From `[1,2,3,4,5]` get the squares of even numbers.

### Answer key
```javascript
[1,2,3,4,5].filter(n => n % 2 === 0).map(n => n * n); // [4,16]
```

### Quiz
1. What does `map` return?

**Answer:** A new array of the same length.

---

## Lesson 27 — Callbacks

### Simple explanation
A **callback** is a function passed as an argument to another function, to be called later.

### Tiny code example
```javascript
function doTwice(cb) {
  cb();
  cb();
}
doTwice(() => console.log("Hi"));
```

### Symbol-by-symbol
- `cb` is the parameter holding the function.
- `cb()` calls it.
- `() => console.log("Hi")` is an arrow function we pass in.

### Real-world example
```javascript
setTimeout(() => console.log("After 1s"), 1000);
```
- `setTimeout(fn, ms)` calls `fn` after `ms` milliseconds.

### Mini practice
Pass a callback to `[1,2,3].forEach(...)` that prints each item.

### Answer key
```javascript
[1,2,3].forEach(x => console.log(x));
```

### Quiz
1. What is a callback?

**Answer:** A function passed to another function to be invoked later.

---

## Lesson 28 — Objects and methods

### Simple explanation
A **method** is a function stored as an object property.

### Tiny code example
```javascript
let dog = {
  name: "Rex",
  bark() {
    console.log(this.name + " says woof");
  }
};
dog.bark();
```

### Symbol-by-symbol
- `bark() { ... }` is shorthand for `bark: function() { ... }`.
- `this` inside the method refers to the object on the left of the dot when called: `dog.bark()` → `this === dog`.

### Mini practice
Add a method `info()` to `dog` that prints its name.

### Answer key
```javascript
dog.info = function() { console.log(this.name); };
dog.info();
```

### Quiz
1. What is a method?

**Answer:** A function stored on an object.

---

## Lesson 29 — `this`

### Simple explanation
`this` refers to **what is in front of the dot** when a method is called.

### Tiny code example
```javascript
const obj = { x: 10, get() { return this.x; } };
console.log(obj.get()); // 10
```

### Tricky points
- In an **arrow function**, `this` is taken from the surrounding code, not the caller.
- A standalone function call: `this` is `undefined` (in strict mode) or the global object.

### Mini practice
Why does this print `undefined`?
```javascript
const o = { x: 1, get: () => this.x };
console.log(o.get());
```

### Answer key
Arrow functions don't bind `this`, so `this.x` is not `o.x`.

### Quiz
1. What does `this` refer to in `a.b()`?

**Answer:** `a`.

---

## Lesson 30 — Destructuring

### Simple explanation
Destructuring lets you pull values out of arrays/objects into variables.

### Array destructuring
```javascript
const [a, b] = [10, 20];
console.log(a, b); // 10 20
```

### Object destructuring
```javascript
const { name, age } = { name: "Sam", age: 9 };
console.log(name, age);
```

### Symbol-by-symbol
- `[a, b] = [10, 20]` — `a` gets first item, `b` gets second.
- `{ name, age } = { ... }` — variables named exactly like the keys are filled.
- Rename: `const { name: userName } = obj;`

### Mini practice
Destructure `{ x: 1, y: 2 }` into variables `x` and `y`.

### Answer key
```javascript
const { x, y } = { x: 1, y: 2 };
```

### Quiz
1. Can you rename when destructuring?

**Answer:** Yes, with `key: newName`.

---

## Lesson 31 — Spread and rest

Both look like `...` but do opposite jobs depending on context.

### Spread (expands)
```javascript
const a = [1, 2];
const b = [...a, 3, 4];     // [1,2,3,4]
const o = { x: 1 };
const o2 = { ...o, y: 2 };  // { x:1, y:2 }
```

### Rest (collects)
```javascript
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6
```

### Symbol-by-symbol
- `...` before a value in a literal/array/argument list = **spread** (unpack).
- `...` in a parameter list or destructuring = **rest** (gather rest into an array).

### Mini practice
Combine `[1,2]` and `[3,4]` into one array using spread.

### Answer key
```javascript
[...[1,2], ...[3,4]] // [1,2,3,4]
```

### Quiz
1. Spread or rest? `function f(...args)`

**Answer:** Rest.

---

## Lesson 32 — Template literals

### Simple explanation
Strings written with backticks `` ` `` allow embedded expressions and multi-line text.

### Tiny code example
```javascript
const name = "Alex";
console.log(`Hello, ${name}!`);
console.log(`Line 1
Line 2`);
```

### Symbol-by-symbol
- `` ` `` (backtick) starts and ends the string.
- `${ ... }` — anything inside is evaluated as JavaScript and inserted.
- New lines inside backticks are real new lines.

### Mini practice
Use a template literal to print `2 + 3 = 5` (computed automatically).

### Answer key
```javascript
console.log(`2 + 3 = ${2 + 3}`);
```

### Quiz
1. What characters wrap a template literal?

**Answer:** Backticks `` ` ``.

---

## Lesson 33 — DOM basics

### Simple explanation
The **DOM** (Document Object Model) is the page, represented as a tree of objects you can read and change with JS.

### Tiny code example
```html
<p id="msg">Hi</p>
<script>
  const el = document.getElementById("msg");
  el.textContent = "Changed!";
  el.style.color = "red";
</script>
```

### Symbol-by-symbol
- `document` — built-in object representing the page.
- `.getElementById("msg")` — finds the element with `id="msg"`.
- `.textContent` — the text inside.
- `.style.color` — a CSS property.

### Other selectors
- `document.querySelector(".class")` — first match by CSS selector.
- `document.querySelectorAll("p")` — all matches (a NodeList).

### Mini practice
Change the body's background color to `"yellow"`.

### Answer key
```javascript
document.body.style.backgroundColor = "yellow";
```

### Quiz
1. What does `document.querySelector("#x")` do?

**Answer:** Returns the first element with `id="x"`.

---

## Lesson 34 — Events

### Simple explanation
**Events** are things that happen: clicks, key presses, page load. You react with **event listeners**.

### Tiny code example
```html
<button id="b">Click me</button>
<script>
  const btn = document.getElementById("b");
  btn.addEventListener("click", () => {
    console.log("Clicked!");
  });
</script>
```

### Symbol-by-symbol
- `.addEventListener(type, callback)` — attach a listener.
- `"click"` — the event name.
- The arrow function is the **callback** that runs on each click.

### Mini practice
Listen to `"mouseover"` on the button and log `"hover"`.

### Answer key
```javascript
btn.addEventListener("mouseover", () => console.log("hover"));
```

### Quiz
1. What's the second argument to `addEventListener`?

**Answer:** A callback function.

---

## Lesson 35 — JSON

### Simple explanation
**JSON** (JavaScript Object Notation) is a text format that looks like JS objects/arrays. It is how programs exchange data over the web.

### Tiny code example
```javascript
const obj = { name: "Sam", age: 9 };
const text = JSON.stringify(obj);  // '{"name":"Sam","age":9}'
const back = JSON.parse(text);     // object again
```

### Rules of JSON
- Keys must be in **double** quotes: `"name"`.
- Strings use double quotes only.
- No comments. No trailing commas. No functions.

### Symbol-by-symbol
- `JSON.stringify(value)` → string.
- `JSON.parse(string)` → value.

### Mini practice
Convert `[1,2,3]` to a JSON string.

### Answer key
```javascript
JSON.stringify([1,2,3]); // "[1,2,3]"
```

### Quiz
1. Are single quotes valid in JSON?

**Answer:** No.

---

## Lesson 36 — Fetch

### Simple explanation
`fetch(url)` asks a server for data. It returns a **Promise** (covered next lesson).

### Tiny code example
```javascript
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(data => console.log(data));
```

### Symbol-by-symbol
- `fetch(url)` starts the request.
- `.then(callback)` runs when the request is done.
- `response.json()` parses the body as JSON (also returns a Promise).
- The second `.then(data => ...)` receives the parsed object.

### Mini practice
Fetch the same URL and log just `data.title`.

### Answer key
```javascript
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(r => r.json())
  .then(d => console.log(d.title));
```

### Quiz
1. Does `fetch` return data immediately?

**Answer:** No, it returns a Promise.

---

## Lesson 37 — Promises

### Simple explanation
A **Promise** is an object that represents a future value. Three states: **pending**, **fulfilled**, **rejected**.

### Tiny code example
```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 500);
});
p.then(value => console.log(value))
 .catch(err => console.error(err));
```

### Symbol-by-symbol
- `new Promise(executor)` — `executor` is a function that gets `resolve` and `reject`.
- `resolve(x)` — fulfill with value `x`.
- `reject(e)` — reject with error `e`.
- `.then(fn)` — runs on fulfillment.
- `.catch(fn)` — runs on rejection.

### Mini practice
Make a Promise that resolves to `42`, then print it.

### Answer key
```javascript
Promise.resolve(42).then(v => console.log(v));
```

### Quiz
1. What's the opposite of `.then`?

**Answer:** `.catch`.

---

## Lesson 38 — Async/await

### Simple explanation
`async`/`await` lets you write Promise code that **looks** synchronous.

### Tiny code example
```javascript
async function loadTodo() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await res.json();
  console.log(data.title);
}
loadTodo();
```

### Symbol-by-symbol
- `async` before a function — that function returns a Promise.
- `await` before a Promise — pause until it settles, then give its value.
- `await` only works inside `async` functions (or top-level modules).

### Errors
Wrap with `try/catch`:
```javascript
async function load() {
  try {
    const r = await fetch("/bad");
  } catch (e) {
    console.error(e);
  }
}
```

### Mini practice
Rewrite Lesson 36's example using `async/await`.

### Answer key
See the example above.

### Quiz
1. Where can you use `await`?

**Answer:** Inside an `async` function (or top-level of a module).

---

## Lesson 39 — Modules

### Simple explanation
**Modules** split code across files. Use `export` to share, `import` to use.

### Tiny code example
**math.js**
```javascript
export function add(a, b) { return a + b; }
export const PI = 3.14;
export default function hello() { console.log("hi"); }
```

**main.js**
```javascript
import hello, { add, PI } from "./math.js";
hello();
console.log(add(2, 3), PI);
```

To use modules in HTML: `<script type="module" src="main.js"></script>`.

### Symbol-by-symbol
- `export` — make available to other files.
- `export default` — the file's "main" export; imported without braces.
- `import { name } from "./file.js"` — named import.
- `import name from "./file.js"` — default import.

### Common mistakes
- Forgetting `type="module"` in the script tag.
- Forgetting the `.js` extension in the path.

### Mini practice
What kind of import is this: `import x from "./a.js"`?

### Answer key
A **default** import.

### Quiz
1. Difference between named and default exports?

**Answer:** Default = one per file, imported without braces; named = many, imported with braces.

---

## Lesson 40 — Classes

### Simple explanation
A **class** is a blueprint for objects.

### Tiny code example
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + " makes a sound.");
  }
}

const a = new Animal("Rex");
a.speak();
```

### Symbol-by-symbol
- `class` — keyword.
- `constructor(...)` — special method that runs on `new`.
- `this.name = name` — store on the new object.
- `new Animal("Rex")` — create a new instance.

### Inheritance
```javascript
class Dog extends Animal {
  speak() { console.log(this.name + " barks."); }
}
new Dog("Rex").speak();
```
- `extends` — inherit from a class.
- `super(...)` — call the parent constructor (when needed).

### Mini practice
Make a class `Counter` with method `inc()` that increases `this.count`.

### Answer key
```javascript
class Counter {
  constructor() { this.count = 0; }
  inc() { this.count++; }
}
```

### Quiz
1. What does `new` do?

**Answer:** Creates a new instance and runs the constructor.

---

## Lesson 41 — Debugging

### Simple explanation
Debugging = finding and fixing problems.

### Techniques
1. **Read the error.** Note the file, line, and message.
2. **`console.log`** values to see what they actually are.
3. **`debugger;`** statement — pauses execution when DevTools is open.
4. **Breakpoints** — click a line number in DevTools "Sources" tab.
5. **Step through** code with the controls (Step Over, Step Into).
6. **Watch expressions** — track variables as you step.

### Tiny code example
```javascript
function buggy(x) {
  debugger;          // pauses here in DevTools
  return x * 2;
}
buggy(5);
```

### Common beginner mistakes
- Changing code randomly. Instead: form a hypothesis, test it.
- Not reading the actual error message.

### Mini practice
What's the first thing to do when a script doesn't work?

### Answer key
Open DevTools → Console → read the error.

### Quiz
1. What does `debugger;` do?

**Answer:** Pauses execution if DevTools is open.

---

## Lesson 42 — Small beginner projects

Practice consolidates everything. Try these in order.

### Project 1 — Greeter
Prompt for a name, print `Hello, NAME!`.
```javascript
const name = prompt("Your name?");
alert(`Hello, ${name}!`);
```

### Project 2 — FizzBuzz
Print 1..50; replace multiples of 3 with `Fizz`, 5 with `Buzz`, both with `FizzBuzz`.
```javascript
for (let i = 1; i <= 50; i++) {
  let out = "";
  if (i % 3 === 0) out += "Fizz";
  if (i % 5 === 0) out += "Buzz";
  console.log(out || i);
}
```

### Project 3 — To-do list (DOM)
Input + button + list. Add items on click. Remove on click.

### Project 4 — Counter app
Buttons `+` and `-` change a number on screen.

### Project 5 — Weather fetcher
Use `fetch` + `async/await` to load data from a public weather API and display it.

### Project 6 — Quiz app
An array of questions (objects). Render them, score the user, show results.

### Project 7 — Note-taking app with localStorage
Save notes in `localStorage.setItem(key, JSON.stringify(notes))`.

---

## Final words

You now have a complete reference covering everything from the smallest dot `.` to async/await and classes. Re-read each lesson, type out every example yourself (don't copy-paste), and **build something small every day**. That's how programmers grow.

Happy coding! 🎉
