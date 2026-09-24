# CHEATSHEET — Java vs JavaScript (side by side)

This file grows lesson by lesson. Each row shows the *smallest equivalent
snippet* in both languages, so you can scan and translate quickly.

---

## Lesson 01 — Hello world & printing

| Concern | 🟦 Java | 🟨 JavaScript |
|---|---|---|
| Entry point | `public class Main { public static void main(String[] args) { ... } }` | The file itself. No wrapper needed. |
| Print a line | `System.out.println("Hello");` | `console.log("Hello");` |
| Why a dot? | `System` is a class, `out` is a static field of type `PrintStream`, `println` is its method. | `console` is a global **object**, `log` is a **method** stored as one of its properties. The `.` is the property-access operator. |
| File extension | `.java` (then compiled to `.class`) | `.js` (interpreted/JIT directly by Node or browser) |
| Run command | `javac Main.java && java Main` | `node hello.js` |
| Strings | Double quotes only: `"hi"` | Single, double, or backticks: `'hi'`, `"hi"`, `` `hi` `` |
| String interpolation | `String.format("Hello %s", name)` or `"Hello " + name` | Template literal: `` `Hello ${name}` `` |
| Statement terminator | Semicolon **required** | Semicolon **optional** (ASI fills them in) — but we still write them. |

---

> More rows are added as lessons land (variables, functions, classes,
> async, etc.).
