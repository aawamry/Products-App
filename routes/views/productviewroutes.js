import express from 'express';
import { getAllProducts } from '../../controllers/productcontroller.js';

const router = express.Router();

router.get('/', getAllProducts); // renders EJS template

router.get('/add', (req, res) => { // renders EJS template for adding a new product
	res.render('products/form', {
		title: 'Add Product',
		formAction: '/api/products',
		method: 'POST',
		product: null,
	});
});


export default router;
