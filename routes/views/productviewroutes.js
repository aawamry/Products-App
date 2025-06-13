import express from 'express';
import {
	getAllProducts,
	renderAddProductForm,
	renderEditProductForm
} from '../../controllers/views/productviewcontroller.js';

const router = express.Router();

router.get('/', getAllProducts);             // View all products
router.get('/add', renderAddProductForm);    // Render "Add Product" form
router.get('/:id/edit', renderEditProductForm); // Render "Edit Product" form

export default router;
