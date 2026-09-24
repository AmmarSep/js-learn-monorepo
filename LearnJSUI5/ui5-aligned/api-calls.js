// ============================================================
// api-calls.js — API Calls in JavaScript (UI5-Style)
// ============================================================
// In Java, you use HttpClient, RestTemplate, or OkHttp for HTTP requests.
// In JS, you use fetch() (modern) or XMLHttpRequest (legacy).
// In UI5, you use OData models, but understanding fetch() is essential.

// ============================================================
// PART 1: The fetch() API (Modern Standard)
// ============================================================

// --- 1. Basic GET Request ---
// fetch() returns a Promise (see promises.js and async-await.js).
// We'll simulate API calls since we can't hit real endpoints in Node.js
// without dependencies — but the patterns are identical.

// Simulating a REST API (like a backend OData service)
function simulateAPI(url, options = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const routes = {
                "GET /api/products": {
                    status: 200,
                    data: {
                        d: {
                            results: [
                                { ID: 1, Name: "Laptop", Price: 1200, Category: "Electronics" },
                                { ID: 2, Name: "Mouse", Price: 25, Category: "Electronics" },
                                { ID: 3, Name: "Desk", Price: 350, Category: "Furniture" }
                            ]
                        }
                    }
                },
                "GET /api/products/1": {
                    status: 200,
                    data: { d: { ID: 1, Name: "Laptop", Price: 1200, Category: "Electronics" } }
                },
                "POST /api/products": {
                    status: 201,
                    data: { d: { ID: 4, ...JSON.parse(options.body || "{}") } }
                },
                "PUT /api/products/1": {
                    status: 200,
                    data: { d: { ID: 1, ...JSON.parse(options.body || "{}") } }
                },
                "DELETE /api/products/1": {
                    status: 204,
                    data: null
                }
            };

            const method = (options.method || "GET").toUpperCase();
            const route = `${method} ${url}`;
            const response = routes[route];

            if (response) {
                resolve({
                    ok: response.status >= 200 && response.status < 300,
                    status: response.status,
                    statusText: response.status === 200 ? "OK" : response.status === 201 ? "Created" : "No Content",
                    json: () => Promise.resolve(response.data),
                    text: () => Promise.resolve(JSON.stringify(response.data))
                });
            } else {
                resolve({
                    ok: false,
                    status: 404,
                    statusText: "Not Found",
                    json: () => Promise.resolve({ error: { message: "Resource not found" } })
                });
            }
        }, 100); // simulate network delay
    });
}

// ============================================================
// PART 2: CRUD Operations with fetch()
// ============================================================

async function demonstrateCRUD() {
    console.log("╔══════════════════════════════════════╗");
    console.log("║   API Calls Demo (UI5-Style)         ║");
    console.log("╚══════════════════════════════════════╝");

    // --- GET (Read) — Fetch all products ---
    console.log("\n--- GET /api/products ---");
    try {
        const response = await simulateAPI("/api/products");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        // OData responses have d.results for collections
        console.log("Products:", data.d.results.map(p => `${p.Name} ($${p.Price})`));
    } catch (error) {
        console.error("GET failed:", error.message);
    }

    // --- GET (Read Single) — Fetch one product ---
    console.log("\n--- GET /api/products/1 ---");
    try {
        const response = await simulateAPI("/api/products/1");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("Product:", data.d);
    } catch (error) {
        console.error("GET failed:", error.message);
    }

    // --- POST (Create) — Add a new product ---
    console.log("\n--- POST /api/products ---");
    try {
        const newProduct = { Name: "Keyboard", Price: 75, Category: "Electronics" };
        const response = await simulateAPI("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("Created:", data.d);
    } catch (error) {
        console.error("POST failed:", error.message);
    }

    // --- PUT (Update) — Modify a product ---
    console.log("\n--- PUT /api/products/1 ---");
    try {
        const updatedProduct = { Name: "Gaming Laptop", Price: 1500, Category: "Electronics" };
        const response = await simulateAPI("/api/products/1", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct)
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("Updated:", data.d);
    } catch (error) {
        console.error("PUT failed:", error.message);
    }

    // --- DELETE (Remove) — Delete a product ---
    console.log("\n--- DELETE /api/products/1 ---");
    try {
        const response = await simulateAPI("/api/products/1", { method: "DELETE" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        console.log("Deleted successfully (status:", response.status + ")");
    } catch (error) {
        console.error("DELETE failed:", error.message);
    }

    // --- Error Handling ---
    console.log("\n--- GET /api/unknown (404 Error) ---");
    try {
        const response = await simulateAPI("/api/unknown");
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message);
        }
    } catch (error) {
        console.log("Handled error:", error.message);
    }
}

// ============================================================
// PART 3: UI5-Style OData Service Wrapper
// ============================================================

class ODataService {
    constructor(serviceUrl) {
        this.serviceUrl = serviceUrl;
        this._headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
    }

    // Read collection (like UI5's oModel.read("/EntitySet"))
    async read(entitySet, filters = {}) {
        const url = `${this.serviceUrl}/${entitySet}`;
        console.log(`  [OData] Reading ${url}...`);
        const response = await simulateAPI(`/api/${entitySet.toLowerCase()}`);
        if (!response.ok) throw new Error(`OData read failed: ${response.status}`);
        const data = await response.json();
        return data.d.results || data.d;
    }

    // Read single entity
    async readById(entitySet, id) {
        const url = `${this.serviceUrl}/${entitySet}(${id})`;
        console.log(`  [OData] Reading ${url}...`);
        const response = await simulateAPI(`/api/${entitySet.toLowerCase()}/${id}`);
        if (!response.ok) throw new Error(`OData read failed: ${response.status}`);
        const data = await response.json();
        return data.d;
    }

    // Create entity (like UI5's oModel.create())
    async create(entitySet, data) {
        console.log(`  [OData] Creating in ${entitySet}...`);
        const response = await simulateAPI(`/api/${entitySet.toLowerCase()}`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`OData create failed: ${response.status}`);
        const result = await response.json();
        return result.d;
    }

    // Update entity
    async update(entitySet, id, data) {
        console.log(`  [OData] Updating ${entitySet}(${id})...`);
        const response = await simulateAPI(`/api/${entitySet.toLowerCase()}/${id}`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`OData update failed: ${response.status}`);
        const result = await response.json();
        return result.d;
    }

    // Delete entity
    async remove(entitySet, id) {
        console.log(`  [OData] Deleting ${entitySet}(${id})...`);
        const response = await simulateAPI(`/api/${entitySet.toLowerCase()}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error(`OData delete failed: ${response.status}`);
        return true;
    }
}

// ============================================================
// PART 4: Using the OData Service in a Controller
// ============================================================

async function demonstrateODataService() {
    console.log("\n\n╔══════════════════════════════════════╗");
    console.log("║   OData Service Demo (UI5-Style)     ║");
    console.log("╚══════════════════════════════════════╝");

    const oDataService = new ODataService("/odata/v2");

    // Simulating a UI5 controller's onInit
    console.log("\n--- Controller onInit ---");
    try {
        // Load products into the model
        const products = await oDataService.read("Products");
        console.log("  Loaded products:", products.map(p => p.Name));

        // Read a single product
        const product = await oDataService.readById("Products", 1);
        console.log("  Single product:", product.Name, `$${product.Price}`);

        // Create a new product
        const newProduct = await oDataService.create("Products", {
            Name: "Webcam",
            Price: 89,
            Category: "Electronics"
        });
        console.log("  Created:", newProduct);

        // Update a product
        const updated = await oDataService.update("Products", 1, {
            Name: "Pro Laptop",
            Price: 1999
        });
        console.log("  Updated:", updated);

        // Delete a product
        await oDataService.remove("Products", 1);
        console.log("  Deleted product 1");

    } catch (error) {
        // In real UI5: MessageBox.error(error.message)
        console.error("Error:", error.message);
    }
}

// ============================================================
// PART 5: Parallel API Calls
// ============================================================

async function demonstrateParallelCalls() {
    console.log("\n\n--- Parallel API Calls ---");
    console.log("Loading dashboard data (all at once)...");

    const oDataService = new ODataService("/odata/v2");

    try {
        const start = Date.now();
        // Load multiple datasets in parallel (much faster!)
        const [products, featuredProduct] = await Promise.all([
            oDataService.read("Products"),
            oDataService.readById("Products", 1)
        ]);

        console.log(`  Loaded in ${Date.now() - start}ms`);
        console.log(`  Products: ${products.length} items`);
        console.log(`  Featured: ${featuredProduct.Name}`);

    } catch (error) {
        console.error("Dashboard load failed:", error.message);
    }
}

// ============================================================
// Run everything
// ============================================================

(async () => {
    await demonstrateCRUD();
    await demonstrateODataService();
    await demonstrateParallelCalls();

    // --- Real UI5 OData Patterns (for reference) ---
    console.log("\n\n--- UI5 OData Quick Reference ---");
    console.log(`
  // V2 OData Model (callback style):
  oModel.read("/Products", {
      success: function(oData) {
          this.getView().getModel("local").setData(oData);
      }.bind(this),
      error: function(oError) {
          MessageBox.error("Failed to load products");
      }
  });

  // V4 OData Model (promise style):
  const oList = oModel.bindList("/Products");
  const aContexts = await oList.requestContexts(0, 100);
  const aProducts = aContexts.map(ctx => ctx.getObject());

  // fetch() for non-OData REST APIs:
  const response = await fetch("/api/custom-endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "value" })
  });
  const data = await response.json();
    `);

    // --- Java Comparison ---
    // Java (RestTemplate):                    JS (fetch):
    // restTemplate.getForObject(url, T.class) await fetch(url).then(r => r.json())
    // restTemplate.postForObject(url, body)   await fetch(url, { method: "POST", body })
    // try { } catch (HttpClientErrorEx e)     try { } catch (error)
})();

// ============================================================
// Run: node ui5-aligned/api-calls.js
// ============================================================
