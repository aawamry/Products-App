import InventoryModel from '../../models/inventorymodel.js';

export const getAllInventory = async (req, res) => {
	try {
		const inventory = await InventoryModel.getAllModel();
		res.json(inventory);
	} catch (error) {
        console.error('Error fetching inventory:', error);
		res.status(500).json({ error: 'Failed to fetch inventory.' });
	}
};

export const searchInventory = async (req, res) => {
	const { field, value } = req.query;
	try {
		const results = await InventoryModel.getByFieldModel(field, value);
		res.json(results);
	} catch (error) {
        console.error('Error searching inventory:', error);
		res.status(400).json({ error: error.message });
	}
};

export const addInventory = async (req, res) => {
	const { product_id, quantity, location } = req.body;
	try {
		const newInventory = await InventoryModel.addInventoryModel(product_id, quantity, location);
		res.status(201).json(newInventory);
	} catch (error) {
        console.error('Error adding inventory:', error);
		res.status(500).json({ error: 'Failed to add inventory.' });
	}
};

export const updateInventory = async (req, res) => {
	const { id } = req.params;
	const { product_id, quantity, location } = req.body;
	try {
		const updated = await InventoryModel.updateInventoryModel(id, product_id, quantity, location);
		if (updated) res.json(updated);
		else res.status(404).json({ error: 'Inventory record not found.' });
	} catch (error) {
        console.error('Error updating inventory:', error);
		res.status(500).json({ error: 'Failed to update inventory.' });
	}
};

export const deleteInventory = async (req, res) => {
	const { id } = req.params;
	try {
		const result = await InventoryModel.deleteInventoryModel(id);
        console.log('Inventory deleted:', result);
		res.json(result);
	} catch (error) {
        console.error('Error deleting inventory:', error);
		res.status(500).json({ error: 'Failed to delete inventory.' });
	}
};
