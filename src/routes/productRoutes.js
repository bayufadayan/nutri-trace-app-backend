import express from "express";
import * as productController from "../controllers/productController.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/:id", productController.getProductById);

router.use(authMiddleware);
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;