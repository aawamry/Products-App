import sqlite3 from 'sqlite3';                                // Import SQLite3 library
import { open } from 'sqlite';                                // Import helper to open DB
import path from 'path';                                      // For handling file paths
import fs from 'fs/promises';                                 // For working with the file system
import { fileURLToPath } from 'url';                          // To get the current file path
import {
	createProductsTable,                                     // Import SQL query for products table
	createInventoryTable,                                    // Import SQL query for inventory table
	createStockTransactionsTable                             // Import SQL query for stock transactions table
} from './queries.js';

class ProductsDatabase {
	constructor() {
		this.db = null;                                       // Holds the DB connection
		this.dbPath = this.getDBPath();                      // Set DB file path
		console.log('🔧 Constructor: DB Path set to', this.dbPath);  // Log DB path
	}

	// -------------------------- Get Absolute DB Path --------------------------
	getDBPath() {
		const __filename = fileURLToPath(import.meta.url);    // Get current file name
		const __dirname = path.dirname(__filename);           // Get current directory
		const fullPath = path.join(__dirname, 'products_database.db'); // Set DB file path
		console.log('📁 Resolved DB file path:', fullPath);   // Log the DB path
		return fullPath;                                      // Return full path
	}

	// -------------------------- Initialize Database Connection --------------------------
	async init() {
		if (!this.db) {                                       // If DB is not already initialized
			sqlite3.verbose();                                // Enable detailed logging
			console.log('🔌 Initializing DB connection...');  // Log message
			this.db = await open({                            // Open the DB
				filename: this.dbPath,                        // Use the set DB path
				driver: sqlite3.Database                      // Use SQLite3 as the driver
			});
			console.log('✅ DB connection established');      // Log success
		}
	}

	// -------------------------- Create Tables --------------------------
	async createTables() {
		await this.db.run(createProductsTable());             // Create products table
		console.log('✅ Products table created or already exists.');

		await this.db.run(createInventoryTable());            // Create inventory table
		console.log('✅ Inventory table created or already exists.');

		await this.db.run(createStockTransactionsTable());    // Create stock transactions table
		console.log('✅ StockTransactions table created or already exists.');
	}

	// -------------------------- Backup Database --------------------------
	async backup(backupFolder = './backups') {
		try {
			await fs.mkdir(backupFolder, { recursive: true }); // Create backup folder if not exists

			const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // Create timestamp for filename
			const fileName = `backup-${timestamp}.db`;         // Set backup filename
			const backupPath = path.join(backupFolder, fileName); // Full path for backup file

			await fs.copyFile(this.dbPath, backupPath);        // Copy DB file to backup location

			console.log(`✅ Database backup created at ${backupPath}`); // Log success
			return backupPath;                                 // Return path to the backup
		} catch (error) {
			console.error('❌ Failed to back up database:', error); // Log error
			throw error;                                       // Rethrow error for handling
		}
	}

	// -------------------------- Get Singleton DB Instance --------------------------
	static async getInstance() {
		if (!this.instance) {                                 // If no instance exists
			console.log('🆕 Creating new ProductsDatabase instance...');
			this.instance = new ProductsDatabase();           // Create new instance
			await this.instance.init();                       // Initialize DB
			await this.instance.createTables();               // Create tables
			console.log('📦 DB instance is ready for use.');  // Log ready
		} else {
			console.log('📦 Using existing DB instance.');    // Use existing instance
		}
		return this.instance;                                 // Return DB instance
	}
}

export default ProductsDatabase;                              // Export the class for use elsewhere
