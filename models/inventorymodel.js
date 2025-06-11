import ProductsDatabase from '../data/data.js';
import {
	getAllQuery,
	getByFieldQuery,
	insertInventoryQuery,
	updateInventoryQuery,
	deleteByIdQuery
} from '../data/queries.js';

class InventoryModel {
	constructor(id, product_id, quantity, location, last_updated) {
		this.id = id;
		this.product_id = product_id;
		this.quantity = quantity;
		this.location = location;
		this.last_updated = last_updated;
	}

	static async getAllModel() {
		const dbInstance = await ProductsDatabase.getInstance();
		const rows = await dbInstance.db.all(getAllQuery('inventory'));

		return rows.map((inv) => new InventoryModel(inv.id, inv.product_id, inv.quantity, inv.location, inv.last_updated));
	}

	static async getByFieldModel(field, value) {
		const allowedFields = ['id', 'product_id', 'location'];
		if (!allowedFields.includes(field)) {
			throw new Error(`❌ Field "${field}" is not allowed.`);
		}

		const dbInstance = await ProductsDatabase.getInstance();
		const rows = await dbInstance.db.all(getByFieldQuery('inventory', field), [`%${value}%`]);

		return rows.map((inv) => new InventoryModel(inv.id, inv.product_id, inv.quantity, inv.location, inv.last_updated));
	}

	static async addInventoryModel(product_id, quantity, location) {
		const dbInstance = await ProductsDatabase.getInstance();
		const result = await dbInstance.db.run(insertInventoryQuery(), [product_id, quantity, location]);

		if (result.changes > 0) {
			return new InventoryModel(result.lastID, product_id, quantity, location, new Date().toISOString());
		}

		return null;
	}

	static async updateInventoryModel(id, product_id, quantity, location) {
		const dbInstance = await ProductsDatabase.getInstance();
		const result = await dbInstance.db.run(updateInventoryQuery(), [product_id, quantity, location, id]);

		if (result.changes > 0) {
			return new InventoryModel(id, product_id, quantity, location, new Date().toISOString());
		}

		return null;
	}

	static async deleteInventoryModel(id) {
		const dbInstance = await ProductsDatabase.getInstance();
		await dbInstance.db.run(deleteByIdQuery(), [id]);
		return { message: `🗑️ Inventory record ${id} deleted.` };
	}
}

export default InventoryModel;
