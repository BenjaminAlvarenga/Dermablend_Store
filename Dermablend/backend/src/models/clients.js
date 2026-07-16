import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const clientSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        birthdate: {
            type: Date,
            required: [true, "Birthdate is required"]
        },
        phone: {
            type: String,
            required: [true, "Phone is required"],
            trim: true
        },
        favorites: {
            type: [String],
            default: []
        },
        skin_type: {
            type: String,
            required: [true, "Skin type is required"],
            trim: true
        },
        skin_tone: {
            type: String,
            required: [true, "Skin tone is required"],
            trim: true
        },
        is_verified: {
            type: Boolean,
            default: false
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            enum: ["active", "inactive"],
            default: "active"
        },
        recovery_token: {
            type: String,
            default: null
        },
        recovery_token_expires: {
            type: Date,
            default: null
        },
        verification_token: {
            type: String,
            default: null
        },
        verification_token_expires: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    }
);

// Hash client password before saving
clientSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
clientSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default model("Clients", clientSchema);