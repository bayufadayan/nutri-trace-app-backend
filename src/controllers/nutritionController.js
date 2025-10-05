import * as nutritionService from "../services/nutritionService.js";

export const createNutrition = async (req, res) => {
    try {
        const nutrition = await nutritionService.createNutrition(req.body);
        res.status(201).json(nutrition);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllNutrition = async (req, res) => {
    const nutrition = await nutritionService.getAllNutrition();
    res.json(nutrition);
};

export const getNutritionById = async (req, res) => {
    const nutrition = await nutritionService.getNutritionById(req.params.id);
    res.json(nutrition);
};

export const updateNutrition = async (req, res) => {
    const nutrition = await nutritionService.updateNutrition(req.params.id, req.body);
    res.json(nutrition);
};

export const deleteNutrition = async (req, res) => {
    await nutritionService.deleteNutrition(req.params.id);
    res.json({ message: "Nutrition deleted successfully" });
};
