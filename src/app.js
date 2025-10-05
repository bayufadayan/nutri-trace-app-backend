// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware dasar
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route default buat tes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend is running successfully 🚀",
    });
});

export default app;
