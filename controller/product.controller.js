//controllers são responsáveis por lidar com a lógica de rotas

import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({data: products});
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product(product);
    
    try {
        await newProduct.save();
        res.status(201).json({data: newProduct});
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });}

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });}
        
    try {
        const product = await Product.findByIdAndDelete(id);
        
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });

    }
}

