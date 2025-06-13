import express from 'express';
import {
	searchTransactions,
	addTransaction,
	deleteTransaction
} from '../../controllers/transactioncontroller.js';

const router = express.Router();

router.get('/search', searchTransactions);   // JSON
router.post('/', addTransaction);            // JSON
router.delete('/:id', deleteTransaction);    // JSON

export default router;
