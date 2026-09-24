// ============================================================
// prototypes.js — Prototypes & Inheritance in JavaScript
// ============================================================
// In Java, inheritance uses `extends` with classes (compile-time).
// In JS, inheritance is prototype-based (runtime chain of objects).
// UI5 uses its own extend() system built on top of prototypes.

// --- 1. What is a Prototype? ---
// Every JS object has a hidden link to another object called its "prototype".
// When you access a property, JS looks up the prototype chain.

const animal = {
    type: "Animal",
    describe() {
        return `I am a ${this.type}`;
    }
};

// Object.create() — create object with a specific prototype
const dog = Object.create(animal);
dog.type = "Dog";
dog.bark = function () { return "Woof!"; };

console.log(dog.describe()); // "I am a Dog" — found via prototype chain
console.log(dog.bark());     // "Woof!" — own method
console.log(dog.type);       // "Dog" — own property (shadows animal.type)

// --- 2. Prototype Chain Visualization ---
console.log("\n--- Prototype Chain ---");
console.log("dog's prototype:", Object.getPrototypeOf(dog) === animal); // true
console.log("animal's prototype:", Object.getPrototypeOf(animal) === Object.prototype); // true
console.log("End of chain:", Object.getPrototypeOf(Object.prototype)); // null

// --- 3. Constructor Functions + Prototype (pre-ES6 pattern) ---
// This is how UI5's class system works under the hood.
function Vehicle(make, model) {
    this.make = make;
    this.model = model;
}

// Methods on the prototype are shared by all instances (memory efficient)
Vehicle.prototype.getInfo = function () {
    return `${this.make} ${this.model}`;
};

Vehicle.prototype.start = function () {
    return `${this.getInfo()} is starting...`;
};

const car1 = new Vehicle("Toyota", "Camry");
const car2 = new Vehicle("Honda", "Civic");
console.log("\nConstructor:", car1.getInfo());
console.log("Constructor:", car2.start());

// Both share the same method (unlike Java where each object has its own vtable pointer):
console.log("Shared method:", car1.getInfo === car2.getInfo); // true

// --- 4. Prototypal Inheritance (Constructor pattern) ---
function ElectricVehicle(make, model, range) {
    Vehicle.call(this, make, model); // super() equivalent
    this.range = range;
}

// Set up inheritance chain:
ElectricVehicle.prototype = Object.create(Vehicle.prototype);
ElectricVehicle.prototype.constructor = ElectricVehicle;

// Add/override methods:
ElectricVehicle.prototype.getInfo = function () {
    return `${this.make} ${this.model} (EV, ${this.range}km range)`;
};

const tesla = new ElectricVehicle("Tesla", "Model 3", 500);
console.log("\nInheritance:", tesla.getInfo());  // overridden method
console.log("Inherited:", tesla.start());         // from Vehicle.prototype

console.log("instanceof Vehicle:", tesla instanceof Vehicle);             // true
console.log("instanceof ElectricVehicle:", tesla instanceof ElectricVehicle); // true

// --- 5. ES6 Classes (Syntactic Sugar over Prototypes) ---
// This is what Java developers feel comfortable with!
// Under the hood, it's still prototype-based.

class Shape {
    constructor(color) {
        this.color = color;
    }

    // Method (goes on Shape.prototype)
    describe() {
        return `A ${this.color} shape`;
    }

    // Static method (like Java's static methods)
    static createDefault() {
        return new Shape("gray");
    }
}

class Circle extends Shape {
    constructor(color, radius) {
        super(color); // must call super() first (like Java)
        this.radius = radius;
    }

    // Override parent method
    describe() {
        return `A ${this.color} circle with radius ${this.radius}`;
    }

    // Own method
    getArea() {
        return Math.PI * this.radius ** 2;
    }
}

const circle = new Circle("red", 5);
console.log("\nES6 Class:", circle.describe());
console.log("Area:", circle.getArea().toFixed(2));
console.log("Static:", Shape.createDefault().describe());
console.log("instanceof:", circle instanceof Shape); // true

// Proof it's still prototypes:
console.log("Prototype check:", Object.getPrototypeOf(circle) === Circle.prototype); // true

// --- 6. UI5's extend() Pattern ---
// UI5 doesn't use ES6 classes. It has its own system based on prototypes.
// Here's a simplified simulation of how UI5's extend() works:

const UI5Object = {
    extend(className, methods) {
        function Constructor() {
            if (methods.constructor) {
                methods.constructor.apply(this, arguments);
            }
        }
        Constructor.prototype = Object.create(this.prototype || {});
        Object.assign(Constructor.prototype, methods);
        Constructor.prototype._className = className;
        Constructor.extend = UI5Object.extend; // allow further extension
        return Constructor;
    },
    prototype: {}
};

// Simulating: sap.ui.core.ManagedObject.extend(...)
const BaseController = UI5Object.extend("BaseController", {
    constructor() {
        this.views = {};
    },
    getView() {
        return { name: "BaseView" };
    }
});

const MainController = BaseController.extend("MainController", {
    onInit() {
        console.log(`\nUI5 extend: ${this._className} initialized`);
        console.log("getView:", this.getView().name);
    },
    onButtonPress() {
        console.log("Button pressed!");
    }
});

const ctrl = new MainController();
ctrl.onInit();
ctrl.onButtonPress();

// --- 7. hasOwnProperty vs in ---
console.log("\n--- Own vs Inherited ---");
const obj = { name: "Ammar" };
console.log("hasOwnProperty 'name':", obj.hasOwnProperty("name"));         // true
console.log("hasOwnProperty 'toString':", obj.hasOwnProperty("toString")); // false
console.log("'toString' in obj:", "toString" in obj);                       // true (inherited)

// --- 8. Property Descriptors (Advanced) ---
// Like Java's reflection, but for object properties.
const config = {};
Object.defineProperty(config, "apiUrl", {
    value: "https://api.example.com",
    writable: false,     // cannot be changed
    enumerable: true,    // shows up in for...in / Object.keys()
    configurable: false  // cannot be deleted or reconfigured
});
console.log("\nProperty descriptor:", config.apiUrl);
config.apiUrl = "changed"; // silently fails
console.log("Still:", config.apiUrl); // unchanged

// --- UI5 Connection ---
// Understanding prototypes is essential for UI5 because:
//   - UI5 uses Controller.extend(), Component.extend(), etc.
//   - The extend() method creates prototype chains
//   - Lifecycle methods (onInit, onExit) are on the prototype
//   - When you override a method, you're replacing it on the prototype
//   - The `metadata` object in UI5 controls uses prototype inheritance
//
// Real UI5 example:
//   sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
//       return Controller.extend("my.app.controller.Main", {
//           onInit: function() { ... },      // added to prototype
//           onPress: function(oEvent) { ... } // added to prototype
//       });
//   });

// ============================================================
// Run: node advanced-js/prototypes.js
// ============================================================
