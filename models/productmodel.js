import ProductsDatabase from '../data/data.js';
import {
	getAllQuery,
	getByFieldQuery,
	insertProductQuery,
	updateProductQuery,
	deleteByIdQuery
} from '../data/queries.js';

class ProductsModel {
	constructor(id, name, description, price, created_at) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.price = price;
		this.created_at = created_at;
	}

	// Get all products
	static async getAllModel() {
		const dbInstance = await ProductsDatabase.getInstance();
		const products = await dbInstance.db.all(getAllQuery('products'));

		return products.map((p) => new ProductsModel(p.id, p.name, p.description, p.price, p.created_at));
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
	static async addProductModel(name, description, price) {
		const dbInstance = await ProductsDatabase.getInstance();
		const result = await dbInstance.db.run(insertProductQuery(), [name, description, price]);

		if (result.changes > 0) {
			return new ProductsModel(result.lastID, name, description, price, new Date().toISOString());
		}

		return null;
	}

	// Update product by ID
	static async updateProductModel(id, name, description, price) {
		const dbInstance = await ProductsDatabase.getInstance();
		const result = await dbInstance.db.run(updateProductQuery(), [name, description, price, id]);

		if (result.changes > 0) {
			return new ProductsModel(id, name, description, price);
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
