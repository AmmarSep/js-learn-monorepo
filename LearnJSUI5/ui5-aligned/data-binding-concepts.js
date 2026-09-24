// ============================================================
// data-binding-concepts.js — Data Binding (UI5-Style)
// ============================================================
// In Java, you manually update UI components when data changes.
// In UI5, data binding automatically syncs Model ↔ View.
// This file demonstrates the concept using plain JavaScript.

// ============================================================
// PART 1: Understanding Data Binding
// ============================================================

// Data binding connects a data source (Model) to UI elements (View).
// Types of binding in UI5:
//   1. One-Way:   Model → View  (view reflects model, not vice versa)
//   2. Two-Way:   Model ↔ View  (changes in either sync to the other)
//   3. One-Time:  Model → View  (read once, no updates)

// ============================================================
// PART 2: Building a Simple Binding System
// ============================================================

// --- Observable Model (data source) ---
class BindableModel {
    constructor(data = {}) {
        this._data = data;
        this._bindings = []; // list of { path, callback }
    }

    getProperty(path) {
        return path.split("/").filter(Boolean).reduce((obj, key) => {
            return obj !== undefined && obj !== null ? obj[key] : undefined;
        }, this._data);
    }

    setProperty(path, value) {
        const keys = path.split("/").filter(Boolean);
        let current = this._data;
        for (let i = 0; i < keys.length - 1; i++) {
            if (current[keys[i]] === undefined) current[keys[i]] = {};
            current = current[keys[i]];
        }
        const oldValue = current[keys[keys.length - 1]];
        current[keys[keys.length - 1]] = value;

        // Notify all bindings for this path
        if (oldValue !== value) {
            this._notifyBindings(path, value);
        }
    }

    getData() { return this._data; }

    setData(data) {
        this._data = data;
        this._notifyBindings("/", data);
    }

    // Register a binding
    bindProperty(path, callback) {
        this._bindings.push({ path, callback });
        // Initial sync — call immediately with current value
        callback(this.getProperty(path));
    }

    _notifyBindings(changedPath, value) {
        this._bindings.forEach(binding => {
            // Simple check: notify if paths match or parent changed
            if (changedPath === "/" || binding.path === changedPath ||
                binding.path.startsWith(changedPath + "/")) {
                binding.callback(this.getProperty(binding.path));
            }
        });
    }
}

// --- UI Element (simulates a UI5 control with binding) ---
class BoundElement {
    constructor(id, type = "text") {
        this.id = id;
        this.type = type;
        this.value = "";
    }

    render() {
        const display = this.type === "currency" ? `$${Number(this.value).toFixed(2)}` : this.value;
        console.log(`  [${this.id}] = "${display}"`);
    }
}

// ============================================================
// PART 3: One-Way Binding Demo
// ============================================================

console.log("╔══════════════════════════════════════╗");
console.log("║   Data Binding Concepts (UI5-Style)  ║");
console.log("╚══════════════════════════════════════╝");

console.log("\n--- One-Way Binding (Model → View) ---");
// Changes to the model automatically update the view.
// The view does NOT update the model.

const model = new BindableModel({
    employee: {
        name: "Ammar",
        department: "SAP Development",
        salary: 75000
    }
});

// Create UI elements
const nameDisplay = new BoundElement("nameLabel");
const deptDisplay = new BoundElement("deptLabel");
const salaryDisplay = new BoundElement("salaryLabel", "currency");

// Bind elements to model paths (like UI5 XML: text="{/employee/name}")
model.bindProperty("/employee/name", (value) => {
    nameDisplay.value = value;
    nameDisplay.render();
});

model.bindProperty("/employee/department", (value) => {
    deptDisplay.value = value;
    deptDisplay.render();
});

model.bindProperty("/employee/salary", (value) => {
    salaryDisplay.value = value;
    salaryDisplay.render();
});

// Now change the model — view updates automatically!
console.log("\n>>> Updating model: name = 'Ali'");
model.setProperty("/employee/name", "Ali");

console.log("\n>>> Updating model: salary = 85000");
model.setProperty("/employee/salary", 85000);

// ============================================================
// PART 4: Two-Way Binding Demo
// ============================================================

console.log("\n\n--- Two-Way Binding (Model ↔ View) ---");

class TwoWayBoundInput {
    constructor(id, model, path) {
        this.id = id;
        this.model = model;
        this.path = path;
        this.value = "";

        // Model → View: Listen for model changes
        model.bindProperty(path, (value) => {
            this.value = value;
            console.log(`  [${this.id}] updated from model: "${value}"`);
        });
    }

    // View → Model: Simulate user typing
    simulateUserInput(newValue) {
        console.log(`  [${this.id}] user typed: "${newValue}"`);
        this.value = newValue;
        // Push change back to model
        this.model.setProperty(this.path, newValue);
    }
}

const formModel = new BindableModel({
    form: {
        firstName: "Ammar",
        lastName: "S",
        email: "ammar@example.com"
    }
});

const firstNameInput = new TwoWayBoundInput("firstNameInput", formModel, "/form/firstName");
const lastNameInput = new TwoWayBoundInput("lastNameInput", formModel, "/form/lastName");

// Simulate user interaction
console.log("\n>>> User types new first name...");
firstNameInput.simulateUserInput("Ali");
console.log("Model state:", formModel.getProperty("/form/firstName")); // "Ali" — model updated!

// ============================================================
// PART 5: Aggregation Binding (Lists/Tables)
// ============================================================

console.log("\n\n--- Aggregation Binding (List Binding) ---");
// In UI5: <List items="{/products}"> binds an array to list items.

class BoundList {
    constructor(id, model, path, template) {
        this.id = id;
        this.model = model;
        this.path = path;
        this.template = template; // function that renders each item

        // Bind to the array
        model.bindProperty(path, (items) => {
            this.render(items);
        });
    }

    render(items) {
        console.log(`  [${this.id}] Rendering ${items ? items.length : 0} items:`);
        if (items && items.length > 0) {
            items.forEach((item, i) => {
                console.log(`    ${i + 1}. ${this.template(item)}`);
            });
        } else {
            console.log("    (empty list)");
        }
    }
}

const listModel = new BindableModel({
    products: [
        { name: "Laptop", price: 1200, status: "Available" },
        { name: "Mouse", price: 25, status: "Available" },
        { name: "Monitor", price: 400, status: "Out of Stock" }
    ]
});

// Bind list — template is like UI5's StandardListItem
const productList = new BoundList(
    "productList",
    listModel,
    "/products",
    (item) => `${item.name} — $${item.price} [${item.status}]`
);

// Add a new product — list re-renders automatically
console.log("\n>>> Adding new product to model...");
const products = listModel.getProperty("/products");
products.push({ name: "Keyboard", price: 75, status: "Available" });
listModel.setProperty("/products", products);

// ============================================================
// PART 6: Property Binding with Formatters
// ============================================================

console.log("\n\n--- Formatters ---");
// In UI5: text="{path: '/status', formatter: '.formatStatus'}"

function formatStatus(status) {
    const icons = { Available: "✅", "Out of Stock": "❌", Discontinued: "⚠️" };
    return `${icons[status] || "❓"} ${status}`;
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

// Bind with formatter:
const statusModel = new BindableModel({ status: "Available", price: 1299.99 });

statusModel.bindProperty("/status", (value) => {
    console.log(`  Status: ${formatStatus(value)}`);
});

statusModel.bindProperty("/price", (value) => {
    console.log(`  Price: ${formatCurrency(value)}`);
});

console.log("\n>>> Changing status...");
statusModel.setProperty("/status", "Out of Stock");

// ============================================================
// PART 7: Expression Binding (Computed Properties)
// ============================================================

console.log("\n\n--- Expression Binding ---");
// In UI5: visible="{= ${/count} > 0}" — expressions in bindings

const dashModel = new BindableModel({
    orders: { count: 5, total: 2500 },
    user: { isAdmin: true }
});

// Simulating expression binding:
function expressionBinding(model, expression) {
    // In real UI5, the framework parses expressions like {= ${/count} > 0}
    return expression(model);
}

const showBadge = expressionBinding(dashModel, (m) => m.getProperty("/orders/count") > 0);
const showAdmin = expressionBinding(dashModel, (m) => m.getProperty("/user/isAdmin"));
const summary = expressionBinding(dashModel, (m) => {
    const count = m.getProperty("/orders/count");
    const total = m.getProperty("/orders/total");
    return `${count} orders totaling ${formatCurrency(total)}`;
});

console.log(`  Show badge: ${showBadge}`);     // true
console.log(`  Show admin panel: ${showAdmin}`); // true
console.log(`  Summary: ${summary}`);

// --- UI5 Binding Syntax Reference ---
// Property binding:    text="{/employee/name}"
// Two-way binding:     value="{/form/firstName}"  (default for Input)
// Aggregation binding: items="{/products}"
// Expression binding:  visible="{= ${/count} > 0}"
// Formatter:           text="{path: '/price', formatter: '.formatCurrency'}"
// Composite binding:   text="{/firstName} {/lastName}"

// --- Java Comparison ---
// Java Swing: textField.setText(model.getName());     // manual
//             model.addListener(e -> textField.setText(model.getName())); // manual listener
// UI5:        <Text text="{/name}" />                  // automatic!

// ============================================================
// Run: node ui5-aligned/data-binding-concepts.js
// ============================================================
