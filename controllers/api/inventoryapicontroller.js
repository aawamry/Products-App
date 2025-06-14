import InventoryModel from '../../models/inventorymodel.js';

export const getAllInventory = async (req, res) => {
	try {
		const inventory = await InventoryModel.getAllModel(); // Get all inventory items
		res.json(inventory); // Send inventory as JSON
	} catch (error) {
		console.error('Error fetching inventory:', error); // Show error in console
		res.status(500).json({ error: 'Failed to fetch inventory.' }); // Send error message
	}
};

export const searchInventory = async (req, res) => {
	const { field, value } = req.query; // Get search field and value from URL
	try {
		const results = await InventoryModel.getByFieldModel(field, value); // Search inventory
		res.json(results); // Send search results
	} catch (error) {
		console.error('Error searching inventory:', error); // Show error in console
		res.status(400).json({ error: error.message }); // Send error message
	}
};

export const addInventory = async (req, res) => {
	const { product_id, quantity, location } = req.body; // Get data from form
	try {
		const newInventory = await InventoryModel.addInventoryModel(product_id, quantity, location); // Add to database
		res.status(201).json(newInventory); // Send new inventory with 201 Created
	} catch (error) {
		console.error('Error adding inventory:', error); // Show error in console
		res.status(500).json({ error: 'Failed to add inventory.' }); // Send error message
	}
};

export const updateInventory = async (req, res) => {
	const { id } = req.params; // Get inventory ID from URL
	const { product_id, quantity, location } = req.body; // Get updated data
	try {
		const updated = await InventoryModel.updateInventoryModel(id, product_id, quantity, location); // Update in database
		if (updated) res.json(updated); // Send updated data
		else res.status(404).json({ error: 'Inventory record not found.' }); // Send not found error
	} catch (error) {
		console.error('Error updating inventory:', error); // Show error in console
		res.status(500).json({ error: 'Failed to update inventory.' }); // Send error message
	}
};

export const deleteInventory = async (req, res) => {
	const { id } = req.params; // Get inventory ID from URL
	try {
		const result = await InventoryModel.deleteInventoryModel(id); // Delete from database
		console.log('Inventory deleted:', result); // Show result in console
		res.json(result); // Send result
	} catch (error) {
		console.error('Error deleting inventory:', error); // Show error in console
		res.status(500).json({ error: 'Failed to delete inventory.' }); // Send error message
	}
};
