# Phase 3, Concept 1: Objects and Property Access

## Why This Matters

Objects are the foundation of JavaScript. Almost everything is an object:
- Variables
- Functions
- Arrays
- DOM elements

Understanding objects is critical because:
- You work with objects constantly
- Property access (dot vs bracket) affects code clarity
- Objects are passed by reference, affecting how code behaves
- Object-oriented patterns depend on object fundamentals

---

## What Is an Object?

An object is a collection of **key-value pairs** (properties and methods):

```javascript
let person = {
  name: "Alice",
  age: 30,
  city: "NYC"
};

// name, age, city are KEYS
// "Alice", 30, "NYC" are VALUES
```

---

## Creating Objects

### Object Literal (Most Common)

```javascript
let person = {
  name: "Alice",
  age: 30,
  city: "NYC"
};
```

### Object Constructor

```javascript
let person = new Object();
person.name = "Alice";
person.age = 30;
```

### Constructor Function

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person = new Person("Alice", 30);
```

---

## Accessing Properties

### Dot Notation

```javascript
let person = {
  name: "Alice",
  age: 30
};

console.log(person.name);  // "Alice"
console.log(person.age);   // 30
```

**Limitations:**
- Key must be a valid identifier (no spaces, hyphens, or starting with numbers)
- Key must be known at write time

### Bracket Notation

```javascript
let person = {
  name: "Alice",
  age: 30,
  "home city": "NYC"  // Has a space, can't use dot notation
};

console.log(person["name"]);      // "Alice"
console.log(person["age"]);       // 30
console.log(person["home city"]); // "NYC"
```

**Advantages:**
- Can use any string as key (even with spaces)
- Key can be dynamic (from a variable)

### Dynamic Key Access

```javascript
let person = {
  name: "Alice",
  age: 30,
  email: "alice@example.com"
};

let key = "name";
console.log(person[key]);  // "Alice"

key = "age";
console.log(person[key]);  // 30

// Dot notation can't do this:
// console.log(person.key);  // Looks for a property literally named "key"
```

---

## Adding and Modifying Properties

```javascript
let person = { name: "Alice" };

// Add a new property
person.age = 30;
person["email"] = "alice@example.com";

// Modify existing property
person.name = "Bob";
person["age"] = 31;

console.log(person);
// { name: "Bob", age: 31, email: "alice@example.com" }
```

---

## Deleting Properties

```javascript
let person = { name: "Alice", age: 30 };

delete person.age;
console.log(person);  // { name: "Alice" }
console.log(person.age);  // undefined
```

---

## Methods: Functions as Properties

Objects can contain functions (called methods):

```javascript
let person = {
  name: "Alice",
  greet: function() {
    return "Hello, I'm " + this.name;
  }
};

console.log(person.greet());  // "Hello, I'm Alice"
```

**Modern shorthand:**

```javascript
let person = {
  name: "Alice",
  greet() {  // Shorthand method syntax
    return "Hello, I'm " + this.name;
  }
};

console.log(person.greet());  // "Hello, I'm Alice"
```

---

## this in Objects

When a method uses `this`, it refers to the object:

```javascript
let user = {
  name: "Alice",
  email: "alice@example.com",
  displayInfo: function() {
    console.log("Name: " + this.name);
    console.log("Email: " + this.email);
  }
};

user.displayInfo();
// Name: Alice
// Email: alice@example.com

// this refers to 'user' because displayInfo was called on 'user'
```

---

## Nested Objects

Objects can contain other objects:

```javascript
let person = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "NYC",
    zip: "10001"
  }
};

console.log(person.address.city);       // "NYC"
console.log(person["address"]["zip"]);  // "10001"
```

---

## Checking if Property Exists

```javascript
let person = { name: "Alice", age: 30 };

// Using 'in' operator
console.log("name" in person);     // true
console.log("email" in person);    // false

// Using hasOwnProperty() method
console.log(person.hasOwnProperty("name"));    // true
console.log(person.hasOwnProperty("email"));   // false

// Using typeof (checks if undefined)
console.log(typeof person.name);    // "string"
console.log(typeof person.email);   // "undefined"

// Direct comparison
console.log(person.email !== undefined);  // false
```

---

## Iterating Over Objects

### for...in Loop

```javascript
let person = {
  name: "Alice",
  age: 30,
  city: "NYC"
};

for (let key in person) {
  console.log(key, person[key]);
}
// Output:
// name Alice
// age 30
// city NYC
```

### Object.keys()

```javascript
let person = {
  name: "Alice",
  age: 30,
  city: "NYC"
};

let keys = Object.keys(person);
console.log(keys);  // ["name", "age", "city"]

// Iterate using keys
keys.forEach(function(key) {
  console.log(key, person[key]);
});
```

### Object.entries()

```javascript
let person = {
  name: "Alice",
  age: 30,
  city: "NYC"
};

let entries = Object.entries(person);
// [["name", "Alice"], ["age", 30], ["city", "NYC"]]

entries.forEach(function([key, value]) {
  console.log(key, value);
});
```

---

## Code Example: Objects in Action

```javascript
// ========================================
// OBJECTS DEMONSTRATION
// ========================================

console.log("=== CREATING OBJECTS ===\n");

let car = {
  make: "Toyota",
  model: "Camry",
  year: 2023,
  specs: {
    engine: "2.5L",
    transmission: "Automatic"
  },
  start: function() {
    return "Engine started";
  }
};

console.log(car);

console.log("\n=== PROPERTY ACCESS ===\n");

console.log(car.make);                   // "Toyota" (dot notation)
console.log(car["model"]);               // "Camry" (bracket notation)
console.log(car.specs.engine);           // "2.5L" (nested)
console.log(car["specs"]["transmission"]);  // "Automatic"

console.log("\n=== DYNAMIC PROPERTY ACCESS ===\n");

let property = "year";
console.log(car[property]);  // 2023

console.log("\n=== MODIFYING OBJECTS ===\n");

car.color = "blue";
car["doors"] = 4;
car.year = 2024;

console.log(car);

console.log("\n=== METHODS ===\n");

console.log(car.start());  // "Engine started"

car.drive = function() {
  return "Driving a " + this.year + " " + this.make;
};

console.log(car.drive());  // "Driving a 2024 Toyota"

console.log("\n=== CHECKING PROPERTIES ===\n");

console.log("color" in car);        // true
console.log("wheels" in car);       // false
console.log(car.hasOwnProperty("make"));  // true
console.log(car.hasOwnProperty("toString"));  // false

console.log("\n=== ITERATING OBJECTS ===\n");

console.log("Using for...in:");
for (let key in car) {
  if (typeof car[key] !== "function") {  // Skip methods
    console.log(key + ":", car[key]);
  }
}

console.log("\nUsing Object.keys():");
Object.keys(car).forEach(function(key) {
  if (typeof car[key] !== "function") {
    console.log(key + ":", car[key]);
  }
});
```

---

## Common Mistakes

### Mistake 1: Confusing dot and bracket notation

```javascript
// ❌ WRONG: Using dot notation with variable
let key = "name";
let person = { name: "Alice" };
console.log(person.key);  // undefined (looks for property "key")

// ✅ CORRECT: Use bracket notation
console.log(person[key]);  // "Alice"
```

### Mistake 2: Forgetting 'this' in methods

```javascript
// ❌ WRONG
let user = {
  name: "Alice",
  display: function() {
    console.log(name);  // Error: name is not defined
  }
};

// ✅ CORRECT
let user = {
  name: "Alice",
  display: function() {
    console.log(this.name);  // "Alice"
  }
};
```

### Mistake 3: Using arrow function for method loses 'this'

```javascript
// ❌ WRONG: Arrow function doesn't bind 'this'
let user = {
  name: "Alice",
  display: () => {
    console.log(this.name);  // undefined
  }
};

// ✅ CORRECT: Use regular function
let user = {
  name: "Alice",
  display: function() {
    console.log(this.name);  // "Alice"
  }
};
```

### Mistake 4: Not checking if property exists

```javascript
// ❌ WRONG: Accessing undefined properties
let person = { name: "Alice" };
console.log(person.age.toString());  // Error: Cannot read property 'toString' of undefined

// ✅ CORRECT: Check first
if (person.age !== undefined) {
  console.log(person.age.toString());
}

// ✅ CORRECT: Use optional chaining (modern)
console.log(person.age?.toString());  // undefined (no error)
```

---

## Next Steps

1. Create objects with different properties
2. Practice dot vs bracket notation
3. Write methods that use 'this'
4. Iterate over objects
5. Move to: **02_arrays_and_array_methods.md**
