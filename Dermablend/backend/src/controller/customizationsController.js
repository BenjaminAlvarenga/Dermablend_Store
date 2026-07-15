import mongoose from "mongoose";
import Customizations from "../models/customizations.js";
import Clients from "../models/clients.js";
import Products from "../models/products.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllCustomizations = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.client_id && isValidObjectId(req.query.client_id)) {
            query.client_id = req.query.client_id;
        }

        const customizations = await Customizations.find(query)
            .populate("client_id", "name email")
            .populate("product_id", "name category price shade");

        return res.status(200).json({
            success: true,
            count: customizations.length,
            data: customizations
        });
    } catch (error) {
        next(error);
    }
};

export const getCustomizationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customization ID format"
            });
        }

        const customization = await Customizations.findById(id)
            .populate("client_id", "name email")
            .populate("product_id", "name category price shade");

        if (!customization) {
            return res.status(404).json({
                success: false,
                message: "Customization not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: customization
        });
    } catch (error) {
        next(error);
    }
};

export const createCustomization = async (req, res, next) => {
    try {
        const { client_id, product_id, custom_shade, finish_type, allergy_notes } = req.body;

        // Validations
        if (!client_id || !product_id || !custom_shade || !custom_shade.trim() || !finish_type || !finish_type.trim()) {
            return res.status(400).json({
                success: false,
                message: "client_id, product_id, custom_shade, and finish_type are all required"
            });
        }

        if (!isValidObjectId(client_id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid client_id format"
            });
        }

        if (!isValidObjectId(product_id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product_id format"
            });
        }

        // Verify referenced client exists
        const clientExists = await Clients.findById(client_id);
        if (!clientExists) {
            return res.status(404).json({
                success: false,
                message: `Client with ID ${client_id} does not exist`
            });
        }

        // Verify referenced product exists
        const productExists = await Products.findById(product_id);
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${product_id} does not exist`
            });
        }

        const customization = new Customizations({
            client_id,
            product_id,
            custom_shade: custom_shade.trim(),
            finish_type: finish_type.trim(),
            allergy_notes: allergy_notes || ""
        });

        await customization.save();

        return res.status(201).json({
            success: true,
            data: customization
        });
    } catch (error) {
        next(error);
    }
};

export const updateCustomization = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customization ID format"
            });
        }

        const { client_id, product_id, custom_shade, finish_type, allergy_notes } = req.body;

        const customization = await Customizations.findById(id);
        if (!customization) {
            return res.status(404).json({
                success: false,
                message: "Customization not found"
            });
        }

        // Validate client_id if changing
        if (client_id) {
            if (!isValidObjectId(client_id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid client_id format"
                });
            }
            const clientExists = await Clients.findById(client_id);
            if (!clientExists) {
                return res.status(404).json({
                    success: false,
                    message: `Client with ID ${client_id} does not exist`
                });
            }
            customization.client_id = client_id;
        }

        // Validate product_id if changing
        if (product_id) {
            if (!isValidObjectId(product_id)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product_id format"
                });
            }
            const productExists = await Products.findById(product_id);
            if (!productExists) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${product_id} does not exist`
                });
            }
            customization.product_id = product_id;
        }

        if (custom_shade !== undefined) {
            if (!custom_shade || !custom_shade.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "custom_shade cannot be empty"
                });
            }
            customization.custom_shade = custom_shade.trim();
        }

        if (finish_type !== undefined) {
            if (!finish_type || !finish_type.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "finish_type cannot be empty"
                });
            }
            customization.finish_type = finish_type.trim();
        }

        if (allergy_notes !== undefined) {
            customization.allergy_notes = allergy_notes;
        }

        await customization.save();

        return res.status(200).json({
            success: true,
            message: "Customization updated successfully",
            data: customization
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCustomization = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid customization ID format"
            });
        }

        const customization = await Customizations.findByIdAndDelete(id);
        if (!customization) {
            return res.status(404).json({
                success: false,
                message: "Customization not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Customization deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
