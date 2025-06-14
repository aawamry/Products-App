import StockTransactionModel from '../../models/stocktransactionmodel.js'; // Import stock transaction model

export const getAllTransactions = async (req, res) => {
	try {
		const transactions = await StockTransactionModel.getAllModel(); // Get all transactions
		res.json(transactions); // Return as JSON
	} catch (error) {
		console.error('Error fetching transactions:', error); // Show error
		res.status(500).json({ error: 'Failed to fetch transactions.' }); // Return error
	}
};

export const searchTransactions = async (req, res) => {
	const { field, value } = req.query; // Get search field and value
	try {
		const results = await StockTransactionModel.getByFieldModel(field, value); // Search in DB
		res.json(results); // Return results
	} catch (error) {
		console.error('Error searching transactions:', error); // Show error
		res.status(400).json({ error: error.message }); // Return error
	}
};

export const addTransaction = async (req, res) => {
	const { product_id, quantity_change, transaction_type } = req.body; // Get data from form
	try {
		const newTransaction = await StockTransactionModel.addTransactionModel(
			// Add to DB
			product_id,
			quantity_change,
			transaction_type
		);
		res.status(201).json(newTransaction); // Return new transaction
	} catch (error) {
		console.error('Error adding transaction:', error); // Show error
		res.status(500).json({ error: 'Failed to add transaction.' }); // Return error
	}
};

export const deleteTransaction = async (req, res) => {
	const { id } = req.params; // Get transaction ID
	try {
		const result = await StockTransactionModel.deleteTransactionModel(id); // Delete from DB
		res.json(result); // Return result
	} catch (error) {
		console.error('Error deleting transaction:', error); // Show error
		res.status(500).json({ error: 'Failed to delete transaction.' }); // Return error
	}
};
