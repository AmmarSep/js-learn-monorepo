# Lesson 01 — Hello World, and why we write `console.log` with a dot

> **Goal:** print `"Hello, world!"` from a `.js` file using Node.js,
> and **fully understand** every character of `console.log("Hello, world!");`.

---

## 1. The shortest possible JS program

```js
console.log("Hello, world!");
```

That’s it. No `class`, no `main`, no `package`, no imports. The file *is*
the program.

Run it:

```bash
node 01-hello-world/hello.js
# or
npm run lesson:01
```

---

## 2. 🟦 In Java you would…

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

Mandatory ceremony:
- A **class** (`Main`) — Java has no top-level statements.
- A **method** with a fixed signature (`public static void main(String[])`) —
  the JVM looks for *exactly* this shape.
- `System.out.println(...)` — three things chained by dots.

## 2. 🟨 In JS you do…

```js
console.log("Hello, world!");
```

- No class. No method. No entry-point convention.
- One statement, executed top-to-bottom by Node.js.

---

## 3. Decoding `console.log("Hello, world!");` character by character

| Token | What it is | Java analogy |
|---|---|---|
| `console` | A **global object** provided by the runtime (Node.js or the browser). It is *not* a keyword and *not* a class — it’s a regular JS value you could even reassign (please don’t). | Closest analogue: the static field `System.out`. |
| `.` | The **property-access operator**. It says “look up the property on the left-hand object”. | Same operator as Java’s `.` — used for both fields and methods. |
| `log` | A **property** of the `console` object whose value happens to be a function. In JS, “methods” aren’t a separate language concept — they are just functions stored under a property. | Like calling `out.println` — `println` is a method on the `PrintStream` instance `out`. |
| `(` `)` | The **call operator**. Putting `()` after a value tries to **invoke** it as a function. Without `()`, `console.log` is just a function value (you could store it in a variable). | Same as Java’s `()` invocation. |
| `"Hello, world!"` | A **string literal**. JS allows three quote styles: `'…'`, `"…"`, and `` `…` `` (template literal — see lesson 02). | Java only allows `"…"` (and text blocks `"""…"""`). |
| `;` | Statement terminator. **Optional in JS** thanks to Automatic Semicolon Insertion (ASI), but we always write it for clarity. | Mandatory in Java. |

> 💡 **Why the dot?** Because `console` is *just an object*, and accessing
> a function stored on an object uses the same `.` you already know from
> Java. The thing that surprises Java devs is that `console` itself isn’t
> a class — it’s a value. Lesson 03 goes deep on this.

---

## 4. ⚠️ Gotchas for Java devs

- **No `main` function.** Top-level code runs immediately. The JS equivalent
  of `psvm` is *just typing the statement at the top of the file*.
- **`console` is not part of the language spec** — it is provided by the
  *host* (Node.js, the browser, Deno, …). Writing JS for, say, an embedded
  engine like QuickJS may not give you `console` for free.
- **`console.log` does not return anything useful** — it returns `undefined`
  (the JS equivalent of Java’s `void`, except `undefined` is an actual value
  you can pass around).
- **Strings can use single quotes.** `'hi'` and `"hi"` are identical. There
  is no `char` type — a single character is just a 1-length string.

---

## 5. The single-quote / double-quote / backtick mini-tour

```js
console.log('single quotes are fine');
console.log("double quotes are fine too");
console.log(`backticks allow ${1 + 1} interpolation`); // template literal
```

🟦 In Java the `String.format` / `+` concatenation:

```java
System.out.println("1 + 1 = " + (1 + 1));
```

🟨 In JS the **template literal** (backticks + `${ ... }`):

```js
console.log(`1 + 1 = ${1 + 1}`);
```

Inside `${ ... }` you can put any expression — function calls, ternaries,
even other template literals.

---

## 6. What about `'use strict';`?

You will see this at the top of every file in this course:

```js
'use strict';
```

It opts the file into **strict mode** — a stricter, saner subset of JS that
turns silent bugs into errors (e.g. assigning to an undeclared variable).
Java has no equivalent, because Java is already “always strict”.

> Note: ES modules (`.mjs` / `"type": "module"`) are strict by default, but
> we’re using CommonJS in early lessons, so we add the pragma explicitly.

---

## 7. What you just learned

- A `.js` file is the program. No class, no `main`.
- `console.log(...)` is `<object>.<method>(<arg>)` — pure dot-access.
- `console` is a global **object** from the runtime, not a keyword.
- Strings have three flavours; backticks allow `${...}` interpolation.
- Semicolons are optional but we keep them.
- `'use strict';` opts in to safer semantics.

Now open `hello.js`, then try `exercises.js`.
