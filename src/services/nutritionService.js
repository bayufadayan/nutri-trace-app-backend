import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export const createNutrition = async (data) => {
    return await prisma.nutrition.create({ data });
};

export const getAllNutrition = async () => {
    return await prisma.nutrition.findMany({ include: { product: true } });
};

export const getNutritionById = async (id) => {
    return await prisma.nutrition.findUnique({ where: { id }, include: { product: true } });
};

export const updateNutrition = async (id, data) => {
    return await prisma.nutrition.update({ where: { id }, data });
};

export const deleteNutrition = async (id) => {
    return await prisma.nutrition.delete({ where: { id } });
};
