// ========================================
// JAVASCRIPT IN NODE.JS
// ========================================
// These examples only work in Node.js
// Save this file and run:
// node 01_node.js

// SECTION 1: Basic variables and console output (same as browser!)
// ========================================

let message = "Hello from Node.js";
console.log(message);
// Output: Hello from Node.js
// This works exactly the same as in browser

// SECTION 2: Access Node.js-specific global variables
// ========================================

console.log(typeof __filename);
// Output: string
// __filename = path to the current file

console.log(typeof __dirname);
// Output: string
// __dirname = directory containing the current file

console.log("Current file:", __filename);
console.log("Current directory:", __dirname);

// SECTION 3: Try to access browser APIs (they don't exist!)
// ========================================

console.log(typeof window);
// Output: undefined
// window doesn't exist in Node.js

console.log(typeof document);
// Output: undefined
// document doesn't exist in Node.js (no HTML pages!)

// SECTION 4: Import Node.js built-in modules
// ========================================

const fs = require('fs');
// 'const' = declare a constant variable (can't be changed later)
// 'fs' = variable name (stands for "file system")
// 'require()' = Node.js function to import modules
// After this, 'fs' has methods like writeFileSync, readFile, etc.

console.log(typeof fs);
// Output: object (fs is an object with file system methods)

// SECTION 5: Write to a file
// ========================================

fs.writeFileSync('output.txt', 'Hello! I wrote this from JavaScript!');
// This creates a new file called "output.txt" with the message
// The file will appear in your current directory
// "Sync" means the engine waits for the file to be written before continuing

console.log('File written successfully!');

// SECTION 6: Read from a file
// ========================================

const content = fs.readFileSync('output.txt', 'utf8');
// 'readFileSync' = read a file (Sync = wait for it to finish)
// 'utf8' = the format to read (text, not binary)
// 'content' = now contains the file's contents

console.log("File contents:", content);
// Output: File contents: Hello! I wrote this from JavaScript!

// SECTION 7: Check for browser APIs (they don't exist here)
// ========================================

console.log(typeof require);
// Output: function (require is available in Node.js)

console.log(typeof localStorage);
// Output: undefined (localStorage is browser-only)

// SECTION 8: Access Node.js process information
// ========================================

console.log(process.version);
// Output: v18.x.x (your Node.js version)
// 'process' = Node.js object with system information

console.log(process.platform);
// Output: linux, darwin, or win32 (your operating system)
