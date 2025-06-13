import ProductsDatabase from '../data/data.js';
import {
	getAllQuery,
	getByFieldQuery,
	insertProductQuery,
	updateProductQuery,
	deleteByIdQuery
} from '../data/queries.js';

class ProductsModel {
	constructor(product_id, name, category, price, sku, created_at) {
		this.product_id = product_id;
		this.name = name;
		this.description = category;
		this.price = price;
		this.sku = sku;
		this.created_at = created_at;
	}

	// Get all products
	static async getAllModel() {
		const dbInstance = await ProductsDatabase.getInstance();
		const products = await dbInstance.db.all(getAllQuery('Products'));

		return products.map((p) => new ProductsModel(p.product_id, p.name, p.category, p.price, p.sku, p.created_at));
	}

	// Get products by a specific field
	static async getByFieldModel(field, value) {
		const allowedFields = ['id', 'name', 'price'];
		if (!allowedFields.includes(field)) {
			throw new Error(`❌ Field ${field} is not allowed.`);
		}

		const dbInstance = await ProductsDatabase.getInstance();
		const products = await dbInstance.db.all(getByFieldQuery('products', field), [`%${value}%`]);

		return products.map((p) => new ProductsModel(p.id, p.name, p.description, p.price, p.created_at));
	}

	// Insert new product
	static async addProductModel(name, category, price, sku) {
		const dbInstance = await ProductsDatabase.getInstance();
		const result = await dbInstance.db.run(insertProductQuery('Products'), [name, category, price, sku]);

		if (result.changes > 0) {
			return new ProductsModel(result.lastID, name, category, price, sku, new Date().toISOString());
		}

		return null;
	}

	// Update product by ID
	static async updateProductModel(id, name, category, price, sku) {
		const dbInstance = await ProductsDatabase.getInstance();
		const result = await dbInstance.db.run(updateProductQuery(), [name, category, price, sku, id]);

		if (result.changes > 0) {
			return new ProductsModel(id, name, category, price, sku);
		}

		return null;
	}

	// Delete product
	static async deleteProductModel(id) {
		const dbInstance = await ProductsDatabase.getInstance();
		await dbInstance.db.run(deleteByIdQuery(), [id]);
		return { message: `🗑️ Product ${id} deleted successfully.` };
	}
}

export default ProductsModel;
