import express from 'express';
import {
	searchInventory,
	addInventory,
	updateInventory,
	deleteInventory
} from '../../controllers/inventorycontroller.js';

const router = express.Router();

router.get('/search', searchInventory);      // JSON
router.post('/', addInventory);              // JSON
router.put('/:id', updateInventory);         // JSON
router.delete('/:id', deleteInventory);      // JSON

export default router;
