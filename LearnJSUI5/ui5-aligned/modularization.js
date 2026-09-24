// ============================================================
// modularization.js — ES6 Modules vs UI5 Modules
// ============================================================
// In Java, you use packages and imports (import java.util.List;).
// In JS, there are two module systems you'll encounter in UI5 projects:
//   1. ES6 Modules (import/export) — modern standard
//   2. UI5 Modules (sap.ui.define/sap.ui.require) — UI5's own system

// ============================================================
// PART 1: ES6 MODULES (Modern JavaScript Standard)
// ============================================================

// --- How ES6 modules work (conceptual — these would be in separate files) ---

// FILE: mathUtils.js
// export function add(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }
// export const PI = 3.14159;
// export default class Calculator { ... }

// FILE: app.js
// import Calculator from './mathUtils.js';               // default import
// import { add, subtract } from './mathUtils.js';        // named imports
// import { add as sum } from './mathUtils.js';           // rename
// import * as MathUtils from './mathUtils.js';           // import all

// --- Simulating module patterns (runnable in Node.js) ---

// Named exports pattern:
const MathModule = (() => {
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const PI = 3.14159;
    return { add, subtract, multiply, PI };
})();

console.log("ES6-like module:", MathModule.add(5, 3));
console.log("Module constant:", MathModule.PI);

// Default export pattern:
const createLogger = (() => {
    class Logger {
        constructor(prefix) {
            this.prefix = prefix;
        }
        log(message) {
            console.log(`[${this.prefix}] ${message}`);
        }
        error(message) {
            console.error(`[${this.prefix} ERROR] ${message}`);
        }
    }
    return Logger; // default export
})();

const logger = new createLogger("APP");
logger.log("Application started");

// ============================================================
// PART 2: UI5 MODULE SYSTEM (sap.ui.define / sap.ui.require)
// ============================================================

// UI5 uses AMD-style (Asynchronous Module Definition) modules.
// This predates ES6 modules but is still the standard in UI5.

// --- Simulating sap.ui.define ---
// In real UI5: sap.ui.define(dependencies, factory)
// Here we simulate the pattern:

const moduleRegistry = {};

function sapUiDefine(moduleName, dependencies, factory) {
    // Resolve dependencies
    const resolvedDeps = dependencies.map(dep => moduleRegistry[dep]);
    // Call factory with resolved dependencies
    const moduleExport = factory(...resolvedDeps);
    // Register the module
    moduleRegistry[moduleName] = moduleExport;
    return moduleExport;
}

// --- Example: Defining modules UI5-style ---

// 1. Define a utility module (like a Java utility class)
sapUiDefine("myapp/utils/Formatter", [], function () {
    "use strict";
    return {
        formatCurrency(value) {
            return `$${Number(value).toFixed(2)}`;
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString();
        },
        capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    };
});

// 2. Define a model module that depends on Formatter
sapUiDefine("myapp/model/DataService",
    ["myapp/utils/Formatter"],
    function (Formatter) {
        "use strict";
        return {
            getProducts() {
                return [
                    { name: "laptop", price: 1200 },
                    { name: "mouse", price: 25 },
                    { name: "keyboard", price: 75 }
                ];
            },
            getFormattedProducts() {
                return this.getProducts().map(p => ({
                    name: Formatter.capitalizeFirst(p.name),
                    price: Formatter.formatCurrency(p.price)
                }));
            }
        };
    }
);

// 3. Define a controller that uses both modules
sapUiDefine("myapp/controller/Main",
    ["myapp/utils/Formatter", "myapp/model/DataService"],
    function (Formatter, DataService) {
        "use strict";

        // This simulates Controller.extend("myapp.controller.Main", { ... })
        return {
            onInit() {
                console.log("\n--- UI5 Module System Demo ---");
                const products = DataService.getFormattedProducts();
                products.forEach(p => {
                    console.log(`  ${p.name}: ${p.price}`);
                });
            }
        };
    }
);

// Use the controller:
moduleRegistry["myapp/controller/Main"].onInit();

// ============================================================
// PART 3: KEY DIFFERENCES
// ============================================================

console.log("\n--- ES6 vs UI5 Modules ---");
console.log("┌─────────────────────┬────────────────────────────┬───────────────────────────┐");
console.log("│ Feature             │ ES6 Modules                │ UI5 Modules               │");
console.log("├─────────────────────┼────────────────────────────┼───────────────────────────┤");
console.log("│ Syntax              │ import/export              │ sap.ui.define/require     │");
console.log("│ Loading             │ Static (compile-time)      │ Dynamic (runtime)         │");
console.log("│ Default export      │ export default             │ return from factory       │");
console.log("│ Named exports       │ export { a, b }            │ N/A (return object)       │");
console.log("│ Dependencies        │ import ... from '...'      │ Array of dependency paths │");
console.log("│ File extension      │ .mjs or .js                │ .js                       │");
console.log("│ Used in             │ Modern JS, Node.js         │ SAP UI5 / Fiori           │");
console.log("└─────────────────────┴────────────────────────────┴───────────────────────────┘");

// ============================================================
// PART 4: REAL UI5 MODULE EXAMPLES (for reference)
// ============================================================

// Example 1: UI5 Controller
// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/m/MessageBox"
// ], function(Controller, JSONModel, MessageBox) {
//     "use strict";
//     return Controller.extend("myapp.controller.Main", {
//         onInit: function() {
//             var oModel = new JSONModel({ items: [] });
//             this.getView().setModel(oModel);
//         },
//         onPress: function() {
//             MessageBox.information("Hello!");
//         }
//     });
// });

// Example 2: UI5 Custom Formatter
// sap.ui.define([], function() {
//     "use strict";
//     return {
//         statusText: function(sStatus) {
//             switch(sStatus) {
//                 case "A": return "Active";
//                 case "I": return "Inactive";
//                 default: return "Unknown";
//             }
//         }
//     };
// });

// --- Java vs JS Module Comparison ---
// Java:   package com.myapp.utils;
//         import com.myapp.model.Product;
//         public class Formatter { ... }
//
// UI5:    sap.ui.define(["myapp/model/Product"], function(Product) {
//             return { ... };
//         });
//
// ES6:    import { Product } from '../model/Product.js';
//         export class Formatter { ... }

// ============================================================
// Run: node ui5-aligned/modularization.js
// ============================================================
