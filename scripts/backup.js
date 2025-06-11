import ProductsDatabase from '../ProductsDatabase.js';

const db = await ProductsDatabase.getInstance();
await db.backup();
console.log('✅ Backup completed successfully.');