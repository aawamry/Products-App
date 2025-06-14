import ProductsDatabase from '../ProductsDatabase.js';      // Import the ProductsDatabase class

const db = await ProductsDatabase.getInstance();            // Get a singleton instance of the database
await db.backup();                                          // Perform the backup operation
console.log('✅ Backup completed successfully.');           // Log success message to the console
