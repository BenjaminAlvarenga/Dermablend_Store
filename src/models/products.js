import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0.01, "Price must be greater than 0"]
        },
        stock: {
            type: Number,
            required: [true, "Stock is required"],
            min: [0, "Stock cannot be negative"],
            validate: {
                validator: Number.isInteger,
                message: "Stock must be an integer"
            }
        },
        shade: {
            type: String,
            required: [true, "Shade is required"],
            trim: true
        },
        coverage_level: {
            type: String,
            required: [true, "Coverage level is required"],
            trim: true
        },
        skin_type_compatible: {
            type: [String],
            required: [true, "Compatible skin types must be provided"],
            validate: {
                validator: function (val) {
                    return Array.isArray(val) && val.length > 0;
                },
                message: "Compatible skin types must be a non-empty array"
            }
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        is_customizable: {
            type: Boolean,
            required: [true, "is_customizable is required"]
        },
        image: {
            type: String,
            required: [true, "Image URL is required"]
        },
        public_id: {
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

export default model("Products", productSchema);