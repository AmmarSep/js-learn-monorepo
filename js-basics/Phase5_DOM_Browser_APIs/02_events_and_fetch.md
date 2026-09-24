# Phase 5, Concept 2: Events and Fetch API

## Events: Responding to User Interactions

Events are notifications that something happened (click, submit, etc.)

### Adding Event Listeners

```javascript
let button = document.querySelector("button");

button.addEventListener("click", function() {
  console.log("Button clicked!");
});

// With arrow function
button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

### Common Events

```javascript
// Mouse events
element.addEventListener("click", function() { });
element.addEventListener("dblclick", function() { });
element.addEventListener("mouseover", function() { });
element.addEventListener("mouseout", function() { });

// Form events
input.addEventListener("change", function() { });
input.addEventListener("input", function() { });
form.addEventListener("submit", function(e) {
  e.preventDefault();  // Stop form submission
});

// Keyboard events
document.addEventListener("keydown", function(e) {
  console.log(e.key);  // Which key was pressed
});

// Window events
window.addEventListener("load", function() { });
window.addEventListener("resize", function() { });
```

### Event Object

Events pass an event object with details:

```javascript
button.addEventListener("click", function(event) {
  console.log(event.type);     // "click"
  console.log(event.target);   // The element clicked
  console.log(event.clientX);  // Mouse X position
  console.log(event.clientY);  // Mouse Y position
});

// Keyboard event example
document.addEventListener("keydown", function(event) {
  console.log(event.key);      // "a", "Enter", "Shift", etc.
  console.log(event.code);     // Keyboard code
  console.log(event.ctrlKey);  // Is Ctrl pressed?
});

// Form input
input.addEventListener("input", function(event) {
  console.log(event.target.value);  // Current input value
});
```

### Preventing Default Behavior

```javascript
let link = document.querySelector("a");

link.addEventListener("click", function(event) {
  event.preventDefault();  // Don't navigate
  console.log("Link clicked but didn't navigate");
});

let form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  event.preventDefault();  // Don't submit to server
  console.log("Form submitted but handled with JavaScript");
  // Handle form data manually
});
```

---

## Fetch API: Making Network Requests

The **Fetch API** makes HTTP requests to servers.

### Basic Fetch

```javascript
// GET request
fetch("/api/users")
  .then(response => {
    console.log(response.status);  // 200, 404, etc.
    return response.json();        // Parse JSON
  })
  .then(data => {
    console.log("Users:", data);
  })
  .catch(error => {
    console.log("Error:", error);
  });
```

### Fetch with async/await

```javascript
async function getUsers() {
  try {
    let response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let users = await response.json();
    console.log("Users:", users);
    return users;

  } catch (error) {
    console.log("Error:", error);
  }
}

getUsers();
```

### POST Request

```javascript
async function createUser(name, email) {
  try {
    let response = await fetch("/api/users", {
      method: "POST",           // HTTP method
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({    // Data to send
        name: name,
        email: email
      })
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    let newUser = await response.json();
    console.log("Created:", newUser);
    return newUser;

  } catch (error) {
    console.log("Error:", error);
  }
}

createUser("Alice", "alice@example.com");
```

### Other HTTP Methods

```javascript
// PUT (update entire resource)
fetch("/api/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Bob", email: "bob@example.com" })
});

// PATCH (update partial resource)
fetch("/api/users/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Bob" })  // Only update name
});

// DELETE
fetch("/api/users/1", {
  method: "DELETE"
});
```

---

## Code Example: Events and Fetch

```javascript
// ========================================
// EVENTS AND FETCH DEMONSTRATION
// ========================================

console.log("=== CLICK EVENT ===\n");

let button = document.querySelector("button");
if (button) {
  button.addEventListener("click", function() {
    console.log("Button was clicked");
    button.textContent = "Clicked!";
  });
}

console.log("=== FORM SUBMISSION ===\n");

let form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function(event) {
    event.preventDefault();  // Don't reload page
    console.log("Form submitted");

    let name = form.querySelector("input[name='name']").value;
    console.log("Name:", name);
  });
}

console.log("=== FETCH API ===\n");

async function loadUsers() {
  try {
    // Simulated API call
    let response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    let users = await response.json();
    console.log("Loaded users:", users);

  } catch (error) {
    console.log("Error loading users:", error);
  }
}

// Uncomment to test with real API:
// loadUsers();

console.log("=== KEYBOARD EVENT ===\n");

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    console.log("Enter key pressed");
  }
});

console.log("=== MOUSE EVENT ===\n");

let box = document.querySelector("#box");
if (box) {
  box.addEventListener("mouseover", function() {
    console.log("Mouse over box");
    box.style.backgroundColor = "lightblue";
  });

  box.addEventListener("mouseout", function() {
    console.log("Mouse left box");
    box.style.backgroundColor = "";
  });
}
```

---

## Common Mistakes

### Mistake 1: Accessing value before waiting for fetch

```javascript
// ❌ WRONG: data is still a Promise
let data = fetch("/api/users");
console.log(data.name);  // Error!

// ✅ CORRECT: Wait for fetch
let response = await fetch("/api/users");
let data = await response.json();
console.log(data.name);
```

### Mistake 2: Not checking response status

```javascript
// ❌ WRONG: Assumes success
fetch("/api/users")
  .then(response => response.json())
  .then(data => console.log(data));

// If server returns 404 or 500, you still try to parse JSON!

// ✅ CORRECT: Check status
fetch("/api/users")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log("Error:", error));
```

### Mistake 3: Not preventing default form submission

```javascript
// ❌ WRONG: Form submits to server
form.addEventListener("submit", function(event) {
  let name = form.querySelector("input").value;
  console.log("Name:", name);
  // Form still submits, page reloads
});

// ✅ CORRECT: Prevent default
form.addEventListener("submit", function(event) {
  event.preventDefault();  // Stop form submission
  let name = form.querySelector("input").value;
  console.log("Name:", name);
  // Now you handle it with JavaScript
});
```

### Mistake 4: Forgetting JSON.stringify for POST

```javascript
// ❌ WRONG: Sending object directly
fetch("/api/users", {
  method: "POST",
  body: { name: "Alice" }  // Won't work!
});

// ✅ CORRECT: Convert to JSON string
fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice" })
});
```

---

## Next Steps

1. Add click listeners to buttons
2. Handle form submissions
3. Make fetch requests to APIs
4. Update DOM with fetched data
5. Move to: **Phase 6 - Code Quality & Debugging**
