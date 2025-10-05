import express from "express";
import * as nutritionController from "../controllers/nutritionController.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post("/", nutritionController.createNutrition);
router.get("/", nutritionController.getAllNutrition);
router.get("/:id", nutritionController.getNutritionById);
router.put("/:id", nutritionController.updateNutrition);
router.delete("/:id", nutritionController.deleteNutrition);

export default router;
