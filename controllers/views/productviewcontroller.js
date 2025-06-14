import ProductModel from '../../models/productmodel.js'; // Import product model

export const getAllProducts = async (req, res) => {
	try {
		const products = await ProductModel.getAllModel(); // Get all products
		res.render('products/list', {
			// Show list view
			title: 'All Products',
			products
		});
	} catch (error) {
		console.error('❌ Error fetching products:', error); // Show error
		res.status(500).render('error', { title: 'Error', error }); // Render error page
	}
};

export const renderAddProductForm = (req, res) => {
	res.render('products/form', {
		// Show add product form
		title: 'Add Product',
		formAction: '/api/products', // Form action URL
		method: 'POST', // Submit with POST
		product: null, // No existing product
		backUrl: '/products' // Back button
	});
};

export const renderEditProductForm = async (req, res) => {
	const { id } = req.params; // Get product ID
	try {
		const product = await ProductModel.getByIdModel(id); // Get product from DB
		if (!product) {
			return res.status(404).render('error', {
				// If not found, show error
				title: 'Not Found',
				error: 'Product not found'
			});
		}
		res.render('products/form', {
			// Show edit form
			title: 'Edit Product',
			formAction: `/api/products/${id}?_method=PUT`, // Use method override
			method: 'POST',
			product,
			backUrl: '/products'
		});
	} catch (error) {
		console.error('❌ Error loading edit form:', error); // Show error
		res.status(500).render('error', { title: 'Error', error }); // Render error page
	}
};

export const viewProductPage = async (req, res) => {
	try {
		const product = await ProductModel.getByIdModel(req.params.id); // Get product by ID
		if (!product)
			return res.status(404).render('error', {
				// Not found
				title: 'Not Found',
				error: 'Product not found.'
			});
		res.render('products/product', { title: 'Product Details', product }); // Show product page
	} catch (error) {
		console.error('Error loading product:', error); // Show error
		res.status(500).render('error', { title: 'Error', error: 'Failed to load product.' }); // Error page
	}
};

export const deleteProductPage = async (req, res) => {
	const { id } = req.params; // Get product ID
	try {
		await ProductModel.deleteProductModel(id); // Delete from DB
		res.redirect('/products'); // Go back to list page
	} catch (error) {
		console.error('❌ Error deleting product:', error); // Show error
		res.status(500).render('error', {
			// Show error page
			title: 'Delete Error',
			error: 'Failed to delete the product.'
		});
	}
};
