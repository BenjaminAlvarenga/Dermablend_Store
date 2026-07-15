import { Schema, model } from "mongoose";

const promotionSchema = new Schema(
    {
        namePromotion: {
            type: String,
            required: [true, "namePromotion is required"],
            trim: true
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        discountPercentage: {
            type: Number,
            required: [true, "discountPercentage is required"],
            min: [0.01, "discountPercentage must be greater than 0"],
            max: [100, "discountPercentage cannot be greater than 100"]
        },
        start_date: {
            type: Date,
            required: [true, "start_date is required"]
        },
        end_date: {
            type: Date,
            required: [true, "end_date is required"],
            validate: {
                validator: function (value) {
                    // Check if end_date >= start_date. Note: 'this' refers to the document.
                    // For updates, the validator context can be handled in controller pre-update validation.
                    return !this.start_date || value >= this.start_date;
                },
                message: "end_date cannot be less than start_date"
            }
        },
        status: {
            type: String,
            required: [true, "status is required"],
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

export default model("Promotions", promotionSchema);