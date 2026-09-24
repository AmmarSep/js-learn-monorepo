// ============================================================
// promises.js — Promises in JavaScript
// ============================================================
// In Java, you use Future/CompletableFuture for async operations.
// In JS, Promises are the standard way to handle async code.
// UI5 uses Promises heavily for OData calls, API requests, and navigation.

// --- 1. What is a Promise? ---
// A Promise represents a value that will be available in the future.
// It has 3 states: pending → fulfilled (resolved) OR rejected.

// Creating a promise:
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    setTimeout(() => {
        if (success) {
            resolve("Data loaded successfully!");
        } else {
            reject("Error loading data!");
        }
    }, 100);
});

// --- 2. Consuming a Promise with .then() and .catch() ---
myPromise
    .then((result) => {
        console.log("Resolved:", result);
    })
    .catch((error) => {
        console.log("Rejected:", error);
    })
    .finally(() => {
        console.log("Finally: always runs (like Java's finally block)");
    });

// --- 3. Simulating an API Call (like OData in UI5) ---
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        console.log(`\nFetching user ${userId}...`);
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Ammar", role: "Developer" });
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 100);
    });
}

// Success case:
fetchUserData(1)
    .then(user => console.log("User:", user))
    .catch(err => console.log("Error:", err.message));

// Error case:
fetchUserData(-1)
    .then(user => console.log("User:", user))
    .catch(err => console.log("Error:", err.message));

// --- 4. Chaining Promises (like Java's thenCompose) ---
// Each .then() returns a new Promise, so you can chain them.
function getOrder(userId) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ orderId: "ORD-42", userId }), 50);
    });
}

function getOrderDetails(orderId) {
    return new Promise(resolve => {
        setTimeout(() => resolve({ orderId, items: ["Laptop", "Mouse"], total: 1225 }), 50);
    });
}

// Chain: fetch user → get their order → get order details
setTimeout(() => {
    console.log("\n--- Promise Chaining ---");
    fetchUserData(1)
        .then(user => {
            console.log("Step 1 - Got user:", user.name);
            return getOrder(user.id);
        })
        .then(order => {
            console.log("Step 2 - Got order:", order.orderId);
            return getOrderDetails(order.orderId);
        })
        .then(details => {
            console.log("Step 3 - Got details:", details);
        })
        .catch(err => {
            // Catches errors from ANY step in the chain
            console.log("Chain error:", err.message);
        });
}, 500);

// --- 5. Promise.all() — Run multiple promises in parallel ---
// Like Java's CompletableFuture.allOf()
// Waits for ALL to complete. Fails if ANY fails.
setTimeout(() => {
    console.log("\n--- Promise.all ---");
    const p1 = fetchUserData(1);
    const p2 = fetchUserData(2);
    const p3 = new Promise(resolve => setTimeout(() => resolve("Config loaded"), 50));

    Promise.all([p1, p2, p3])
        .then(([user1, user2, config]) => {
            console.log("All resolved:", user1.name, user2.name, config);
        })
        .catch(err => console.log("One failed:", err.message));
}, 1000);

// --- 6. Promise.race() — First one wins ---
setTimeout(() => {
    console.log("\n--- Promise.race ---");
    const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 200));
    const fast = new Promise(resolve => setTimeout(() => resolve("Fast"), 50));

    Promise.race([slow, fast])
        .then(winner => console.log("Race winner:", winner)); // "Fast"
}, 1500);

// --- 7. Promise.allSettled() — Wait for all, don't fail early ---
// Useful when you want results of all promises regardless of failures.
setTimeout(() => {
    console.log("\n--- Promise.allSettled ---");
    const promises = [
        fetchUserData(1),    // succeeds
        fetchUserData(-1),   // fails
        fetchUserData(3)     // succeeds
    ];

    Promise.allSettled(promises)
        .then(results => {
            results.forEach((result, i) => {
                if (result.status === "fulfilled") {
                    console.log(`  Promise ${i}: ✓`, result.value.name || result.value);
                } else {
                    console.log(`  Promise ${i}: ✗`, result.reason.message);
                }
            });
        });
}, 2000);

// --- 8. Converting Callbacks to Promises ---
// Many older APIs (and some UI5 APIs) use callbacks. You can wrap them:
function readFileCallback(filename, callback) {
    setTimeout(() => {
        if (filename) callback(null, `Content of ${filename}`);
        else callback(new Error("No filename provided"));
    }, 50);
}

// Promisified version:
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        readFileCallback(filename, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

setTimeout(() => {
    console.log("\n--- Promisified ---");
    readFilePromise("config.json")
        .then(content => console.log("Read:", content))
        .catch(err => console.log("Error:", err.message));
}, 2500);

// --- UI5 Connection ---
// In UI5, many APIs return promises or use promise-like patterns:
//   oModel.read("/Products", {
//       success: function(oData) { ... },  // callback style
//       error: function(oError) { ... }
//   });
//
// Modern UI5 (V4 OData model) uses promises:
//   oModel.bindList("/Products").requestContexts()
//       .then(function(aContexts) { ... });
//
// Understanding Promises is essential for:
//   - API calls (OData, REST)
//   - Navigation (Router.navTo with promises)
//   - Dialog handling
//   - Fragment loading

// ============================================================
// Run: node advanced-js/promises.js
// ============================================================
