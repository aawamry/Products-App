import express from 'express';                                                                 // Import Express framework
import {
	getAllProducts,                                                                             // Controller to render list of all products
	renderAddProductForm,                                                                       // Controller to show the "Add Product" form
	renderEditProductForm,                                                                      // Controller to show the "Edit Product" form
	viewProductPage,                                                                            // Controller to display a single product's details
	deleteProductPage                                                                           // Controller to handle deletion and redirect
} from '../../controllers/views/productviewcontroller.js';                                     // Import view controllers for products

const router = express.Router();                                                               // Create a new Express router instance

router.get('/', getAllProducts);                                                               // Route: GET /products → show all products
router.get('/add', renderAddProductForm);                                                      // Route: GET /products/add → show add form
router.get('/:id/edit', renderEditProductForm);                                                // Route: GET /products/:id/edit → show edit form
router.get('/:id', viewProductPage);                                                           // Route: GET /products/:id → view product details
router.delete('/:id', deleteProductPage);                                                      // Route: DELETE /products/:id → delete product, then redirect

export default router;                                                                         // Export the router for use in app
