/**
 * Campos:
 * cliend_id,
 * product_id,,
 * rating,
 * comment,
 * review_date
 */

import {Schema, model} from "mongoose";

const reviewSchema = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clients",
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 200
    },
    review_date: {
        type: Date,
        default: Date.now
    }
});

export default model("Reviews", reviewSchema);