import ProductModel from '../../models/productmodel.js'; // Import product model

export const searchProducts = async (req, res) => {
	const { field, value } = req.query; // Get search field and value from URL
	try {
		const products = await ProductModel.getByFieldModel(field, value); // Search in database
		res.json(products); // Return matching products in JSON
	} catch (error) {
		res.status(400).json({ error: error.message }); // Return error
	}
};

export const addProduct = async (req, res) => {
	const { name, category, price, sku } = req.body; // Get product data from form
	try {
		const newProduct = await ProductModel.addProductModel(name, category, price, sku); // Add product to DB
		res.status(201).json(newProduct); // Return new product in JSON with 201 Created status
	} catch (error) {
		console.error('❌ Error adding product:', error); // Show error in console
		res.status(500).json({ error: 'Failed to add product.' }); // Return error
	}
};

export const updateProduct = async (req, res) => {
	const { product_id } = req.params; // Get product ID from URL
	const { name, category, price, sku } = req.body; // Get updated data
	try {
		const updated = await ProductModel.updateProductModel(product_id, name, category, price, sku); // Update DB
		if (updated) res.json(updated); // Return updated product in JSON
		else res.status(404).json({ error: 'Product not found.' }); // Product not found
	} catch (error) {
		res.status(500).json({ error: 'Failed to update product.' }); // Return error
	}
};

export const deleteProduct = async (req, res) => {
	const { product_id } = req.params; // Get product ID from URL
	try {
		const result = await ProductModel.deleteProductModel(product_id); // Delete from DB
		res.json(result); // Return result
	} catch (error) {
		console.error('❌ Error deleting product:', error); // Show error in console
		res.status(500).json({ error: 'Failed to delete product.' }); // Return error
	}
};
