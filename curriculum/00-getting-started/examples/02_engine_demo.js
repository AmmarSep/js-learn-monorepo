// ========================================
// JAVASCRIPT ENGINE DEMONSTRATION
// ========================================
// Run this file in Node.js to see how the engine works
// From the repository root: node curriculum/00-getting-started/examples/02_engine_demo.js

console.log("=== PARSING, COMPILATION, AND EXECUTION ===\n");

// SECTION 1: Syntax errors fail during parsing
// ========================================
console.log("SECTION 1: If this runs, parsing succeeded!");
console.log("(If there was a syntax error above, the entire script would fail)\n");

// SECTION 2: The call stack in action
// ========================================
console.log("SECTION 2: Observing the call stack\n");

console.log("1. Start of script");

function first() {
  console.log("3. Inside first()");
  second();
  console.log("5. Back in first()");
}

function second() {
  console.log("4. Inside second()");
  third();
  console.log("(Still in second, after third() returns)");
}

function third() {
  console.log("(Inside third())");
}

console.log("2. Calling first()");
first();
console.log("6. End of script\n");

// SECTION 3: Stack memory (simple values)
// ========================================
console.log("SECTION 3: Stack memory\n");

let age = 25;           // Stack memory
let name = "Alice";     // Stack memory
let isStudent = true;   // Stack memory

console.log("Variables on stack:", { age, name, isStudent });
console.log("(These are simple values, stored directly on stack)\n");

// SECTION 4: Heap memory (complex values)
// ========================================
console.log("SECTION 4: Heap memory\n");

let person = {
  name: "Bob",
  age: 30,
  email: "bob@example.com"
};

console.log("Object stored on heap:", person);
console.log("(The object is on heap, 'person' variable has address to it)\n");

// SECTION 5: Seeing compilation happen
// ========================================
console.log("SECTION 5: Optimization example\n");

// This function runs once
let result1 = 10 + 5;
console.log("Simple calculation:", result1);

// This loop runs many times (V8 will compile it)
console.log("Running loop 1,000,000 times...");
let startTime = Date.now();

for (let i = 0; i < 1000000; i++) {
  let x = i * 2 + 3;
}

let endTime = Date.now();
console.log("Loop completed in " + (endTime - startTime) + "ms");
console.log("(V8 compiled this loop to machine code - that's why it's fast)\n");

// SECTION 6: Understanding execution order
// ========================================
console.log("SECTION 6: Execution order\n");

let step1 = "First";
console.log("Step 1:", step1);

function doSomething() {
  console.log("Step 3: Inside doSomething");
  return "Result";
}

let step2 = doSomething();
console.log("Step 2 result:", step2);

console.log("Step 4: End\n");

// SECTION 7: Runtime errors
// ========================================
console.log("SECTION 7: Runtime errors\n");

console.log("typeof x:", typeof x);  // undefined (safe with typeof)

try {
  console.log(y);  // This throws an error
} catch (error) {
  console.log("Error caught:", error.message);
  console.log("(This error happened during EXECUTION, not parsing)\n");
}

// SECTION 8: Call stack depth
// ========================================
console.log("SECTION 8: Call stack depth\n");

let recursionDepth = 0;

function recursiveFunction(n) {
  recursionDepth++;
  if (n > 1000) {
    console.log("Stopped at recursion depth:", recursionDepth);
    console.log("(Limited by call stack size, not infinite memory)\n");
    return;
  }
  recursiveFunction(n + 1);
}

recursiveFunction(0);

console.log("=== DEMONSTRATION COMPLETE ===");
