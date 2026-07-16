import mongoose from "mongoose";
import Products from "../models/products.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllProducts = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.is_customizable !== undefined) {
            query.is_customizable = req.query.is_customizable === "true";
        }
        
        const products = await Products.find(query);
        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format"
            });
        }

        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { name, category, price, stock, shade, coverage_level, skin_type_compatible, description, is_customizable, image, public_id } = req.body;

        // String checks and validations
        if (!name || !name.trim() || !category || !category.trim() || !shade || !shade.trim() || !coverage_level || !coverage_level.trim() || !description || !description.trim() || !image || !image.trim()) {
            return res.status(400).json({
                success: false,
                message: "All mandatory string fields must be completed and cannot be empty"
            });
        }

        if (price === undefined || price === null || isNaN(price) || price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price is required and must be greater than 0"
            });
        }

        if (stock === undefined || stock === null || isNaN(stock) || stock < 0) {
            return res.status(400).json({
                success: false,
                message: "Stock is required and cannot be negative"
            });
        }

        if (is_customizable === undefined || is_customizable === null) {
            return res.status(400).json({
                success: false,
                message: "is_customizable field is required"
            });
        }

        if (!Array.isArray(skin_type_compatible) || skin_type_compatible.length === 0) {
            return res.status(400).json({
                success: false,
                message: "skin_type_compatible must be a non-empty array"
            });
        }

        const product = new Products({
            name,
            category,
            price: Number(price),
            stock: Number(stock),
            shade,
            coverage_level,
            skin_type_compatible,
            description,
            is_customizable: Boolean(is_customizable),
            image,
            public_id: public_id || ""
        });

        await product.save();

        return res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format"
            });
        }

        const { name, category, price, stock, shade, coverage_level, skin_type_compatible, description, is_customizable, image, public_id } = req.body;

        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (name && name.trim()) product.name = name;
        if (category && category.trim()) product.category = category;
        if (shade && shade.trim()) product.shade = shade;
        if (coverage_level && coverage_level.trim()) product.coverage_level = coverage_level;
        if (description && description.trim()) product.description = description;
        if (image && image.trim()) product.image = image;
        if (public_id !== undefined) product.public_id = public_id;

        if (price !== undefined && price !== null) {
            if (isNaN(price) || price <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Price must be greater than 0"
                });
            }
            product.price = Number(price);
        }

        if (stock !== undefined && stock !== null) {
            if (isNaN(stock) || stock < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Stock cannot be negative"
                });
            }
            product.stock = Number(stock);
        }

        if (is_customizable !== undefined && is_customizable !== null) {
            product.is_customizable = Boolean(is_customizable);
        }

        if (skin_type_compatible !== undefined) {
            if (!Array.isArray(skin_type_compatible) || skin_type_compatible.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "skin_type_compatible must be a non-empty array"
                });
            }
            product.skin_type_compatible = skin_type_compatible;
        }

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID format"
            });
        }

        const product = await Products.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
