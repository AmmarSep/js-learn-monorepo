// ============================================================
// this-keyword.js — The `this` Keyword in JavaScript
// ============================================================
// In Java, `this` always refers to the current object instance. Simple.
// In JS, `this` depends on HOW the function is called, not where it's defined.
// This is one of the biggest gotchas for Java developers.

// --- 1. Global Context ---
// In Node.js, `this` at the top level is the module's `exports` object.
// In a browser, `this` at the top level is the `window` object.
console.log("Global this:", this); // {} in Node.js, window in browser

// --- 2. `this` in Regular Functions ---
function showThis() {
    // In non-strict mode: `this` is the global object (window / globalThis)
    // In strict mode: `this` is undefined
    console.log("Function this:", this);
}
showThis(); // globalThis (Node.js) or window (browser)

// --- 3. `this` in Object Methods (like Java!) ---
// When a function is called as an object method, `this` = that object.
const user = {
    name: "Ammar",
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};
user.greet(); // "Hello, I'm Ammar" ✓

// BUT: if you extract the method, `this` is lost!
const greetFn = user.greet;
greetFn(); // "Hello, I'm undefined" — `this` is no longer the object!
// In Java, this NEVER happens because methods are always tied to their class.

// --- 4. `this` in Arrow Functions ---
// Arrow functions do NOT have their own `this`.
// They inherit `this` from the enclosing scope (lexical binding).
const team = {
    name: "UI5 Team",
    members: ["Ammar", "Ali", "Sara"],

    // Regular function: `this` = team object
    listMembers() {
        console.log("\n--- Arrow vs Regular in callbacks ---");

        // WRONG: regular function in callback — `this` is lost
        // this.members.forEach(function(member) {
        //     console.log(`${member} is in ${this.name}`); // this.name is undefined!
        // });

        // RIGHT: arrow function preserves `this` from listMembers()
        this.members.forEach((member) => {
            console.log(`${member} is in ${this.name}`); // ✓ "UI5 Team"
        });
    }
};
team.listMembers();

// --- 5. `this` with Constructor Functions (like Java constructors) ---
function Person(name, age) {
    this.name = name;  // `this` = the new object being created
    this.age = age;
    this.introduce = function () {
        return `I'm ${this.name}, ${this.age} years old`;
    };
}

const p1 = new Person("Ammar", 25);
const p2 = new Person("Ali", 30);
console.log("\nConstructor:", p1.introduce());
console.log("Constructor:", p2.introduce());

// --- 6. `this` with ES6 Classes (closest to Java) ---
class Employee {
    constructor(name, department) {
        this.name = name;
        this.department = department;
    }

    getInfo() {
        return `${this.name} works in ${this.department}`;
    }
}

const emp = new Employee("Ammar", "SAP Development");
console.log("\nClass:", emp.getInfo());

// Same problem: extracting method loses `this`
const getInfo = emp.getInfo;
// console.log(getInfo()); // TypeError: Cannot read properties of undefined

// --- 7. Fixing `this` — Three approaches ---

// a) bind() — creates a new function with `this` permanently set
const boundGetInfo = emp.getInfo.bind(emp);
console.log("\nbind():", boundGetInfo()); // ✓ works!

// b) call() — invoke function with specific `this` (one-time)
console.log("call():", emp.getInfo.call(emp)); // ✓

// c) apply() — like call() but args as array
console.log("apply():", emp.getInfo.apply(emp)); // ✓

// call vs apply difference:
function introduce(greeting, punctuation) {
    return `${greeting}, I'm ${this.name}${punctuation}`;
}
console.log("call:", introduce.call(emp, "Hello", "!"));    // args listed
console.log("apply:", introduce.apply(emp, ["Hi", "."]));    // args as array

// --- 8. `this` in Event Handlers (Critical for UI5!) ---
// Simulating UI5 event handling:
const controller = {
    viewName: "MainView",
    data: [],

    onInit() {
        console.log("\n--- Event Handler this ---");
        console.log("onInit this.viewName:", this.viewName); // ✓

        // Simulating attaching an event handler
        const button = {
            text: "Submit",
            attachPress(handler) {
                // In real UI5, the handler's `this` might change
                handler(); // `this` is lost here!
            },
            attachPressBound(handler, context) {
                handler.call(context); // UI5 passes `this` correctly
            }
        };

        // WRONG: `this` is lost
        // button.attachPress(this.onButtonPress);

        // FIX 1: bind
        button.attachPress(this.onButtonPress.bind(this));

        // FIX 2: arrow function wrapper
        button.attachPress(() => this.onButtonPress());

        // FIX 3: UI5 style — pass context as parameter
        button.attachPressBound(this.onButtonPress, this);
    },

    onButtonPress() {
        console.log("Button pressed in:", this.viewName);
    }
};
controller.onInit();

// --- 9. Summary: `this` Rules ---
console.log("\n--- this Rules Summary ---");
console.log("1. Global scope       → globalThis / window");
console.log("2. Object method      → the object");
console.log("3. Constructor / new  → the new instance");
console.log("4. Arrow function     → inherited from outer scope");
console.log("5. call/apply/bind    → explicitly set");
console.log("6. Event handler      → depends on how it's attached!");

// --- UI5 Connection ---
// `this` issues are the #1 source of bugs for Java devs in UI5.
// In UI5 controllers:
//   - `this` in onInit, onPress, etc. refers to the controller
//   - Inside callbacks (setTimeout, Promise.then), `this` may be lost
//   - Fix: use arrow functions, .bind(this), or store `var that = this`
//
// UI5 pattern:
//   onInit: function() {
//       var that = this;  // classic UI5 pattern
//       this.getView().getModel().read("/Users", {
//           success: function(oData) {
//               that.getView().getModel("local").setData(oData);
//               // or use arrow: (oData) => { this.getView()... }
//           }
//       });
//   }

// ============================================================
// Run: node advanced-js/this-keyword.js
// ============================================================
