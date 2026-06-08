/**
 * Campos:
 * namePromotion,
 * description,
 * discountPercentage,
 * start_Date,
 * end_Date,
 * status
 */

import {Schema, model} from "mongoose";

const promotionSchema = new Schema({
    namePromotion: {
        type: String
    },
    description: {
        type: String
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100
    },
    start_Date: {
        type: Date
    },
    end_Date: {
        type: Date
    },
    status: {
        type: String,
        enum: ["active", "inactive"]
    }
});

export default model("Promotions", promotionSchema);