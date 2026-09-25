// ========================================
// JAVASCRIPT IN THE BROWSER
// ========================================
// These examples only work in a web browser
// You can run this by:
// 1. Opening DevTools (F12 or Right-click → Inspect)
// 2. Going to the Console tab
// 3. Copying and pasting each section below

// SECTION 1: Basic variables and console output
// ========================================

let message = "Hello from browser";
console.log(message);
// Output: Hello from browser

// SECTION 2: Access browser-only global object (window)
// ========================================

console.log(typeof window);
// Output: object
// 'window' is provided by the browser, not your code

// SECTION 3: Access browser global properties
// ========================================

console.log(window.location.href);
// Output: The current page URL
// Example: https://example.com/page

// SECTION 4: Manipulate the DOM (Document Object Model)
// ========================================

console.log(typeof document);
// Output: object
// 'document' represents the entire HTML page

// The following line changes the content of the page:
document.body.innerHTML = "<h1>JavaScript modified this!</h1>";

// SECTION 5: Create a simple button that responds to clicks
// ========================================

let button = document.createElement('button');
button.textContent = 'Click me!';
button.onclick = function() {
  alert('You clicked the button!');
};
document.body.appendChild(button);

// SECTION 6: Check browser-specific APIs
// ========================================

console.log(typeof localStorage);
// Output: object (browser's local storage API)

console.log(typeof fetch);
// Output: function (browser's API for making web requests)

// SECTION 7: Confirm Node.js APIs don't exist
// ========================================

console.log(typeof require);
// Output: undefined (Node.js function, not in browser)

console.log(typeof __filename);
// Output: undefined (Node.js variable, not in browser)
