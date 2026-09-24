// ============================================================
// mvc-pattern.js — MVC Pattern in JavaScript (UI5-Style)
// ============================================================
// Java devs know MVC from Spring MVC, Struts, or JSF.
// UI5 uses MVC heavily: XML Views, JS Controllers, JSON/OData Models.
// This file simulates the UI5 MVC pattern in plain JavaScript.

// ============================================================
// MODEL — Holds the data (like Java's POJO/DTO + Service layer)
// ============================================================

class JSONModel {
    constructor(data = {}) {
        this._data = JSON.parse(JSON.stringify(data)); // deep copy
        this._listeners = [];
    }

    // Get data at a path (like UI5's oModel.getProperty("/path"))
    getProperty(path) {
        const parts = path.replace(/^\//, "").split("/");
        let current = this._data;
        for (const part of parts) {
            if (current === undefined || current === null) return undefined;
            current = current[part];
        }
        return current;
    }

    // Set data at a path (like UI5's oModel.setProperty("/path", value))
    setProperty(path, value) {
        const parts = path.replace(/^\//, "").split("/");
        let current = this._data;
        for (let i = 0; i < parts.length - 1; i++) {
            if (current[parts[i]] === undefined) current[parts[i]] = {};
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
        this._notifyListeners(path);
    }

    // Get all data
    getData() {
        return this._data;
    }

    // Set all data
    setData(data) {
        this._data = data;
        this._notifyListeners("/");
    }

    // Observer pattern — listeners are notified on data change
    attachChange(callback) {
        this._listeners.push(callback);
    }

    _notifyListeners(path) {
        this._listeners.forEach(cb => cb({ path }));
    }
}

// ============================================================
// VIEW — Renders UI (in real UI5, this is XML; here we simulate)
// ============================================================

class View {
    constructor(viewName, controller) {
        this.viewName = viewName;
        this.controller = controller;
        this.models = {};
        this.elements = [];

        // Give controller a reference to this view (like UI5)
        controller.setView(this);
    }

    setModel(model, name = "") {
        this.models[name] = model;
        // Listen for model changes to re-render
        model.attachChange(() => this.render());
    }

    getModel(name = "") {
        return this.models[name];
    }

    // Simulate rendering (in UI5, the framework does this automatically)
    render() {
        console.log(`\n[View: ${this.viewName}] Rendering...`);
        const model = this.getModel();
        if (!model) return;

        const data = model.getData();
        console.log("──────────────────────────────────");

        // Simulate a header
        if (data.title) {
            console.log(`📋 ${data.title}`);
            console.log("──────────────────────────────────");
        }

        // Simulate a table/list of items
        if (data.products && data.products.length > 0) {
            data.products.forEach((product, i) => {
                const status = product.inStock ? "✅" : "❌";
                console.log(`  ${i + 1}. ${product.name} - $${product.price} ${status}`);
            });
        } else {
            console.log("  (No products to display)");
        }

        console.log("──────────────────────────────────");
        if (data.message) {
            console.log(`💬 ${data.message}`);
        }
    }

    // Simulate firing events (like button press in XML view)
    fireEvent(eventName, eventData = {}) {
        const handlerName = `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
        if (typeof this.controller[handlerName] === "function") {
            // In UI5, events carry an oEvent object with getSource(), getParameter(), etc.
            const oEvent = {
                getSource: () => ({ getText: () => "Button" }),
                getParameter: (name) => eventData[name],
                ...eventData
            };
            this.controller[handlerName](oEvent);
        } else {
            console.log(`No handler '${handlerName}' found in controller`);
        }
    }
}

// ============================================================
// CONTROLLER — Handles logic (like a Java @Controller / @RestController)
// ============================================================

class Controller {
    constructor() {
        this._view = null;
    }

    setView(view) {
        this._view = view;
    }

    getView() {
        return this._view;
    }
}

// --- Simulating UI5's Controller.extend() ---
// In real UI5: Controller.extend("myapp.controller.ProductList", { ... })
function extendController(name, methods) {
    class ExtendedController extends Controller {
        constructor() {
            super();
            this._controllerName = name;
        }
    }
    // Add all methods to the prototype (like UI5's extend)
    Object.keys(methods).forEach(key => {
        ExtendedController.prototype[key] = methods[key];
    });
    return ExtendedController;
}

// ============================================================
// PUTTING IT ALL TOGETHER — A UI5-like Application
// ============================================================

console.log("╔══════════════════════════════════════╗");
console.log("║   MVC Pattern Demo (UI5-Style)       ║");
console.log("╚══════════════════════════════════════╝");

// 1. Define the Controller (like a UI5 controller file)
const ProductController = extendController("myapp.controller.ProductList", {

    // Lifecycle method — called when view is initialized
    onInit() {
        console.log(`[Controller: ${this._controllerName}] onInit called`);

        // Create and set the model (like UI5's JSONModel)
        const oModel = new JSONModel({
            title: "Product Catalog",
            message: "Welcome! Click 'Add' to add a product.",
            products: [
                { name: "Laptop", price: 1200, inStock: true },
                { name: "Mouse", price: 25, inStock: true },
                { name: "Keyboard", price: 75, inStock: false }
            ]
        });

        this.getView().setModel(oModel);
    },

    // Event handler — simulates button press
    onAddProduct(oEvent) {
        console.log("\n[Controller] onAddProduct triggered");
        const oModel = this.getView().getModel();
        const products = oModel.getProperty("/products");
        products.push({
            name: "Monitor",
            price: 400,
            inStock: true
        });
        oModel.setProperty("/products", products);
        oModel.setProperty("/message", "Product added successfully!");
    },

    // Event handler — simulates delete
    onDeleteProduct(oEvent) {
        const index = oEvent.getParameter("index");
        console.log(`\n[Controller] onDeleteProduct at index ${index}`);
        const oModel = this.getView().getModel();
        const products = oModel.getProperty("/products");
        const removed = products.splice(index, 1);
        oModel.setProperty("/products", products);
        oModel.setProperty("/message", `Removed: ${removed[0].name}`);
    },

    // Lifecycle method — called when view is destroyed
    onExit() {
        console.log(`[Controller: ${this._controllerName}] onExit called`);
    }
});

// 2. Create controller instance
const oController = new ProductController();

// 3. Create the View (in UI5, this would be an XML file)
const oView = new View("ProductListView", oController);

// 4. Initialize (UI5 framework calls onInit automatically)
oController.onInit();

// 5. Simulate user interactions
console.log("\n>>> User clicks 'Add Product' button...");
oView.fireEvent("addProduct");

console.log("\n>>> User clicks 'Delete' on item 1...");
oView.fireEvent("deleteProduct", { index: 1 });

// 6. Cleanup
oController.onExit();

// --- MVC Flow Summary ---
// ┌──────────┐    user action    ┌────────────┐    update data    ┌───────┐
// │   VIEW   │ ───────────────→ │ CONTROLLER │ ───────────────→ │ MODEL │
// │ (XML/UI) │                  │ (JS logic) │                  │(JSON) │
// └──────────┘ ←─────────────── └────────────┘ ←─────────────── └───────┘
//              auto re-render                    notify change

// --- Java MVC Comparison ---
// Java Spring MVC:              UI5 MVC:
// @Controller class             Controller.extend("...", { })
// @GetMapping("/products")      onInit: function() { }
// Model model                   this.getView().getModel()
// model.addAttribute(...)       oModel.setProperty("/...", ...)
// return "products.html"        XML View auto-updates via binding

// ============================================================
// Run: node ui5-aligned/mvc-pattern.js
// ============================================================
