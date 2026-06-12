/**
 * client_id,
 * product_id,
 * custom_shade,
 * finish_type,
 * allergy_notes,
 * created_at
 */

import {Schema, model} from "mongoose";

const customizationSchema = new Schema({
    client_id: {
        type: Schema.Types.ObjectId,
        ref: "Clients"
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Products"
    },
    custom_shade: {
        type: String
    },
    finish_type: {
        type: String
    },
    allergy_notes: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default model("Customizations", customizationSchema);