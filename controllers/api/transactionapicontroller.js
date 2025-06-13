import StockTransactionModel from '../../models/stocktransactionmodel.js';

export const getAllTransactions = async (req, res) => {
	try {
		const transactions = await StockTransactionModel.getAllModel();
		res.json(transactions);
	} catch (error) {
        console.error('Error fetching transactions:', error);
		res.status(500).json({ error: 'Failed to fetch transactions.' });
	}
};

export const searchTransactions = async (req, res) => {
	const { field, value } = req.query;
	try {
		const results = await StockTransactionModel.getByFieldModel(field, value);
		res.json(results);
	} catch (error) {
        console.error('Error searching transactions:', error);
		res.status(400).json({ error: error.message });
	}
};

export const addTransaction = async (req, res) => {
	const { product_id, quantity_change, transaction_type } = req.body;
	try {
		const newTransaction = await StockTransactionModel.addTransactionModel(
			product_id,
			quantity_change,
			transaction_type
		);
		res.status(201).json(newTransaction);
	} catch (error) {
        console.error('Error adding transaction:', error);
		res.status(500).json({ error: 'Failed to add transaction.' });
	}
};

export const deleteTransaction = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await StockTransactionModel.deleteTransactionModel(id);
		res.json(result);
	} catch (error) {
        console.error('Error deleting transaction:', error);
		res.status(500).json({ error: 'Failed to delete transaction.' });
	}
};
