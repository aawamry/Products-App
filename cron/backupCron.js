import cron from 'node-cron';                          
import ProductsDatabase from '../ProductsDatabase.js';

// Schedule: Every day at 2 AM
cron.schedule('0 2 * * *', async () => {               // Run the job every day at 2 AM
  try {
    const db = await ProductsDatabase.getInstance();   // Get database instance
    await db.backup();                                 // Attempt to create a backup
    console.log('🕑 Nightly backup completed.');        // Log success message
  } catch (error) {
    console.error('❌ Backup failed:', error.message);  // Log the error message
    // Optionally: write error to a file or send alert/email
  }
});

console.log('⏳ Cron job running...');                  // Log that cron scheduler is active