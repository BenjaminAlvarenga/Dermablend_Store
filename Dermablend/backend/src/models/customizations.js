import { Schema, model } from "mongoose";

const customizationSchema = new Schema(
    {
        client_id: {
            type: Schema.Types.ObjectId,
            ref: "Clients",
            required: [true, "client_id is required"]
        },
        product_id: {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: [true, "product_id is required"]
        },
        custom_shade: {
            type: String,
            required: [true, "custom_shade is required"],
            trim: true
        },
        finish_type: {
            type: String,
            required: [true, "finish_type is required"],
            trim: true
        },
        allergy_notes: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

export default model("Customizations", customizationSchema);