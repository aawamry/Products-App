import express from 'express';
import { getAllProducts } from '../../controllers/productcontroller.js';

const router = express.Router();

router.get('/', getAllProducts); // renders EJS template

export default router;
