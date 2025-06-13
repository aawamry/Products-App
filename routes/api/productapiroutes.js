import express from 'express';
import {
	searchProducts,
	addProduct,
	updateProduct,
	deleteProduct
} from '../../controllers/api/productapicontroller.js'; // go up 2 levels

const router = express.Router();

router.get('/search', searchProducts); // return JSON
router.post('/', addProduct);          // JSON
router.put('/:id', updateProduct);     // JSON
router.delete('/:id', deleteProduct);  // JSON

export default router;
