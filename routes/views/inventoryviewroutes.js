import express from 'express';
import { getAllInventory } from '../../controllers/inventorycontroller.js';

const router = express.Router();

router.get('/', getAllInventory); // Render EJS view

export default router;
