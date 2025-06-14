import ProductsDatabase from '../data/data.js';                // Import the database class
import {
	getAllQuery,                                               // SQL to get all records
	getByFieldQuery,                                           // SQL to get by any field
	getByIdQuery,                                              // SQL to get by ID
	insertProductQuery,                                        // SQL to insert product
	updateProductQuery,                                        // SQL to update product
	deleteByIdQuery                                            // SQL to delete by ID
} from '../data/queries.js';

class ProductsModel {
	constructor(product_id, name, category, price, sku, created_at) {
		this.product_id = product_id;                         // Unique product ID
		this.name = name;                                     // Product name
		this.description = category;                          // Note: 'category' assigned to 'description' (check if intended)
		this.price = price;                                   // Product price
		this.sku = sku;                                       // Unique SKU code
		this.created_at = created_at;                         // Timestamp of creation
	}

	// ---------------- Get all products ----------------
	static async getAllModel() {
		const dbInstance = await ProductsDatabase.getInstance(); // Get DB instance
		const products = await dbInstance.db.all(getAllQuery('Products')); // Run query

		return products.map((p) =>                            // Convert each DB row to model object
			new ProductsModel(p.product_id, p.name, p.category, p.price, p.sku, p.created_at)
		);
	}

	// ---------------- Get products by a specific field ----------------
	static async getByFieldModel(field, value) {
		const allowedFields = ['product_id', 'name', 'price']; // Limit searchable fields
		if (!allowedFields.includes(field)) {
			throw new Error(`❌ Field ${field} is not allowed.`); // Prevent invalid queries
		}

		const dbInstance = await ProductsDatabase.getInstance(); // Get DB instance

		const products = await dbInstance.db.all(               // Run LIKE query for fuzzy search
			getByFieldQuery('products_id', field), [`%${value}%`]
		);

		return products.map((p) =>
			new ProductsModel(p.product_id, p.name, p.category, p.price, p.sku, p.created_at)
		);
	}

	// ---------------- Get a product by ID ----------------
	static async getByIdModel(id) {
		const dbInstance = await ProductsDatabase.getInstance(); // Get DB instance
		const query = getByIdQuery('products', 'product_id');    // Prepare query
		const row = await dbInstance.db.get(query, [id]);        // Execute query

		if (!row) return null;                                   // Return null if not found

		return new ProductsModel(row.product_id, row.name, row.category, row.price, row.sku, row.created_at); // Wrap in model
	}

	static async addProductModel(name, category, price, sku) {
		const dbInstance = await ProductsDatabase.getInstance(); // Get DB instance

		const result = await dbInstance.db.run(                  // Execute insert query
			insertProductQuery('Products'), [name, category, price, sku]
		);

		if (result.changes > 0) {                                // If insert succeeded
			return new ProductsModel(result.lastID, name, category, price, sku, new Date().toISOString()); // Return model
		}

		return null;                                              // Return null on failure
	}

	static async updateProductModel(id, name, category, price, sku) {
		const dbInstance = await ProductsDatabase.getInstance(); // Get DB instance

		const result = await dbInstance.db.run(                  // Execute update query
			updateProductQuery(), [name, category, price, sku, id]
		);

		if (result.changes > 0) {                                // If update succeeded
			return new ProductsModel(id, name, category, price, sku); // Return updated model
		}

		return null;                                              // Return null on failure
	}

	static async deleteProductModel(product_id) {
		const dbInstance = await ProductsDatabase.getInstance(); // Get DB instance

		await dbInstance.db.run(                                 // Execute delete query
			deleteByIdQuery('Products'), [product_id]
		);

		return { message: `🗑️ Product ${product_id} deleted successfully.` }; // Return success message
	}
}

export default ProductsModel;                                   // Export the model class
