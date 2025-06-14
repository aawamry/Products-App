import express from 'express';                                                    // Import Express framework
import {
	searchProducts,                                                               // Controller to handle search
	addProduct,                                                                    // Controller to add new product
	updateProduct,                                                                 // Controller to update existing product
	deleteProduct                                                                  // Controller to delete product
} from '../../controllers/api/productapicontroller.js'; // go up 2 levels          // Import product API controllers

const router = express.Router();                                                  // Create a new Express router instance

router.get('/search', searchProducts);                                            // Route: GET /api/products/search → search for products
router.post('/', addProduct);                                                    // Route: POST /api/products/ → add a new product
router.put('/:id', updateProduct);                                               // Route: PUT /api/products/:id → update product by ID
router.delete('/:id', deleteProduct);                                            // Route: DELETE /api/products/:id → delete product by ID

export default router;                                                            // Export the router to be used in the app
