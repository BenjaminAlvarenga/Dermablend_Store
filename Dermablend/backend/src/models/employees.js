/**
 * Campos:
 * name,
 * email,
 * password,
 * role,
 * hire_date,
 * salary,
 * status,
 * image,
 * public_id
 */

import {Schema, model} from "mongoose";

const employeeSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    hire_date: {
        type: Date
    },
    salary: {
        type: Number
    },
    status: {
        type: String
    },
    image: {
        type: String
    },
    public_id: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Employees", employeeSchema);