// ============================================================
// async-await.js — Async/Await in JavaScript
// ============================================================
// async/await is syntactic sugar over Promises.
// It makes async code look like synchronous code — much easier to read.
// Java comparison: similar concept to virtual threads or CompletableFuture.get()
// but without blocking the thread.

// --- 1. Basic async/await ---
// `async` before a function means it always returns a Promise.
// `await` pauses execution until the Promise resolves.

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function greet() {
    console.log("Starting...");
    await delay(100); // pause here until delay resolves
    console.log("...Done after 100ms");
    return "Hello!";  // automatically wrapped in a Promise
}

// Calling an async function returns a Promise:
greet().then(result => console.log("Result:", result));

// --- 2. Simulating API Calls ---
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) resolve({ id, name: "Ammar", role: "Developer" });
            else reject(new Error("User not found"));
        }, 50);
    });
}

function fetchOrders(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: "ORD-1", item: "Laptop", amount: 1200 },
                { id: "ORD-2", item: "Mouse", amount: 25 }
            ]);
        }, 50);
    });
}

// --- 3. Sequential Async Operations (vs Promise chaining) ---
// Compare with promises.js — this is much cleaner!
async function getUserWithOrders(userId) {
    try {
        console.log("\n--- Sequential async ---");
        const user = await fetchUser(userId);         // step 1
        console.log("Got user:", user.name);

        const orders = await fetchOrders(user.id);    // step 2
        console.log("Got orders:", orders);

        // step 3: process the data
        const total = orders.reduce((sum, o) => sum + o.amount, 0);
        console.log(`Total spent by ${user.name}: $${total}`);

        return { user, orders, total };
    } catch (error) {
        // Catches errors from ANY await (like try-catch in Java!)
        console.log("Error:", error.message);
    }
}

getUserWithOrders(1);

// --- 4. Error Handling with try/catch ---
async function riskyOperation() {
    try {
        const user = await fetchUser(-1); // will reject
        console.log("This won't execute");
    } catch (error) {
        console.log("\nCaught error:", error.message);
    } finally {
        console.log("Cleanup: runs regardless (like Java's finally)");
    }
}

setTimeout(() => riskyOperation(), 200);

// --- 5. Parallel Execution with async/await ---
// WRONG: This runs sequentially (slow!)
async function sequentialFetch() {
    console.log("\n--- Sequential (slow) ---");
    const start = Date.now();
    const user1 = await fetchUser(1); // wait...
    const user2 = await fetchUser(2); // then wait...
    console.log(`Sequential took: ${Date.now() - start}ms`);
}

// RIGHT: Use Promise.all for parallel execution
async function parallelFetch() {
    console.log("\n--- Parallel (fast) ---");
    const start = Date.now();
    const [user1, user2] = await Promise.all([
        fetchUser(1),
        fetchUser(2)
    ]);
    console.log(`Parallel took: ${Date.now() - start}ms`);
    console.log("Users:", user1.name, user2.name);
}

setTimeout(async () => {
    await sequentialFetch();
    await parallelFetch();
}, 500);

// --- 6. Async in Loops ---
// forEach does NOT work with await! Use for...of instead.
async function processUsers() {
    console.log("\n--- Async in loop ---");
    const userIds = [1, 2, 3];

    // WRONG — forEach ignores await:
    // userIds.forEach(async (id) => {
    //     const user = await fetchUser(id); // fires all at once, no order
    // });

    // RIGHT — for...of respects await:
    for (const id of userIds) {
        const user = await fetchUser(id);
        console.log(`  Processed user ${id}:`, user.name);
    }

    // Or use Promise.all for parallel processing:
    const users = await Promise.all(userIds.map(id => fetchUser(id)));
    console.log("  All users:", users.map(u => u.name));
}

setTimeout(() => processUsers(), 1000);

// --- 7. Real-World Pattern: Loading Screen Data ---
// This is how you'd structure an onInit in a UI5 controller:
async function onInit() {
    console.log("\n--- UI5-like onInit ---");
    try {
        // Show busy indicator
        console.log("Setting busy state...");

        // Load all required data in parallel
        const [user, orders] = await Promise.all([
            fetchUser(1),
            fetchOrders(1)
        ]);

        // Update the model (in UI5: this.getView().getModel().setData(...))
        const viewData = {
            userName: user.name,
            userRole: user.role,
            orderCount: orders.length,
            orders: orders
        };
        console.log("View data ready:", viewData);

    } catch (error) {
        // Show error message (in UI5: MessageBox.error(...))
        console.log("Failed to load:", error.message);
    } finally {
        // Hide busy indicator
        console.log("Removing busy state");
    }
}

setTimeout(() => onInit(), 1500);

// --- UI5 Connection ---
// Modern UI5 controllers commonly use async/await:
//
// onInit: async function() {
//     try {
//         this.getView().setBusy(true);
//         const oData = await this.loadData();
//         this.getView().getModel().setData(oData);
//     } catch (oError) {
//         MessageBox.error(oError.message);
//     } finally {
//         this.getView().setBusy(false);
//     }
// }

// ============================================================
// Run: node advanced-js/async-await.js
// ============================================================
