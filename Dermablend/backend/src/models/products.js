/**
 * Campos:
 * name,
 * category,
 * price,
 * stock,
 * shade,
 * coverage_level,
 * skin_type_compatible,
 * description,
 * is_customizable,
 * created_at,
 * image,
 * public_id
 */

import {Schema, model} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    shade: {
        type: String
    },
    coverage_level: {
        type: String
    },
    skin_type_compatible: {
        type: [String]
    },
    description: {
        type: String
    },
    is_customizable: {
        type: Boolean
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String
    },
    public_id: {
        type: String
    }
});

export default model("Products", productSchema);