// ============================================================
// event-handling.js — Event Handling in JavaScript (UI5-Style)
// ============================================================
// In Java, events use listeners/interfaces (ActionListener, OnClickListener).
// In JS/UI5, events use callback functions attached to objects.
// UI5 has its own event system, but it's built on standard JS patterns.

// ============================================================
// PART 1: JavaScript Event Fundamentals
// ============================================================

// --- 1. The Observer/Pub-Sub Pattern ---
// This is the foundation of all event systems (Java's EventEmitter, UI5's events).

class EventEmitter {
    constructor() {
        this._events = {};
    }

    // Register a handler (like Java's addActionListener)
    on(eventName, handler) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }
        this._events[eventName].push(handler);
        return this; // allow chaining
    }

    // Remove a handler
    off(eventName, handler) {
        if (!this._events[eventName]) return;
        this._events[eventName] = this._events[eventName].filter(h => h !== handler);
        return this;
    }

    // Register a one-time handler (fires once, then auto-removes)
    once(eventName, handler) {
        const wrapper = (...args) => {
            handler(...args);
            this.off(eventName, wrapper);
        };
        this.on(eventName, wrapper);
        return this;
    }

    // Fire an event (like Java's fireActionPerformed)
    emit(eventName, ...args) {
        if (!this._events[eventName]) return;
        this._events[eventName].forEach(handler => handler(...args));
    }
}

// Demo:
console.log("--- EventEmitter Demo ---");
const emitter = new EventEmitter();

emitter.on("message", (text) => console.log("  Handler 1:", text));
emitter.on("message", (text) => console.log("  Handler 2:", text.toUpperCase()));
emitter.once("message", (text) => console.log("  One-time:", text));

emitter.emit("message", "Hello!");
console.log("(after second emit, one-time handler is gone)");
emitter.emit("message", "World!");

// ============================================================
// PART 2: UI5-Style Event Handling
// ============================================================

// --- 2. Simulating UI5 Controls with Events ---
// In UI5, controls fire events that controllers handle.
// Example: sap.m.Button fires "press" event.

class UI5Control extends EventEmitter {
    constructor(id, settings = {}) {
        super();
        this._id = id;
        this._properties = {};

        // Apply settings (like UI5 constructor settings)
        Object.entries(settings).forEach(([key, value]) => {
            if (typeof value === "function") {
                // If it's a function, treat as event handler
                this.on(key, value);
            } else {
                this._properties[key] = value;
            }
        });
    }

    getId() { return this._id; }

    getProperty(name) { return this._properties[name]; }

    setProperty(name, value) {
        this._properties[name] = value;
        this.emit("propertyChange", { propertyName: name, newValue: value });
        return this;
    }

    // UI5-style event methods
    attachEvent(eventName, handler, context) {
        if (context) {
            this.on(eventName, handler.bind(context));
        } else {
            this.on(eventName, handler);
        }
        return this;
    }

    fireEvent(eventName, parameters = {}) {
        // UI5 wraps event data in an oEvent-like object
        const oEvent = {
            getSource: () => this,
            getId: () => eventName,
            getParameter: (name) => parameters[name],
            getParameters: () => parameters
        };
        this.emit(eventName, oEvent);
    }
}

// --- 3. UI5-Style Button ---
class Button extends UI5Control {
    constructor(id, settings = {}) {
        super(id, settings);
    }

    getText() { return this.getProperty("text") || ""; }
    setText(text) { return this.setProperty("text", text); }

    // Simulate user clicking the button
    simulatePress() {
        console.log(`  [Button "${this.getText()}"] pressed`);
        this.fireEvent("press", {});
    }
}

// --- 4. UI5-Style Input Field ---
class Input extends UI5Control {
    constructor(id, settings = {}) {
        super(id, settings);
    }

    getValue() { return this.getProperty("value") || ""; }

    setValue(value) {
        const oldValue = this.getValue();
        this.setProperty("value", value);
        if (oldValue !== value) {
            this.fireEvent("change", { value, oldValue });
            this.fireEvent("liveChange", { value, oldValue });
        }
        return this;
    }
}

// --- 5. UI5-Style List with Selection ---
class List extends UI5Control {
    constructor(id, settings = {}) {
        super(id, settings);
        this._items = [];
    }

    addItem(item) {
        this._items.push(item);
        return this;
    }

    getItems() { return this._items; }

    simulateSelect(index) {
        const item = this._items[index];
        if (item) {
            console.log(`  [List] Selected item at index ${index}`);
            this.fireEvent("selectionChange", {
                listItem: item,
                selectedIndex: index
            });
        }
    }
}

// ============================================================
// PART 3: Controller Handling Events (UI5 Pattern)
// ============================================================

console.log("\n╔══════════════════════════════════════╗");
console.log("║   Event Handling Demo (UI5-Style)    ║");
console.log("╚══════════════════════════════════════╝");

// Simulating a UI5 Controller
const oController = {
    viewName: "ProductView",

    onInit() {
        console.log("\n--- Setting up controls and events ---");

        // Create controls (in real UI5, these are in XML view)
        this.btnAdd = new Button("btnAdd", { text: "Add Product" });
        this.btnDelete = new Button("btnDelete", { text: "Delete" });
        this.inputSearch = new Input("inputSearch", { value: "" });
        this.productList = new List("productList");

        // Add items to list
        ["Laptop", "Mouse", "Keyboard"].forEach(name => {
            this.productList.addItem({ name, id: name.toLowerCase() });
        });

        // Attach event handlers (3 different UI5 styles)

        // Style 1: attachPress with context (traditional UI5)
        this.btnAdd.attachEvent("press", this.onAddPress, this);

        // Style 2: arrow function (modern, `this` is preserved)
        this.btnDelete.attachEvent("press", (oEvent) => {
            this.onDeletePress(oEvent);
        });

        // Style 3: Handler in constructor settings
        this.inputSearch.attachEvent("liveChange", function (oEvent) {
            // Note: using regular function here, so we pass context
            this.onSearchChange(oEvent);
        }.bind(this)); // .bind(this) is needed!

        // List selection
        this.productList.attachEvent("selectionChange", this.onItemSelect, this);

        console.log("All event handlers attached ✓");
    },

    // --- Event Handler Methods ---
    // In Java: void actionPerformed(ActionEvent e)
    // In UI5:  onXxxPress: function(oEvent) { }

    onAddPress(oEvent) {
        const button = oEvent.getSource();
        console.log(`\n[Handler] onAddPress — button: "${button.getText()}"`);
        console.log("  → Would open 'Add Product' dialog");
    },

    onDeletePress(oEvent) {
        console.log("\n[Handler] onDeletePress triggered");
        console.log("  → Would delete selected item");
    },

    onSearchChange(oEvent) {
        const value = oEvent.getParameter("value");
        console.log(`\n[Handler] onSearchChange — query: "${value}"`);
        console.log("  → Would filter the product list");
    },

    onItemSelect(oEvent) {
        const item = oEvent.getParameter("listItem");
        const index = oEvent.getParameter("selectedIndex");
        console.log(`\n[Handler] onItemSelect — item: "${item.name}" (index: ${index})`);
        console.log("  → Would navigate to product detail");
    }
};

// Initialize and simulate user interactions
oController.onInit();

console.log("\n--- Simulating User Interactions ---");
oController.btnAdd.simulatePress();
oController.inputSearch.setValue("Lap");
oController.productList.simulateSelect(0);
oController.btnDelete.simulatePress();

// ============================================================
// PART 4: Event Delegation Pattern
// ============================================================

console.log("\n--- Event Delegation ---");
// In UI5, list item events bubble up to the list control.
// This is more efficient than attaching handlers to every item.
// Similar to Java's adapter pattern.

const parentList = new List("delegatedList");
["Item A", "Item B", "Item C"].forEach(name => parentList.addItem({ name }));

// One handler for all items (delegation):
parentList.attachEvent("selectionChange", (oEvent) => {
    const item = oEvent.getParameter("listItem");
    console.log(`  Delegated handler caught: "${item.name}"`);
});

parentList.simulateSelect(0);
parentList.simulateSelect(2);

// --- Java vs UI5 Event Comparison ---
// Java Swing:                          UI5:
// button.addActionListener(e -> {})    oButton.attachPress(function(oEvent) {})
// e.getSource()                        oEvent.getSource()
// e.getActionCommand()                 oEvent.getParameter("id")
// implements ActionListener            controller method: onPress(oEvent)

// --- Key Takeaways ---
// 1. UI5 uses attachXxx / detachXxx for event registration
// 2. Event handlers receive an oEvent object (not raw DOM event)
// 3. Always mind `this` context — use .bind(this) or arrow functions
// 4. In XML views: press=".onPress" automatically binds to controller
// 5. Event delegation is preferred for lists/tables (performance)

// ============================================================
// Run: node ui5-aligned/event-handling.js
// ============================================================
