import express from 'express';
import {
	getAllTransactions,
	searchTransactions,
	addTransaction,
	deleteTransaction
} from '../controllers/transactioncontroller.js';

const router = express.Router();

router.get('/', getAllTransactions); // GET all transactions
router.get('/search', searchTransactions); // GET transactions by field
router.post('/', addTransaction); // POST new transaction
router.delete('/:id', deleteTransaction); // DELETE transaction by id

export default router;
