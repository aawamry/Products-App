// -------------------- Imports --------------------
import express from 'express';                                           // Core Express framework
import expressLayouts from 'express-ejs-layouts';                        // EJS layout support
import methodOverride from 'method-override';                            // Allows PUT/DELETE via query (?_method=)
import path from 'path';                                                 // For file path resolution
import { fileURLToPath } from 'url';                                     // To convert import.meta.url to __dirname
import 'dotenv/config';                                                  // Load environment variables from .env file

import productViewRoutes from './routes/views/productviewroutes.js';     // Product view routes
import productAPIRoutes from './routes/api/productapiroutes.js';         // Product API routes
/* import inventoryViewRoutes from './routes/views/inventoryviewroutes.js' */ // Inventory view routes (disabled)
import inventoryAPIRoutes from './routes/api/inventoryapiroutes.js';     // Inventory API routes
/* import transactionsViewRoutes from './routes/views/transactionsviewroutes.js' */ // Stock view routes (disabled)
import transactionsAPIRoutes from './routes/api/transactionsapiroutes.js'; // Stock API routes

const PORT = process.env.PORT || 3000;                                   // Server port

const app = express();                                                   // Initialize Express app

// -------------------- Resolve Current Directory --------------------
const __filename = fileURLToPath(import.meta.url);                       // Get current file name
const __dirname = path.dirname(__filename);                              // Get current directory path

// -------------------- EJS View Engine Setup --------------------
// These settings must come before express-ejs-layouts is used
app.set('view engine', 'ejs');                                           // Set EJS as view engine
app.set('views', path.join(__dirname, 'views'));                         // Set views folder path
app.set('layout', 'layouts/main');                                       // Set main layout for all views

// -------------------- Middleware Setup --------------------
app.use(express.json());                                                 // Parse incoming JSON
app.use(express.urlencoded({ extended: true }));                         // Parse form data
app.use(methodOverride('_method'));                                      // Enable method override using query

app.use(expressLayouts);                                                 // Enable EJS layout support

// -------------------- Static Files --------------------
app.use('/public', express.static(path.join(__dirname, 'public')));      // Serve static files from /public

// -------------------- Routes --------------------
app.get('/', (req, res) => {                                             // Home route
  res.render('index', { title: 'Welcome to Client App' });              // Render index.ejs with title
});

app.get('/test-error', (req, res) => {                                   // Test error route
  res.render('error', { title: 'Test Error Page', error: 'This is a test error.' });
});

// View Routes
app.use('/products', productViewRoutes);                                 // Use product view routes
/* app.use('/inventory', inventoryViewRoutes);                            // Disabled inventory view routes
app.use('/stocktransactions', transactionsViewRoutes); */                // Disabled stock view routes

// API Routes
app.use('/api/products', productAPIRoutes);                              // API: product endpoints
app.use('/api/inventory', inventoryAPIRoutes);                           // API: inventory endpoints
app.use('/api/transactions', transactionsAPIRoutes);                     // API: transactions endpoints

// -------------------- Start Server --------------------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);        // Log server start
});
