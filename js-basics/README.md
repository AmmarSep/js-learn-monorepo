# JavaScript From First Principles to Async & DOM Mastery

A comprehensive, self-paced JavaScript curriculum with executable, production-quality code.

## How to Use This Guide

1. Read files **in order** (start with Phase 0)
2. Each concept includes:
   - **Explanation**: Why it exists and how JavaScript executes it
   - **Code**: Clean, runnable ES6+ JavaScript
   - **Line-by-Line Breakdown**: Every symbol explained
   - **Execution Flow**: How the code actually runs
   - **Common Mistakes**: Why they fail
3. Try running the code yourself in the browser or Node.js
4. **Never skip fundamentals** or assume anything is obvious

## Curriculum Structure

### Phase 0: Environment & Execution
- How JavaScript runs in browser and Node.js
- What the JavaScript engine is (V8 conceptually)
- How code flows from file to engine to call stack

### Phase 1: Core Fundamentals
- var, let, const (scope and hoisting)
- Data types (primitive vs reference)
- Operators and expressions
- Control flow (if, for, while)

### Phase 2: Functions & Scope
- Function declarations vs expressions
- Arrow functions
- Execution context
- Call stack
- Closures with real use cases

### Phase 3: Objects, Arrays & Prototypes
- Object creation and property access
- this keyword in every context
- Array methods (map, filter, reduce)
- Prototype chain
- prototype vs __proto__

### Phase 4: Asynchronous JavaScript
- Blocking vs non-blocking
- Event loop (high-level but correct)
- Callbacks
- Promises
- async and await
- Error handling with try and catch

### Phase 5: DOM & Browser APIs
- DOM tree concept
- Selecting elements
- Events and event bubbling
- Fetch API
- localStorage

### Phase 6: Code Quality & Debugging
- ES modules (import and export)
- Debugging with console and breakpoints
- Common JavaScript pitfalls

## File Organization

```
JS_Basics/
├── README.md (this file)
├── Phase0_Environment/
│   ├── 01_how_javascript_runs.md
│   ├── 01_browser.js
│   ├── 01_node.js
│   ├── 02_javascript_engine.md
│   └── 02_engine_demo.js
├── Phase1_Fundamentals/
├── Phase2_Functions/
├── Phase3_Objects_Arrays/
├── Phase4_Async/
├── Phase5_DOM/
└── Phase6_Quality/
```

## How to Run Code

### Browser
1. Open `browser.js` files in a text editor
2. Copy the code
3. Open your browser's Developer Tools (F12)
4. Go to Console tab
5. Paste and run the code

### Node.js
1. Save the `.js` file
2. Open terminal in this directory
3. Run: `node filename.js`

---

**Start with:** Phase0_Environment/01_how_javascript_runs.md