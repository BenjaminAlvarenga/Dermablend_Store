import mongoose from "mongoose";
import Orders from "../models/orders.js";
import Clients from "../models/clients.js";
import Products from "../models/products.js";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getAllOrders = async (req, res, next) => {
    try {
        const query = {};
        if (req.query.client_id && isValidObjectId(req.query.client_id)) {
            query.client_id = req.query.client_id;
        }
        if (req.query.status) {
            query.status = req.query.status;
        }

        const orders = await Orders.find(query)
            .populate("client_id", "name email phone")
            .populate("products.product_id", "name price category shade");

        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID format"
            });
        }

        const order = await Orders.findById(id)
            .populate("client_id", "name email phone")
            .populate("products.product_id", "name price category shade");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (req, res, next) => {
    // We use a transaction or session if possible, but standard mongoose is safe enough since we do sequential checks
    try {
        const { client_id, products, total_amount, payment_method, shipping_address } = req.body;

        // Validations
        if (!client_id || !products || total_amount === undefined || total_amount === null || !payment_method || !shipping_address || !shipping_address.trim()) {
            return res.status(400).json({
                success: false,
                message: "client_id, products, total_amount, payment_method, and shipping_address are all required"
            });
        }

        if (!isValidObjectId(client_id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid client_id format"
            });
        }

        // Validate client exists
        const clientExists = await Clients.findById(client_id);
        if (!clientExists) {
            return res.status(404).json({
                success: false,
                message: `Client with ID ${client_id} does not exist`
            });
        }

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one product"
            });
        }

        if (Number(total_amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: "total_amount must be greater than 0"
            });
        }

        // Check products existence, stock, and calculate/validate total amount
        const verifiedProducts = [];
        let calculatedTotal = 0;

        for (const item of products) {
            const { product_id, quantity, price } = item;

            if (!product_id || !isValidObjectId(product_id) || quantity === undefined || price === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Each product in list must have valid product_id, quantity, and price"
                });
            }

            const dbProduct = await Products.findById(product_id);
            if (!dbProduct) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${product_id} does not exist`
                });
            }

            // Check stock
            if (dbProduct.stock < quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for product '${dbProduct.name}'. Available: ${dbProduct.stock}, Requested: ${quantity}`
                });
            }

            calculatedTotal += Number(price) * Number(quantity);
            verifiedProducts.push({
                product: dbProduct,
                quantity: Number(quantity),
                price: Number(price)
            });
        }

        // Subtract stock from products
        for (const item of verifiedProducts) {
            item.product.stock -= item.quantity;
            await item.product.save();
        }

        const order = new Orders({
            client_id,
            products: products.map(p => ({
                product_id: p.product_id,
                quantity: Number(p.quantity),
                price: Number(p.price)
            })),
            total_amount: Number(total_amount),
            payment_method,
            shipping_address: shipping_address.trim(),
            status: "Pendiente"
        });

        await order.save();

        return res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID format"
            });
        }

        const { status, shipping_address, payment_method } = req.body;

        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (shipping_address && shipping_address.trim()) {
            order.shipping_address = shipping_address.trim();
        }

        if (payment_method) {
            order.payment_method = payment_method;
        }

        // Handle stock recovery if status changes to Cancelado
        if (status && status !== order.status) {
            const validStatuses = ["Pendiente", "Entregado", "Cancelado"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
                });
            }

            // If changing to Cancelado, return stock to product
            if (status === "Cancelado" && order.status !== "Cancelado") {
                for (const item of order.products) {
                    await Products.findByIdAndUpdate(item.product_id, {
                        $inc: { stock: item.quantity }
                    });
                }
            } 
            // If reactivating from Cancelado to Pendiente or Entregado, subtract stock again
            else if (order.status === "Cancelado" && status !== "Cancelado") {
                // First check if all products have enough stock
                for (const item of order.products) {
                    const dbProduct = await Products.findById(item.product_id);
                    if (!dbProduct || dbProduct.stock < item.quantity) {
                        return res.status(400).json({
                            success: false,
                            message: `Cannot restore order status. Insufficient stock for product ID ${item.product_id}`
                        });
                    }
                }
                // Subtract stock
                for (const item of order.products) {
                    await Products.findByIdAndUpdate(item.product_id, {
                        $inc: { stock: -item.quantity }
                    });
                }
            }

            order.status = status;
        }

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: order
        });
    } catch (error) {
        next(error);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order ID format"
            });
        }

        const order = await Orders.findById(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // If deleting a non-cancelled order, restore the stock first
        if (order.status !== "Cancelado") {
            for (const item of order.products) {
                await Products.findByIdAndUpdate(item.product_id, {
                    $inc: { stock: item.quantity }
                });
            }
        }

        await Orders.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Order deleted and inventory restored successfully"
        });
    } catch (error) {
        next(error);
    }
};
