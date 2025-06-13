import ProductModel from '../../models/productmodel.js';

export const getAllProducts = async (req, res) => {
	try {
		const products = await ProductModel.getAllModel();
		res.render('products/list', {
			title: 'All Products',
			products,
		});
	} catch (error) {
		console.error('❌ Error fetching products:', error);
		res.status(500).render('error', { title: 'Error', error });
	}
};

export const renderAddProductForm = (req, res) => {
	res.render('products/form', {
		title: 'Add Product',
		formAction: '/api/products',
		method: 'POST',
		product: null,
	});
};

export const renderEditProductForm = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await ProductModel.getByIdModel(id);
		if (!product) {
			return res.status(404).render('error', {
				title: 'Not Found',
				error: 'Product not found',
			});
		}
		res.render('products/form', {
			title: 'Edit Product',
			formAction: `/api/products/${id}?_method=PUT`,
			method: 'POST', // still POST with method override
			product,
		});
	} catch (error) {
		console.error('❌ Error loading edit form:', error);
		res.status(500).render('error', { title: 'Error', error });
	}
};
