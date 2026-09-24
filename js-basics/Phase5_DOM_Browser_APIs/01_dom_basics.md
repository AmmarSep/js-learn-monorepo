# Phase 5, Concept 1: DOM Basics and Selecting Elements

## Why This Matters

The **DOM** (Document Object Model) is the interface to interact with HTML pages in JavaScript.

Understanding the DOM is critical because:
- All frontend code interacts with the DOM
- You need to select elements to modify them
- Events come from DOM elements
- Most practical JavaScript involves DOM manipulation

---

## What Is the DOM?

The **DOM** is a tree-like structure representing the HTML document:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>This is a paragraph</p>
  </body>
</html>
```

The DOM tree:
```
Document
  ├── html
      ├── head
      │   └── title
      └── body
          ├── h1
          └── p
```

Each element is a **node** in this tree. JavaScript can:
- Select nodes
- Modify their content
- Add/remove nodes
- Respond to user interactions

---

## Accessing the DOM

The global `document` object represents the entire page:

```javascript
console.log(document);           // The entire document
console.log(document.body);      // The <body> element
console.log(document.head);      // The <head> element
console.log(document.title);     // The page title
```

---

## Selecting Elements

### By ID (most specific)

```javascript
let element = document.getElementById("myId");

// Example:
let header = document.getElementById("header");
```

### By Class Name

```javascript
let elements = document.getElementsByClassName("myClass");
// Returns a live HTMLCollection (array-like)

for (let elem of elements) {
  console.log(elem);
}
```

### By Tag Name

```javascript
let buttons = document.getElementsByTagName("button");
// Returns all <button> elements

for (let btn of buttons) {
  console.log(btn);
}
```

### Using querySelector (modern, recommended)

```javascript
// Select first matching element
let element = document.querySelector("selector");

// Select all matching elements
let elements = document.querySelectorAll("selector");
```

### querySelector Examples

```javascript
// By ID
let elem = document.querySelector("#myId");

// By class
let elem = document.querySelector(".myClass");

// By tag
let elem = document.querySelector("button");

// Complex selectors
let elem = document.querySelector("div.container > p");

// Select all
let buttons = document.querySelectorAll("button");
let allElements = document.querySelectorAll("*");
```

---

## Modifying Element Content

### innerHTML (entire HTML inside)

```javascript
let elem = document.querySelector("#content");
elem.innerHTML = "<h1>New Title</h1>";  // Replaces content
console.log(elem.innerHTML);  // Read the HTML
```

### textContent (just text, no HTML)

```javascript
let elem = document.querySelector("#message");
elem.textContent = "Hello World";  // Doesn't interpret HTML
console.log(elem.textContent);
```

### innerText (visible text only)

```javascript
let elem = document.querySelector("p");
console.log(elem.innerText);  // Gets visible text
```

---

## Modifying Attributes

```javascript
let link = document.querySelector("a");

// Set attribute
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");

// Get attribute
let url = link.getAttribute("href");

// Check if has attribute
if (link.hasAttribute("href")) {
  console.log("Has href");
}

// Remove attribute
link.removeAttribute("target");
```

### Direct Property Access

```javascript
let input = document.querySelector("input");

// These are shortcuts for setAttribute/getAttribute
input.type = "email";
input.value = "user@example.com";
input.disabled = true;

console.log(input.type);      // "email"
console.log(input.value);     // "user@example.com"
console.log(input.disabled);  // true
```

---

## Modifying Styles

```javascript
let elem = document.querySelector("#box");

// Inline styles
elem.style.backgroundColor = "blue";
elem.style.color = "white";
elem.style.fontSize = "16px";
elem.style.padding = "10px";

// CSS properties with hyphens become camelCase
elem.style.borderRadius = "5px";  // border-radius
elem.style.marginTop = "20px";    // margin-top
```

### Adding/Removing Classes

Much better than inline styles:

```javascript
let elem = document.querySelector("#box");

// Add class
elem.classList.add("active");

// Remove class
elem.classList.remove("active");

// Toggle class (add if missing, remove if present)
elem.classList.toggle("active");

// Check if has class
if (elem.classList.contains("active")) {
  console.log("Element is active");
}
```

---

## Creating New Elements

```javascript
// Create element
let button = document.createElement("button");

// Set content and attributes
button.textContent = "Click me";
button.setAttribute("id", "myButton");
button.classList.add("btn");

// Add to page
document.body.appendChild(button);  // Add to end of body

// Or add to specific element
let container = document.querySelector("#container");
container.appendChild(button);
```

---

## Navigating the DOM

### Parent Element

```javascript
let elem = document.querySelector("p");
let parent = elem.parentElement;
console.log(parent);  // The <div> containing the <p>
```

### Child Elements

```javascript
let container = document.querySelector("#container");
let children = container.children;  // HTMLCollection
let firstChild = container.firstElementChild;
let lastChild = container.lastElementChild;

for (let child of children) {
  console.log(child);
}
```

### Sibling Elements

```javascript
let elem = document.querySelector("p");
let nextSibling = elem.nextElementSibling;
let prevSibling = elem.previousElementSibling;
```

---

## Code Example: DOM Manipulation

```javascript
// ========================================
// DOM MANIPULATION DEMONSTRATION
// ========================================

console.log("=== SELECTING ELEMENTS ===\n");

let heading = document.querySelector("h1");
console.log(heading);

let buttons = document.querySelectorAll("button");
console.log("Button count:", buttons.length);

console.log("\n=== MODIFYING CONTENT ===\n");

if (heading) {
  heading.textContent = "Welcome to JavaScript";
  console.log("Changed heading");
}

console.log("\n=== MODIFYING STYLES ===\n");

let box = document.querySelector("#box");
if (box) {
  box.style.backgroundColor = "lightblue";
  box.style.padding = "20px";
  box.style.borderRadius = "5px";
  console.log("Styled the box");
}

console.log("\n=== CREATING ELEMENTS ===\n");

let list = document.querySelector("ul");
if (list) {
  for (let i = 1; i <= 3; i++) {
    let item = document.createElement("li");
    item.textContent = "Item " + i;
    list.appendChild(item);
  }
  console.log("Added items to list");
}

console.log("\n=== NAVIGATING DOM ===\n");

let elem = document.querySelector("p");
if (elem) {
  console.log("Parent:", elem.parentElement);
  console.log("Next sibling:", elem.nextElementSibling);
}
```

---

## Common Mistakes

### Mistake 1: Selecting before HTML loads

```html
<!-- ❌ WRONG: Script runs before elements exist -->
<script>
  let heading = document.querySelector("h1");  // null!
  heading.textContent = "Hello";  // Error!
</script>

<h1>My Page</h1>

<!-- ✅ CORRECT: Script runs after HTML -->
<h1>My Page</h1>
<script>
  let heading = document.querySelector("h1");  // Works!
  heading.textContent = "Hello";
</script>

<!-- ✅ CORRECT: Defer script loading -->
<script src="script.js" defer></script>
<h1>My Page</h1>
```

### Mistake 2: Using innerHTML with user input (XSS vulnerability)

```javascript
// ❌ DANGEROUS: User input could be malicious
let userInput = "<img src=x onerror='stealData()'>";
document.querySelector("#content").innerHTML = userInput;
// This runs the stealData() function!

// ✅ SAFE: Use textContent for user input
document.querySelector("#content").textContent = userInput;
// Displayed as text, not executed
```

### Mistake 3: Trying to use variables before defining them

```javascript
// ❌ WRONG: Button doesn't exist yet
button.addEventListener("click", function() {
  console.log("Clicked");
});

let button = document.querySelector("button");

// ✅ CORRECT: Define before using
let button = document.querySelector("button");
button.addEventListener("click", function() {
  console.log("Clicked");
});
```

### Mistake 4: Forgetting direct property vs getAttribute()

```javascript
let input = document.querySelector("input");

// These are different:
input.value = "hello";      // Sets the value
input.setAttribute("value", "hello");  // Sets the HTML attribute

// Usually use direct property for form elements:
console.log(input.value);    // Current value
console.log(input.type);     // Input type
console.log(input.disabled); // Boolean properties
```

---

## Next Steps

1. Select elements using querySelector
2. Modify text content and HTML
3. Change styles with classList
4. Create and append new elements
5. Navigate parent/child/sibling relationships
6. Move to: **02_events_and_event_listeners.md**
