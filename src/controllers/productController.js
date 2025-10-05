import * as productService from "../services/productService.js";

export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct({ ...req.body, userId: req.user.id });
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getAllProducts = async (req, res) => {
    const products = await productService.getAllProducts();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
};

export const updateProduct = async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
};

export const deleteProduct = async (req, res) => {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
};
