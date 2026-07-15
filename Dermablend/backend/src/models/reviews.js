import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
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
        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"]
        },
        comment: {
            type: String,
            required: [true, "Comment is required"],
            trim: true
        }
    },
    {
        timestamps: {
            createdAt: "review_date",
            updatedAt: "updated_at"
        }
    }
);

export default model("Reviews", reviewSchema);