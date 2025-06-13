// ---------------- Create Tables ----------------
export const createProductsTable = () => `CREATE TABLE IF NOT EXISTS Products(
  product_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT,
  price DECIMAL(10,2),
  sku TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

export const createInventoryTable = () => `CREATE TABLE IF NOT EXISTS Inventory (
  inventory_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  quantity INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
)`;

export const createStockTransactionsTable = () => `CREATE TABLE IF NOT EXISTS StockTransactions (
  transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  transaction_type TEXT CHECK(transaction_type IN ('IN', 'OUT')) NOT NULL,
  quantity INTEGER NOT NULL,
  reason TEXT,
  transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
)`;

// ---------------- Queries ----------------
export const getAllQuery = (table) => `SELECT * FROM ${table}`;

export const getByFieldQuery = (table, field) => `SELECT * FROM ${table} WHERE ${field} LIKE ?`;

export const insertProductQuery = (table) => `INSERT INTO ${table} (name, category, price, sku) VALUES (?, ?, ?, ?)`;

export const updateProductQuery = (table) =>
	`UPDATE ${table} SET name = ?, category = ?, price = ?, sku = ? WHERE product_id = ?`;

export const insertInventoryQuery = (table) => `INSERT INTO ${table} (product_id, quantity) VALUES (?, ?)`;

export const updateInventoryQuery = (table) =>
	`UPDATE ${table} SET quantity = ?, created_at = CURRENT_TIMESTAMP WHERE inventory_id = ?`;

export const insertStockTransactionQuery = (table) =>
	`INSERT INTO ${table} (product_id, transaction_type, quantity, reason) VALUES (?, ?, ?, ?)`;

export const updateStockTransactionQuery = (table) =>
	`UPDATE ${table} SET transaction_type = ?, quantity = ?, reason = ?, transaction_date = CURRENT_TIMESTAMP WHERE transaction_id = ?`;

export const deleteByIdQuery = (table, idField = 'id') => `DELETE FROM ${table} WHERE ${idField} = ?`;
