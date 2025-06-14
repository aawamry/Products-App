// ---------------- Create Tables ----------------
export const createProductsTable = () => `CREATE TABLE IF NOT EXISTS Products(
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,        // Unique product ID, auto-incremented
  name TEXT NOT NULL,                                  // Product name (required)
  category TEXT,                                       // Product category (optional)
  price DECIMAL(10,2),                                 // Product price (up to 10 digits, 2 decimals)
  sku TEXT UNIQUE,                                     // Unique SKU (stock keeping unit)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP        // Timestamp when the product was added
)`;

export const createInventoryTable = () => `CREATE TABLE IF NOT EXISTS Inventory (
  inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,      // Unique inventory ID, auto-incremented
  product_id INTEGER NOT NULL,                         // Related product ID (foreign key)
  quantity INTEGER DEFAULT 0,                          // Quantity in stock, default is 0
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,       // Timestamp when inventory was added
  FOREIGN KEY (product_id) REFERENCES Products(product_id) // Link to Products table
)`;

export const createStockTransactionsTable = () => `CREATE TABLE IF NOT EXISTS StockTransactions (
  transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,    // Unique transaction ID, auto-incremented
  product_id INTEGER NOT NULL,                         // Related product ID (foreign key)
  transaction_type TEXT CHECK(transaction_type IN ('IN', 'OUT')) NOT NULL, // IN or OUT transaction
  quantity INTEGER NOT NULL,                           // Number of items moved
  reason TEXT,                                         // Reason for transaction (optional)
  transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP, // Timestamp of the transaction
  FOREIGN KEY (product_id) REFERENCES Products(product_id) // Link to Products table
)`;

// ---------------- Queries ----------------
export const getAllQuery = (table) => `SELECT * FROM ${table}`; // Get all rows from a table

export const getByFieldQuery = (table, field) => `SELECT * FROM ${table} WHERE ${field} LIKE ?`; // Search by field using LIKE

export const getByIdQuery = (table, idField = 'id') => `SELECT * FROM ${table} WHERE ${idField} = ?`; // Get row by ID

export const insertProductQuery = (table) => `INSERT INTO ${table} (name, category, price, sku) VALUES (?, ?, ?, ?)`; // Insert new product

export const updateProductQuery = (table) =>
	`UPDATE ${table} SET name = ?, category = ?, price = ?, sku = ? WHERE product_id = ?`; // Update product details

export const insertInventoryQuery = (table) => `INSERT INTO ${table} (product_id, quantity) VALUES (?, ?)`; // Insert new inventory entry

export const updateInventoryQuery = (table) =>
	`UPDATE ${table} SET quantity = ?, created_at = CURRENT_TIMESTAMP WHERE inventory_id = ?`; // Update inventory quantity and timestamp

export const insertStockTransactionQuery = (table) =>
	`INSERT INTO ${table} (product_id, transaction_type, quantity, reason) VALUES (?, ?, ?, ?)`; // Insert new stock transaction

export const updateStockTransactionQuery = (table) =>
	`UPDATE ${table} SET transaction_type = ?, quantity = ?, reason = ?, transaction_date = CURRENT_TIMESTAMP WHERE transaction_id = ?`; // Update stock transaction

export const deleteByIdQuery = (table, idField = 'product_id') => `DELETE FROM ${table} WHERE ${idField} = ?`; // Delete record by ID
