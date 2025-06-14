import express from 'express';
import {
	getAllProducts,
	renderAddProductForm,
	renderEditProductForm,
	viewProductPage,
	deleteProductPage
} from '../../controllers/views/productviewcontroller.js';

const router = express.Router();

router.get('/', getAllProducts);                      // /products
router.get('/add', renderAddProductForm);             // /products/add
router.get('/:id/edit', renderEditProductForm);       // /products/:id/edit
router.get('/:id', viewProductPage);             //products/:id
router.delete('/:id', deleteProductPage); // redirects to product list


export default router;
