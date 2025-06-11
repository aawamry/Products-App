import express from 'express';
import {
	getAllProducts,
	searchProducts,
	addProduct,
	updateProduct,
	deleteProduct
} from '../controllers/productcontroller.js';

const router = express.Router();



router.get('/', getAllProducts); // GET all products
router.get('/search', searchProducts); // GET products by field & value
router.post('/', addProduct); // POST new product
router.put('/:id', updateProduct); // PUT update product by id
router.delete('/:id', deleteProduct); // DELETE product by id

export default router;
