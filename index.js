// app.js (Correct Order)
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import methodOverride from 'method-override'; // Don't forget the import
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import productViewRoutes from './routes/views/productviewroutes.js'
import productAPIRoutes from './routes/api/productapiroutes.js';
import inventoryRoutes from './routes/inventoryroutes.js';
import transactionRoutes from './routes/transactionroutes.js';


const PORT = process.env.PORT || 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------- EJS Configuration FIRST ---------------------
// THESE THREE LINES MUST COME BEFORE app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// --------------------- Middleware (including expressLayouts) ---------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// NOW, apply express-ejs-layouts middleware
// This middleware depends on the EJS engine and views being set up.
app.use(expressLayouts);

// --------------------- Static Files ---------------------
app.use('/public', express.static(path.join(__dirname, 'public')));

// --------------------- Routes ---------------------
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Client App' });
});

// View Routes

app.use('/products', productViewRoutes);
app.use('/inventory', inventoryViewRoutes);
app.use('/stocktransactions', stockTransactionViewRoutes);

// API Routes

app.use('/api/products', productAPIRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/transactions', transactionRoutes);

// -------------------------Start Server-------------------------//
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});