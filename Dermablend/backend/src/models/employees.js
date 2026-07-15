import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const employeeSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Employee name is required"],
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
        role: {
            type: String,
            required: [true, "Role is required"],
            enum: ["Admin", "Employee"],
            default: "Employee"
        },
        hire_date: {
            type: Date,
            required: [true, "Hire date is required"]
        },
        salary: {
            type: Number,
            required: [true, "Salary is required"],
            min: [0.01, "Salary must be greater than 0"]
        },
        status: {
            type: String,
            required: [true, "Status is required"],
            enum: ["active", "inactive"],
            default: "active"
        },
        image: {
            type: String,
            default: ""
        },
        public_id: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

// Hash employee password before saving
employeeSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
employeeSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default model("Employees", employeeSchema);