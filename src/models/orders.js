import { Schema, model } from "mongoose";

const orderProductSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: [true, "product_id is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer"
        }
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    }
}, { _id: false });

const orderSchema = new Schema(
    {
        client_id: {
            type: Schema.Types.ObjectId,
            ref: "Clients",
            required: [true, "client_id is required"]
        },
        products: {
            type: [orderProductSchema],
            required: [true, "Products are required"],
            validate: {
                validator: function (val) {
                    return Array.isArray(val) && val.length > 0;
                },
                message: "Order must contain at least one product"
            }
        },
        total_amount: {
            type: Number,
            required: [true, "total_amount is required"],
            min: [0.01, "total_amount must be greater than 0"]
        },
        status: {
            type: String,
            required: [true, "status is required"],
            enum: ["Pendiente", "Entregado", "Cancelado"],
            default: "Pendiente"
        },
        payment_method: {
            type: String,
            required: [true, "payment_method is required"],
            enum: ["credit_card", "debit_card", "bank_transfer"]
        },
        shipping_address: {
            type: String,
            required: [true, "shipping_address is required"],
            trim: true
        }
    },
    {
        timestamps: {
            createdAt: "order_date",
            updatedAt: "updated_at"
        }
    }
);

export default model("Orders", orderSchema);