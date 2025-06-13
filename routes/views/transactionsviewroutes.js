import express from 'express';
import { getAllTransactions } from '../../controllers/transactioncontroller.js';

const router = express.Router();

router.get('/', getAllTransactions); // Render EJS view

export default router;
