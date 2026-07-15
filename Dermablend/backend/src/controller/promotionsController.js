import mongoose from "mongoose";
import Promotions from "../models/promotions.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllPromotions = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.status) {
            query.status = req.query.status;
        }

        const promotions = await Promotions.find(query);
        return res.status(200).json({
            success: true,
            count: promotions.length,
            data: promotions
        });
    } catch (error) {
        next(error);
    }
};

export const getPromotionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid promotion ID format"
            });
        }

        const promotion = await Promotions.findById(id);
        if (!promotion) {
            return res.status(404).json({
                success: false,
                message: "Promotion not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: promotion
        });
    } catch (error) {
        next(error);
    }
};

export const createPromotion = async (req, res, next) => {
    try {
        const { namePromotion, description, discountPercentage, start_date, end_date, status } = req.body;

        // Validations
        if (!namePromotion || !namePromotion.trim() || !description || !description.trim() || !start_date || !end_date || !status) {
            return res.status(400).json({
                success: false,
                message: "namePromotion, description, start_date, end_date, and status are all required"
            });
        }

        if (discountPercentage === undefined || discountPercentage === null || isNaN(discountPercentage) || discountPercentage <= 0 || discountPercentage > 100) {
            return res.status(400).json({
                success: false,
                message: "discountPercentage is required and must be between 0 and 100"
            });
        }

        const startDateParsed = new Date(start_date);
        const endDateParsed = new Date(end_date);

        if (isNaN(startDateParsed.getTime()) || isNaN(endDateParsed.getTime())) {
            return res.status(400).json({
                success: false,
                message: "start_date and end_date must be valid date values"
            });
        }

        if (endDateParsed < startDateParsed) {
            return res.status(400).json({
                success: false,
                message: "end_date cannot be less than start_date"
            });
        }

        const promotion = new Promotions({
            namePromotion: namePromotion.trim(),
            description: description.trim(),
            discountPercentage: Number(discountPercentage),
            start_date: startDateParsed,
            end_date: endDateParsed,
            status
        });

        await promotion.save();

        return res.status(201).json({
            success: true,
            data: promotion
        });
    } catch (error) {
        next(error);
    }
};

export const updatePromotion = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid promotion ID format"
            });
        }

        const { namePromotion, description, discountPercentage, start_date, end_date, status } = req.body;

        const promotion = await Promotions.findById(id);
        if (!promotion) {
            return res.status(404).json({
                success: false,
                message: "Promotion not found"
            });
        }

        if (namePromotion && namePromotion.trim()) promotion.namePromotion = namePromotion.trim();
        if (description && description.trim()) promotion.description = description.trim();
        if (status) promotion.status = status;

        if (discountPercentage !== undefined && discountPercentage !== null) {
            if (isNaN(discountPercentage) || discountPercentage <= 0 || discountPercentage > 100) {
                return res.status(400).json({
                    success: false,
                    message: "discountPercentage must be between 0 and 100"
                });
            }
            promotion.discountPercentage = Number(discountPercentage);
        }

        let newStart = promotion.start_date;
        let newEnd = promotion.end_date;

        if (start_date) {
            const parsed = new Date(start_date);
            if (isNaN(parsed.getTime())) {
                return res.status(400).json({ success: false, message: "Invalid start_date value" });
            }
            newStart = parsed;
        }

        if (end_date) {
            const parsed = new Date(end_date);
            if (isNaN(parsed.getTime())) {
                return res.status(400).json({ success: false, message: "Invalid end_date value" });
            }
            newEnd = parsed;
        }

        // Validate date ranges
        if (newEnd < newStart) {
            return res.status(400).json({
                success: false,
                message: "end_date cannot be less than start_date"
            });
        }

        promotion.start_date = newStart;
        promotion.end_date = newEnd;

        await promotion.save();

        return res.status(200).json({
            success: true,
            message: "Promotion updated successfully",
            data: promotion
        });
    } catch (error) {
        next(error);
    }
};

export const deletePromotion = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid promotion ID format"
            });
        }

        const promotion = await Promotions.findByIdAndDelete(id);
        if (!promotion) {
            return res.status(404).json({
                success: false,
                message: "Promotion not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Promotion deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
