/**
 * Campos
 * client_id,
 * products
 * total_amount
 * status
 * payment_method
 * shipping_address
 * order_date
 */

import {Schema, model} from "mongoose";

const orderSchema = new Schema({
    client_id: {
        type: Schema.Types.ObjectId,
        ref: "Clients"
    },
    products: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "Products"
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    total_amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pendiente", "Entregado","Cancelado"],
        default: "Pendiente"
    },
    payment_method: {
        type: String,
        enum: ["credit_card", "debit_card", "bank_transfer"]
    },
    shipping_address: {
        type: String,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    }
});