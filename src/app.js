import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
import batchRoutes from './routes/batchRoutes.js';
import distributionRoutes from './routes/distributionRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// Middleware dasar
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Route default buat tes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend is running successfully 🚀",
    });
});
app.use('/api', authRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/distributions', distributionRoutes);
app.use('/api/nutritions', nutritionRoutes);
app.use('/api/products', productRoutes);

export default app;
