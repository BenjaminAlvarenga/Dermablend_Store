import mongoose from "mongoose";
import Reviews from "../models/reviews.js";
import Clients from "../models/clients.js";
import Products from "../models/products.js";
import Orders from "../models/orders.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllReviews = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.product_id && isValidObjectId(req.query.product_id)) {
            query.product_id = req.query.product_id;
        }
        if (req.query.client_id && isValidObjectId(req.query.client_id)) {
            query.client_id = req.query.client_id;
        }

        const reviews = await Reviews.find(query)
            .populate("client_id", "name email")
            .populate("product_id", "name price category");

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        next(error);
    }
};

export const getReviewById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID format"
            });
        }

        const review = await Reviews.findById(id)
            .populate("client_id", "name email")
            .populate("product_id", "name price category");

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        next(error);
    }
};

export const createReview = async (req, res, next) => {
    try {
        const { client_id, product_id, rating, comment } = req.body;

        // Validations
        if (!client_id || !product_id || rating === undefined || rating === null || !comment || !comment.trim()) {
            return res.status(400).json({
                success: false,
                message: "client_id, product_id, rating, and comment are all required"
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

        // A Client can only review as themselves
        if (req.user.role === "Client" && req.user.id.toString() !== client_id) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You can only submit reviews for yourself"
            });
        }

        // Only clients who actually received an order containing this product may review it
        const hasPurchased = await Orders.exists({
            client_id,
            status: "Entregado",
            "products.product_id": product_id
        });
        if (!hasPurchased) {
            return res.status(403).json({
                success: false,
                message: "You can only review products from orders that have been delivered to you"
            });
        }

        // Rating boundaries check
        const numRating = Number(rating);
        if (isNaN(numRating) || numRating < 1 || numRating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be a number between 1 and 5"
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

        const review = new Reviews({
            client_id,
            product_id,
            rating: numRating,
            comment: comment.trim()
        });

        await review.save();

        return res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID format"
            });
        }

        const { client_id, product_id, rating, comment } = req.body;

        const review = await Reviews.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.client_id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You can only edit your own reviews"
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
            review.client_id = client_id;
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
            review.product_id = product_id;
        }

        // Validate rating if changing
        if (rating !== undefined && rating !== null) {
            const numRating = Number(rating);
            if (isNaN(numRating) || numRating < 1 || numRating > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Rating must be a number between 1 and 5"
                });
            }
            review.rating = numRating;
        }

        // Validate comment if changing
        if (comment !== undefined) {
            if (!comment || !comment.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "Comment cannot be empty"
                });
            }
            review.comment = comment.trim();
        }

        await review.save();

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            data: review
        });
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid review ID format"
            });
        }

        const review = await Reviews.findById(id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        if (review.client_id.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You can only delete your own reviews"
            });
        }

        await Reviews.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
