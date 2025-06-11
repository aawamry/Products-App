import ProductsDatabase from '../data/data.js';
import { getAllQuery, getByFieldQuery, insertStockTransactionQuery, deleteByIdQuery } from '../data/queries.js';

class StockTransactionModel {
	constructor(id, product_id, quantity_change, transaction_type, transaction_date) {
		this.id = id;
		this.product_id = product_id;
		this.quantity_change = quantity_change;
		this.transaction_type = transaction_type;
		this.transaction_date = transaction_date;
	}

	static async getAllModel() {
		const dbInstance = await ProductsDatabase.getInstance();
		const rows = await dbInstance.db.all(getAllQuery('stock_transactions'));

		return rows.map(
			(trx) =>
				new StockTransactionModel(
					trx.id,
					trx.product_id,
					trx.quantity_change,
					trx.transaction_type,
					trx.transaction_date
				)
		);
	}

	static async getByFieldModel(field, value) {
		const allowedFields = ['id', 'product_id', 'transaction_type'];
		if (!allowedFields.includes(field)) {
			throw new Error(`❌ Field "${field}" is not allowed.`);
		}

		const dbInstance = await ProductsDatabase.getInstance();
		const rows = await dbInstance.db.all(getByFieldQuery('stock_transactions', field), [`%${value}%`]);

		return rows.map(
			(trx) =>
				new StockTransactionModel(
					trx.id,
					trx.product_id,
					trx.quantity_change,
					trx.transaction_type,
					trx.transaction_date
				)
		);
	}

	static async addTransactionModel(product_id, quantity_change, transaction_type) {
		const dbInstance = await ProductsDatabase.getInstance();
		const result = await dbInstance.db.run(insertStockTransactionQuery(), [
			product_id,
			quantity_change,
			transaction_type,
			new Date().toISOString()
		]);

		if (result.changes > 0) {
			return new StockTransactionModel(
				result.lastID,
				product_id,
				quantity_change,
				transaction_type,
				new Date().toISOString()
			);
		}

		return null;
	}

	static async deleteTransactionModel(id) {
		const dbInstance = await ProductsDatabase.getInstance();
		await dbInstance.db.run(deleteByIdQuery(), [id]);
		return { message: `🗑️ Transaction ${id} deleted.` };
	}
}

export default StockTransactionModel;
