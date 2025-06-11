import ProductModel from '../models/productmodel.js';

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

export const searchProducts = async (req, res) => {
	const { field, value } = req.query;
	try {
		const products = await ProductModel.getByFieldModel(field, value);
		res.json(products);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const addProduct = async (req, res) => {
	const { name, description, price } = req.body;
	try {
		const newProduct = await ProductModel.addProductModel(name, description, price);
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(500).json({ error: 'Failed to add product.' });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, description, price } = req.body;
	try {
		const updated = await ProductModel.updateProductModel(id, name, description, price);
		if (updated) res.json(updated);
		else res.status(404).json({ error: 'Product not found.' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to update product.' });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await ProductModel.deleteProductModel(id);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete product.' });
	}
};
