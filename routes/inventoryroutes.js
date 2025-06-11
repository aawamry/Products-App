import express from 'express';
import {
	getAllInventory,
	searchInventory,
	addInventory,
	updateInventory,
	deleteInventory
} from '../controllers/inventorycontroller.js';

const router = express.Router();

router.get('/', getAllInventory); // GET all inventory records
router.get('/search', searchInventory); // GET inventory by field
router.post('/', addInventory); // POST new inventory entry
router.put('/:id', updateInventory); // PUT update inventory by id
router.delete('/:id', deleteInventory); // DELETE inventory by id

export default router;
