// ============================================================
// simple-ui5-like-app.js — Mini UI5-Like Application
// ============================================================
// This file brings together ALL concepts from the learning folder
// to simulate a complete UI5 application using plain JavaScript.
//
// What's covered:
//   ✅ Modules (sap.ui.define pattern)
//   ✅ MVC architecture
//   ✅ Data binding (model → view auto-sync)
//   ✅ Event handling
//   ✅ Async API calls
//   ✅ Prototypal inheritance (extend pattern)
//   ✅ Closures for private state
//   ✅ Promises and async/await
//   ✅ `this` context management

// ============================================================
// MODULE SYSTEM (simulating sap.ui.define)
// ============================================================

const ModuleRegistry = (() => {
    const modules = {};

    return {
        define(name, deps, factory) {
            const resolved = deps.map(d => modules[d]);
            modules[name] = factory(...resolved);
        },
        require(name) {
            return modules[name];
        }
    };
})();

// ============================================================
// BASE CLASSES (simulating UI5 framework)
// ============================================================

// --- EventProvider (base for all UI5 objects with events) ---
ModuleRegistry.define("sap/ui/base/EventProvider", [], function () {
    class EventProvider {
        constructor() {
            this._events = {};
        }
        attachEvent(name, fn, ctx) {
            if (!this._events[name]) this._events[name] = [];
            this._events[name].push(ctx ? fn.bind(ctx) : fn);
        }
        fireEvent(name, params = {}) {
            const oEvent = {
                getSource: () => this,
                getParameter: (key) => params[key],
                getParameters: () => params
            };
            (this._events[name] || []).forEach(fn => fn(oEvent));
        }
    }
    return EventProvider;
});

// --- JSONModel ---
ModuleRegistry.define("sap/ui/model/json/JSONModel", [], function () {
    class JSONModel {
        constructor(data = {}) {
            this._data = JSON.parse(JSON.stringify(data));
            this._changeHandlers = [];
        }
        getProperty(path) {
            return path.split("/").filter(Boolean).reduce(
                (obj, key) => (obj != null ? obj[key] : undefined), this._data
            );
        }
        setProperty(path, value) {
            const keys = path.split("/").filter(Boolean);
            let current = this._data;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            this._notify();
        }
        getData() { return this._data; }
        setData(data) { this._data = data; this._notify(); }
        attachChange(fn) { this._changeHandlers.push(fn); }
        _notify() { this._changeHandlers.forEach(fn => fn()); }
    }
    return JSONModel;
});

// --- MessageBox ---
ModuleRegistry.define("sap/m/MessageBox", [], function () {
    return {
        information(msg) { console.log(`💬 [MessageBox] ${msg}`); },
        error(msg) { console.error(`❌ [MessageBox] ${msg}`); },
        success(msg) { console.log(`✅ [MessageBox] ${msg}`); },
        confirm(msg, options) {
            console.log(`❓ [MessageBox] ${msg}`);
            if (options && options.onClose) options.onClose("OK");
        }
    };
});

// --- MessageToast ---
ModuleRegistry.define("sap/m/MessageToast", [], function () {
    return {
        show(msg) { console.log(`🍞 [Toast] ${msg}`); }
    };
});

// --- Base Controller ---
ModuleRegistry.define("sap/ui/core/mvc/Controller", [], function () {
    class Controller {
        constructor() {
            this._view = null;
        }
        getView() { return this._view; }
        _setView(view) { this._view = view; }

        // UI5's extend pattern
        static extend(name, methods) {
            const ParentClass = this;
            class Extended extends ParentClass {
                constructor() {
                    super();
                    this._controllerName = name;
                }
            }
            Object.entries(methods).forEach(([key, value]) => {
                Extended.prototype[key] = value;
            });
            return Extended;
        }
    }
    return Controller;
});

// --- Simple View ---
ModuleRegistry.define("sap/ui/core/mvc/View", [], function () {
    class View {
        constructor(name, controller) {
            this._name = name;
            this._models = {};
            this._controller = controller;
            controller._setView(this);
        }
        setModel(model, name = "") {
            this._models[name] = model;
            model.attachChange(() => this._render());
        }
        getModel(name = "") { return this._models[name]; }
        setBusy(busy) { console.log(busy ? "⏳ Loading..." : "✅ Ready"); }
        _render() {
            // Auto-render when model changes
            if (this._renderFn) this._renderFn();
        }
        setRenderFunction(fn) { this._renderFn = fn; }
    }
    return View;
});

// ============================================================
// SIMULATED BACKEND API (OData-like)
// ============================================================

ModuleRegistry.define("app/service/ProductAPI", [], function () {
    // Private data store (closure!)
    let products = [
        { ID: 1, Name: "Laptop", Price: 1200, Category: "Electronics", InStock: true },
        { ID: 2, Name: "Mouse", Price: 25, Category: "Electronics", InStock: true },
        { ID: 3, Name: "Standing Desk", Price: 450, Category: "Furniture", InStock: false },
        { ID: 4, Name: "Monitor", Price: 380, Category: "Electronics", InStock: true },
        { ID: 5, Name: "Keyboard", Price: 75, Category: "Electronics", InStock: true }
    ];
    let nextId = 6;

    // Simulate network delay
    const delay = (ms = 80) => new Promise(resolve => setTimeout(resolve, ms));

    return {
        async getAll() {
            await delay();
            return JSON.parse(JSON.stringify(products));
        },
        async getById(id) {
            await delay();
            const product = products.find(p => p.ID === id);
            if (!product) throw new Error(`Product ${id} not found`);
            return JSON.parse(JSON.stringify(product));
        },
        async create(data) {
            await delay();
            const product = { ID: nextId++, ...data };
            products.push(product);
            return JSON.parse(JSON.stringify(product));
        },
        async update(id, data) {
            await delay();
            const index = products.findIndex(p => p.ID === id);
            if (index === -1) throw new Error(`Product ${id} not found`);
            products[index] = { ...products[index], ...data };
            return JSON.parse(JSON.stringify(products[index]));
        },
        async remove(id) {
            await delay();
            const index = products.findIndex(p => p.ID === id);
            if (index === -1) throw new Error(`Product ${id} not found`);
            products.splice(index, 1);
            return true;
        }
    };
});

// ============================================================
// FORMATTER (utility module)
// ============================================================

ModuleRegistry.define("app/model/formatter", [], function () {
    return {
        formatPrice(price) {
            return new Intl.NumberFormat("en-US", {
                style: "currency", currency: "USD"
            }).format(price);
        },
        formatStock(inStock) {
            return inStock ? "✅ In Stock" : "❌ Out of Stock";
        },
        formatCategory(category) {
            const icons = { Electronics: "💻", Furniture: "🪑", Books: "📚" };
            return `${icons[category] || "📦"} ${category}`;
        }
    };
});

// ============================================================
// CONTROLLER (the main application logic)
// ============================================================

ModuleRegistry.define("app/controller/ProductList", [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "app/service/ProductAPI",
    "app/model/formatter"
], function (Controller, JSONModel, MessageBox, MessageToast, ProductAPI, formatter) {
    "use strict";

    return Controller.extend("app.controller.ProductList", {

        formatter: formatter,

        // ─── Lifecycle: Called when view is created ───
        onInit: async function () {
            console.log(`\n[${this._controllerName}] Initializing...`);

            // Create view model for UI state
            const oViewModel = new JSONModel({
                busy: false,
                productCount: 0,
                selectedProduct: null,
                filterCategory: "All"
            });
            this.getView().setModel(oViewModel, "view");

            // Load data
            await this._loadProducts();
        },

        // ─── Private: Load products from API ───
        _loadProducts: async function () {
            const oView = this.getView();
            oView.setBusy(true);

            try {
                const products = await ProductAPI.getAll();

                const oModel = new JSONModel({ products });
                oView.setModel(oModel);

                // Update count in view model
                oView.getModel("view").setProperty("/productCount", products.length);

                console.log(`  Loaded ${products.length} products`);
                this._renderProductList();
            } catch (error) {
                MessageBox.error(`Failed to load products: ${error.message}`);
            } finally {
                oView.setBusy(false);
            }
        },

        // ─── Event: Add Product button pressed ───
        onAddProduct: async function () {
            console.log("\n[Action] Adding new product...");

            try {
                const newProduct = await ProductAPI.create({
                    Name: "Webcam HD",
                    Price: 89,
                    Category: "Electronics",
                    InStock: true
                });

                MessageToast.show(`Product "${newProduct.Name}" created!`);
                await this._loadProducts(); // refresh list
            } catch (error) {
                MessageBox.error(`Create failed: ${error.message}`);
            }
        },

        // ─── Event: Delete Product ───
        onDeleteProduct: async function (oEvent) {
            const productId = oEvent.getParameter("productId");
            console.log(`\n[Action] Deleting product ${productId}...`);

            MessageBox.confirm(`Delete product ${productId}?`, {
                onClose: async (action) => {
                    if (action === "OK") {
                        try {
                            await ProductAPI.remove(productId);
                            MessageToast.show("Product deleted");
                            await this._loadProducts();
                        } catch (error) {
                            MessageBox.error(`Delete failed: ${error.message}`);
                        }
                    }
                }
            });
        },

        // ─── Event: Update Product Price ───
        onUpdatePrice: async function (oEvent) {
            const productId = oEvent.getParameter("productId");
            const newPrice = oEvent.getParameter("newPrice");
            console.log(`\n[Action] Updating product ${productId} price to $${newPrice}...`);

            try {
                const updated = await ProductAPI.update(productId, { Price: newPrice });
                MessageToast.show(`Price updated: ${formatter.formatPrice(updated.Price)}`);
                await this._loadProducts();
            } catch (error) {
                MessageBox.error(`Update failed: ${error.message}`);
            }
        },

        // ─── Event: Filter by category ───
        onFilterCategory: function (oEvent) {
            const category = oEvent.getParameter("category");
            console.log(`\n[Action] Filtering by: ${category}`);

            this.getView().getModel("view").setProperty("/filterCategory", category);
            this._renderProductList();
        },

        // ─── Event: Select a product ───
        onProductSelect: function (oEvent) {
            const product = oEvent.getParameter("product");
            console.log(`\n[Action] Selected: ${product.Name}`);

            this.getView().getModel("view").setProperty("/selectedProduct", product);
            this._renderProductDetail(product);
        },

        // ─── Private: Render product list ───
        _renderProductList: function () {
            const oModel = this.getView().getModel();
            const oViewModel = this.getView().getModel("view");
            if (!oModel) return;

            const products = oModel.getProperty("/products") || [];
            const filterCategory = oViewModel.getProperty("/filterCategory");

            const filtered = filterCategory === "All"
                ? products
                : products.filter(p => p.Category === filterCategory);

            console.log("\n┌─────────────────────────────────────────────────────┐");
            console.log("│              📦 Product Catalog                     │");
            console.log("├─────────────────────────────────────────────────────┤");
            console.log(`│  Filter: ${filterCategory}    Total: ${filtered.length} products`);
            console.log("├─────┬──────────────────┬───────────┬────────────────┤");
            console.log("│ ID  │ Name             │ Price     │ Status         │");
            console.log("├─────┼──────────────────┼───────────┼────────────────┤");

            filtered.forEach(p => {
                const id = String(p.ID).padEnd(3);
                const name = p.Name.padEnd(16);
                const price = formatter.formatPrice(p.Price).padEnd(9);
                const stock = formatter.formatStock(p.InStock);
                console.log(`│ ${id} │ ${name} │ ${price} │ ${stock} │`);
            });

            console.log("└─────┴──────────────────┴───────────┴────────────────┘");
        },

        // ─── Private: Render product detail ───
        _renderProductDetail: function (product) {
            console.log("\n┌──────────────────────────────────┐");
            console.log("│        📋 Product Detail         │");
            console.log("├──────────────────────────────────┤");
            console.log(`│  ID:       ${product.ID}`);
            console.log(`│  Name:     ${product.Name}`);
            console.log(`│  Price:    ${formatter.formatPrice(product.Price)}`);
            console.log(`│  Category: ${formatter.formatCategory(product.Category)}`);
            console.log(`│  Stock:    ${formatter.formatStock(product.InStock)}`);
            console.log("└──────────────────────────────────┘");
        },

        // ─── Lifecycle: Called when view is destroyed ───
        onExit: function () {
            console.log(`\n[${this._controllerName}] Destroyed. Goodbye!`);
        }
    });
});

// ============================================================
// APPLICATION BOOTSTRAP (simulating index.html + Component.js)
// ============================================================

(async function main() {
    console.log("╔══════════════════════════════════════════════╗");
    console.log("║                                              ║");
    console.log("║   🏢  SAP UI5-Like Product Manager App      ║");
    console.log("║       (Built with plain JavaScript)          ║");
    console.log("║                                              ║");
    console.log("╚══════════════════════════════════════════════╝");

    // Get framework classes
    const View = ModuleRegistry.require("sap/ui/core/mvc/View");
    const ProductListController = ModuleRegistry.require("app/controller/ProductList");

    // 1. Create controller (framework does this automatically in real UI5)
    const oController = new ProductListController();

    // 2. Create view and connect to controller
    const oView = new View("app.view.ProductList", oController);

    // 3. Initialize (triggers onInit lifecycle)
    await oController.onInit();

    // ─── Simulate User Interactions ───

    // 4. User selects a product
    console.log("\n\n>>> 👆 User taps on 'Laptop'...");
    oController.onProductSelect({
        getParameter: (key) => ({ product: { ID: 1, Name: "Laptop", Price: 1200, Category: "Electronics", InStock: true } })[key],
        getSource: () => ({})
    });

    // 5. User filters by category
    console.log("\n>>> 🔍 User filters by 'Furniture'...");
    oController.onFilterCategory({
        getParameter: (key) => ({ category: "Furniture" })[key],
        getSource: () => ({})
    });

    // 6. User resets filter
    console.log("\n>>> 🔍 User resets filter to 'All'...");
    oController.onFilterCategory({
        getParameter: (key) => ({ category: "All" })[key],
        getSource: () => ({})
    });

    // 7. User adds a product
    console.log("\n>>> ➕ User clicks 'Add Product'...");
    await oController.onAddProduct();

    // 8. User updates a price
    console.log("\n>>> ✏️  User updates Laptop price...");
    await oController.onUpdatePrice({
        getParameter: (key) => ({ productId: 1, newPrice: 999 })[key],
        getSource: () => ({})
    });

    // 9. User deletes a product
    console.log("\n>>> 🗑️  User deletes product 3...");
    await oController.onDeleteProduct({
        getParameter: (key) => ({ productId: 3 })[key],
        getSource: () => ({})
    });

    // 10. Cleanup
    oController.onExit();

    // ─── Summary ───
    console.log("\n╔══════════════════════════════════════════════╗");
    console.log("║   🎓 Concepts Used in This Mini-Project:    ║");
    console.log("╠══════════════════════════════════════════════╣");
    console.log("║  • Module system (sap.ui.define pattern)    ║");
    console.log("║  • MVC: Model, View, Controller separation  ║");
    console.log("║  • Data binding (model → view auto-sync)    ║");
    console.log("║  • Event handling (fire/attach pattern)     ║");
    console.log("║  • Async/await for API calls                ║");
    console.log("║  • Prototypal inheritance (extend pattern)  ║");
    console.log("║  • Closures (private data in modules)       ║");
    console.log("║  • Promises (API simulation)                ║");
    console.log("║  • `this` context (bind, arrow functions)   ║");
    console.log("║  • Object destructuring & spread            ║");
    console.log("║  • Array methods (filter, map, find)        ║");
    console.log("║  • Template literals for formatting         ║");
    console.log("╚══════════════════════════════════════════════╝");

})();

// ============================================================
// Run: node mini-project/simple-ui5-like-app.js
// ============================================================
